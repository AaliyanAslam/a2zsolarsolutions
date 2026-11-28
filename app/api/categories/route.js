import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Category, {
  ensureCategoriesSeeded,
  slugifyCategory,
} from "@/models/Category";
import Product from "@/models/Product";

function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function revalidateCatalogPaths() {
  try {
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/sitemap.xml");
  } catch {
    // ignore revalidation errors outside active request contexts
  }
}

// GET: Fetch dynamic product categories (auto-seeds defaults if collection is empty)
export async function GET(req) {
  try {
    await connectDB();
    await ensureCategoriesSeeded();

    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get("all") === "true";
    const includeCounts = searchParams.get("includeCounts") === "true";

    const filter = includeAll ? {} : { isActive: { $ne: false } };
    const categories = await Category.find(filter)
      .sort({ order: 1, name: 1 })
      .lean();

    let result = categories;

    if (includeCounts) {
      const counts = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]);
      const countMap = new Map(counts.map((c) => [c._id, c.count]));
      result = categories.map((cat) => ({
        ...cat,
        productCount: countMap.get(cat.name) || 0,
      }));
    }

    const isAdminQuery = includeAll || includeCounts;
    return NextResponse.json(
      { success: true, categories: result },
      {
        headers: {
          "Cache-Control": isAdminQuery
            ? "no-store"
            : "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, categories: [], error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new product category
export async function POST(req) {
  try {
    await connectDB();
    await ensureCategoriesSeeded();

    const body = await req.json();
    const rawName = typeof body?.name === "string" ? body.name.trim() : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const isActive = body?.isActive !== false;

    if (!rawName) {
      return NextResponse.json(
        { success: false, error: "Category name is required." },
        { status: 400 }
      );
    }

    if (rawName.toLowerCase() === "all") {
      return NextResponse.json(
        { success: false, error: '"All" is reserved for filtering.' },
        { status: 400 }
      );
    }

    const slug = slugifyCategory(rawName);
    const duplicate = await Category.findOne({
      $or: [
        { slug },
        { name: { $regex: new RegExp(`^${escapeRegex(rawName)}$`, "i") } },
      ],
    }).lean();

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error: `Category "${duplicate.name}" already exists.`,
        },
        { status: 409 }
      );
    }

    let order = Number(body?.order);
    if (body?.order === undefined || body?.order === "" || Number.isNaN(order)) {
      const last = await Category.findOne({})
        .sort({ order: -1 })
        .select("order")
        .lean();
      order = typeof last?.order === "number" ? last.order + 1 : 0;
    }

    const category = await Category.create({
      name: rawName,
      slug,
      description,
      order,
      isActive,
    });

    revalidateCatalogPaths();

    return NextResponse.json(
      {
        success: true,
        category,
        message: "Category created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category." },
      { status: 500 }
    );
  }
}

// PUT: Update / rename a category and cascade name changes to products
export async function PUT(req) {
  try {
    await connectDB();
    await ensureCategoriesSeeded();

    const body = await req.json();
    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const existing = await Category.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    const oldName = existing.name;

    if (typeof body?.name === "string") {
      const nextName = body.name.trim();
      if (!nextName) {
        return NextResponse.json(
          { success: false, error: "Category name cannot be empty." },
          { status: 400 }
        );
      }
      if (nextName.toLowerCase() === "all") {
        return NextResponse.json(
          { success: false, error: '"All" is reserved for filtering.' },
          { status: 400 }
        );
      }

      const nextSlug = slugifyCategory(nextName);
      const duplicate = await Category.findOne({
        _id: { $ne: id },
        $or: [
          { slug: nextSlug },
          { name: { $regex: new RegExp(`^${escapeRegex(nextName)}$`, "i") } },
        ],
      }).lean();

      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            error: `Another category named "${duplicate.name}" already exists.`,
          },
          { status: 409 }
        );
      }

      existing.name = nextName;
      existing.slug = nextSlug;
    }

    if (typeof body?.description === "string") {
      existing.description = body.description.trim();
    }

    if (body?.order !== undefined && body?.order !== "") {
      const parsedOrder = Number(body.order);
      if (!Number.isNaN(parsedOrder)) {
        existing.order = parsedOrder;
      }
    }

    if (typeof body?.isActive === "boolean") {
      existing.isActive = body.isActive;
    }

    await existing.save();

    let updatedProductsCount = 0;
    if (existing.name !== oldName) {
      const updateResult = await Product.updateMany(
        { category: oldName },
        { $set: { category: existing.name } }
      );
      updatedProductsCount = updateResult?.modifiedCount || 0;
    }

    revalidateCatalogPaths();
    try {
      revalidatePath("/products/[slug]", "page");
    } catch {
      // ignore if outside request context
    }

    return NextResponse.json({
      success: true,
      category: existing,
      updatedProductsCount,
      message:
        updatedProductsCount > 0
          ? `Category updated and ${updatedProductsCount} product(s) synced!`
          : "Category updated successfully!",
    });
  } catch (error) {
    console.error("PUT /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update category." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a category only if no products are assigned to it
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const cat = await Category.findById(id);
    if (!cat) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    const productCount = await Product.countDocuments({ category: cat.name });
    if (productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete "${cat.name}" because ${productCount} product(s) are using it. Reassign those products first.`,
        },
        { status: 409 }
      );
    }

    await Category.findByIdAndDelete(id);
    revalidateCatalogPaths();

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category." },
      { status: 500 }
    );
  }
}

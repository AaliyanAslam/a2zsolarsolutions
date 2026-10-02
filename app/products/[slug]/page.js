import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

// Dynamic SEO metadata for each product
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return { title: "Product Not Found" };

    const title = `${product.title}${product.brand ? ` | ${product.brand}` : ""} - A2Z Solar Solutions`;
    const description =
      product.shortDescription ||
      `Buy ${product.title} from A2Z Solar Solutions. ${product.category} available in Karachi & Lahore with warranty and professional installation.`;
    const image = product.images?.[0]?.url || "/images/solar-image.webp";

    return {
      title,
      description,
      alternates: {
        canonical: `https://a2zsolarsolutions.com/products/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://a2zsolarsolutions.com/products/${slug}`,
        siteName: "A2Z Solar Solutions",
        images: [
          {
            url: image,
            width: 800,
            height: 800,
            alt: product.title,
          },
        ],
        locale: "en_PK",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: "Product | A2Z Solar Solutions" };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();

    if (!product) notFound();

    // Fetch related products (same category, exclude current)
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("title slug images price discountPrice brand category")
      .lean();

    // Serialize MongoDB dates and ObjectIds
    const serialized = JSON.parse(JSON.stringify(product));
    const serializedRelated = JSON.parse(JSON.stringify(related));

    // JSON-LD Product schema for SEO
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.shortDescription || product.description || "",
      brand: product.brand
        ? { "@type": "Brand", name: product.brand }
        : undefined,
      image: product.images?.map((img) => img.url) || [],
      category: product.category,
      offers: {
        "@type": "Offer",
        url: `https://a2zsolarsolutions.com/products/${slug}`,
        priceCurrency: "PKR",
        price: product.discountPrice || product.price || 0,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "A2Z Solar Solutions",
        },
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <ProductDetailClient product={serialized} related={serializedRelated} />
      </>
    );
  } catch {
    notFound();
  }
}

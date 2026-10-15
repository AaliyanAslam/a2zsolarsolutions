import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLocationDot, FaWhatsapp, FaSolarPanel, FaArrowLeft, FaPhone, FaCheck } from "react-icons/fa6";
import SocialShareButton from "@/app/components/SocialShareButton";

const WHATSAPP_NUMBER = "923214189298";
const PHONE_NUMBER = "+923214189298";

// ── Dynamic SEO & OpenGraph metadata ───────────────────────────────────────────
// This ensures that when shared on WhatsApp, Facebook, iMessage, etc.,
// the project's actual photo and location appear in the rich preview card!
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    await connectDB();
    const project = await Project.findById(id).lean();
    if (!project) {
      return { title: "Project Not Found | A2Z Solar Solutions" };
    }

    const title = `${project.capacity} Solar Installation in ${project.location}`;
    const description = `Verified ${project.capacity} turnkey solar energy system installed in ${project.location} by A2Z Solar Solutions. 24/7 power backup and up to 90% savings on electricity bills.`;
    const image = project.imageUrl || "https://a2zsolarsolutions.com/images/solar-image.webp";
    const canonicalUrl = `https://a2zsolarsolutions.com/projects/${id}`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${title} | A2Z Solar Solutions`,
        description,
        url: canonicalUrl,
        siteName: "A2Z Solar Solutions",
        images: [
          {
            url: image,
            width: 1200,
            height: 800,
            alt: `${project.capacity} Solar Installation in ${project.location}`,
          },
        ],
        locale: "en_PK",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | A2Z Solar Solutions`,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: "Recent Solar Project | A2Z Solar Solutions" };
  }
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;

  let project = null;
  try {
    await connectDB();
    project = await Project.findById(id).lean();
  } catch (err) {
    console.error("Error loading project by ID:", err);
  }

  if (!project) {
    notFound();
  }

  const imgSrc = project.imageUrl || "/images/solar-image.webp";
  const shareTitle = `${project.capacity} Solar Installation in ${project.location} — A2Z Solar Solutions`;
  const shareUrl = `https://a2zsolarsolutions.com/projects/${id}`;

  const whatsappInquiryUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Salam A2Z Solar, I saw your ${project.capacity} solar setup in ${project.location} on your website (https://a2zsolarsolutions.com/projects/${id}) and would like to get a quote for my property.`
  )}`;

  return (
    <main className="min-h-screen bg-gray-50/60 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back Link */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#0fa353] transition-colors"
          >
            <FaArrowLeft size={13} />
            <span>Back to All Projects</span>
          </Link>
          <span className="text-xs text-gray-400">
            Project ID: <span className="font-mono text-gray-500">{String(project._id).slice(-6)}</span>
          </span>
        </div>

        {/* Main Showcase Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-7 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <FaSolarPanel size={12} className="text-[#0fa353]" />
                  <span>{project.capacity} System</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                  <FaCheck size={10} className="text-[#0fa353]" />
                  <span>Verified Installation</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-[#1a1c29] tracking-tight">
                {project.capacity} Solar Installation
              </h1>
              <p className="flex items-center gap-1.5 text-sm sm:text-base text-gray-500 mt-1 font-medium">
                <FaLocationDot size={13} className="text-[#0fa353] shrink-0" />
                <span>{project.location}</span>
              </p>
            </div>

            {/* Top Share Button on Desktop */}
            <div className="shrink-0">
              <SocialShareButton
                title={shareTitle}
                url={shareUrl}
                image={imgSrc}
                location={project.location}
                capacity={project.capacity}
                variant="outline"
                label="Share Project"
                headerTitle="Share Project"
              />
            </div>
          </div>

          {/* Photo Showcase */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[60vh] bg-neutral-900 flex items-center justify-center overflow-hidden">
            <Image
              src={imgSrc}
              alt={`${project.capacity} solar installation in ${project.location}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>

          {/* Details & Actions Footer */}
          <div className="p-5 sm:p-8 bg-white border-t border-gray-100 space-y-6">
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                  System Capacity
                </p>
                <p className="text-base sm:text-lg font-black text-[#1a1c29]">
                  {project.capacity}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                  Location / City
                </p>
                <p className="text-base sm:text-lg font-black text-[#1a1c29]">
                  {project.location}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                  Installation Quality
                </p>
                <p className="text-base sm:text-lg font-black text-emerald-700">
                  Tier-1 Turnkey
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#0fa353] px-6 text-sm sm:text-base font-bold text-white transition-all hover:bg-[#0c8a45] shadow-sm active:scale-[0.98]"
              >
                <FaWhatsapp size={19} />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaPhone size={15} />
                <span>Call Us</span>
              </a>

              <div className="sm:hidden">
                <SocialShareButton
                  title={shareTitle}
                  url={shareUrl}
                  image={imgSrc}
                  location={project.location}
                  capacity={project.capacity}
                  fullWidth
                  variant="outline"
                  label="Share Project"
                  headerTitle="Share Project"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0fa353] bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 transition-colors"
          >
            <span>Explore 250+ More Solar Projects</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

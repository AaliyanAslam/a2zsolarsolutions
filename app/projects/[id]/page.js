import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaLocationDot,
  FaWhatsapp,
  FaSolarPanel,
  FaArrowLeft,
  FaPhone,
  FaCheck,
  FaBolt,
  FaShieldHalved,
} from "react-icons/fa6";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${project.capacity} Solar Installation in ${project.location}`,
    provider: {
      "@type": "LocalBusiness",
      name: "A2Z Solar Solutions",
      url: "https://a2zsolarsolutions.com",
      telephone: PHONE_NUMBER,
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "DHA Phase 2 Ext, Main Commercial Area",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          addressCountry: "PK",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "House: 31, Lane 1, Muslimabad, Station Road, Mughalpura",
          addressLocality: "Lahore",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
      ],
    },
    areaServed: project.location,
    description: `Verified ${project.capacity} turnkey solar energy system installed in ${project.location} by A2Z Solar Solutions.`,
    image: imgSrc,
  };

  return (
    <main className="min-h-screen bg-gray-50/60 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-[#0fa353] transition-colors"
          >
            <FaArrowLeft
              size={12}
              className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            <span>Back to All Projects</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0fa353]" />
            <span>ID:</span>
            <span className="font-mono font-semibold text-gray-700">
              #{String(project._id).slice(-6).toUpperCase()}
            </span>
          </div>
        </nav>

        {/* Main Showcase Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Header */}
          <header className="p-4 xs:p-5 sm:p-7 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <FaSolarPanel size={12} className="text-[#0fa353] shrink-0" />
                  <span>{project.capacity} System</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  <FaCheck size={10} className="text-[#0fa353] shrink-0" />
                  <span>Verified Installation</span>
                </span>
              </div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-black text-[#1a1c29] tracking-tight leading-tight">
                {project.capacity} Solar Installation
              </h1>
              <p className="flex items-center gap-1.5 text-xs xs:text-sm sm:text-base text-gray-600 mt-1 font-medium">
                <FaLocationDot size={13} className="text-[#0fa353] shrink-0" />
                <span className="truncate">{project.location}</span>
              </p>
            </div>

            {/* Desktop / Tablet Top Share Button */}
            <div className="hidden sm:block shrink-0">
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
          </header>

          {/* Photo Showcase - optimized for all aspect ratios & mobile viewports */}
          <div className="relative w-full h-[46vh] xs:h-[52vh] sm:h-[64vh] md:h-[72vh] min-h-[290px] max-h-[500px] sm:max-h-[720px] bg-neutral-950 flex items-center justify-center overflow-hidden p-2 sm:p-4 select-none">
            <Image
              src={imgSrc}
              alt={`${project.capacity} solar installation in ${project.location} by A2Z Solar Solutions`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1024px"
              className="object-contain"
            />

            {/* Verified Site Badge */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/10 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0fa353] animate-pulse" />
                <span>Turnkey Site Execution</span>
              </span>
            </div>
          </div>

          {/* Details & Actions Footer */}
          <div className="p-4 xs:p-5 sm:p-8 bg-white border-t border-gray-100 space-y-5 sm:space-y-6">
            {/* Quick Specs Grid - 2 cols on mobile, 4 cols on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
              {/* Capacity */}
              <div className="p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100/90 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <FaSolarPanel size={12} className="text-[#0fa353] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                    Capacity
                  </span>
                </div>
                <p className="text-base sm:text-lg font-black text-[#1a1c29] truncate">
                  {project.capacity}
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                  Turnkey Setup
                </p>
              </div>

              {/* Location */}
              <div className="p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100/90 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <FaLocationDot size={12} className="text-[#0fa353] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                    Location
                  </span>
                </div>
                <p
                  className="text-base sm:text-lg font-black text-[#1a1c29] truncate"
                  title={project.location}
                >
                  {project.location}
                </p>
                <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                  Site Verified
                </p>
              </div>

              {/* Hardware Grade */}
              <div className="p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100/90 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <FaShieldHalved size={12} className="text-[#0fa353] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                    Hardware
                  </span>
                </div>
                <p className="text-base sm:text-lg font-black text-[#1a1c29]">
                  Tier-1 Rated
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                  High-Yield Panels
                </p>
              </div>

              {/* System Type */}
              <div className="p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100/90 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <FaBolt size={12} className="text-[#0fa353] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                    System Type
                  </span>
                </div>
                <p className="text-base sm:text-lg font-black text-[#1a1c29]">
                  Hybrid / On-Grid
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                  Net-Metering Ready
                </p>
              </div>
            </div>

            {/* Quality Standards Strip */}
            <div className="rounded-xl bg-emerald-50/50 border border-emerald-100/80 p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-[#0fa353] shrink-0" size={12} />
                  <span>Custom HDG galvanized L2/L3 structures</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-[#0fa353] shrink-0" size={12} />
                  <span>Tier-1 inverters with zero-export & net-metering</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-[#0fa353] shrink-0" size={12} />
                  <span>Pure copper double-insulated AC/DC cabling & SPDs</span>
                </div>
              </div>
            </div>

            {/* Actions: Mobile stacked 2-row layout, Desktop single flex row */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full sm:flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#0fa353] px-6 text-sm sm:text-base font-bold text-white transition-all hover:bg-[#0c8a45] shadow-xs active:scale-[0.98]"
              >
                <FaWhatsapp size={19} className="shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 sm:px-5 text-xs xs:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs active:scale-[0.98]"
                >
                  <FaPhone size={13} className="shrink-0 text-gray-600" />
                  <span>Call Us</span>
                </a>

                <div className="w-full sm:w-auto">
                  <SocialShareButton
                    title={shareTitle}
                    url={shareUrl}
                    image={imgSrc}
                    location={project.location}
                    capacity={project.capacity}
                    fullWidth
                    variant="outline"
                    label="Share"
                    headerTitle="Share Project"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <Link
            href="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 transition-colors shadow-2xs"
          >
            <FaArrowLeft size={11} />
            <span>View All Installations</span>
          </Link>
          <Link
            href="/#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0fa353] bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 transition-colors shadow-2xs"
          >
            <span>Calculate Solar Sizing for Your Home</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

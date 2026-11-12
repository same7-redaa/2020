"use client";

import React from "react";
import { 
  Target,
  TrendingUp,
  Film,
  Palette
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SingleDepartmentCoverflow from "@/components/portfolio/SingleDepartmentCoverflow";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface PortfolioCategory {
  id: string;
  slug: string;
  departmentNumber: string;
  field: string;
  category: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  ctaText: string;
}

const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "media-buying-gallery",
    slug: "media-buying",
    departmentNumber: "قسم 01",
    field: "Meta & TikTok & Google Ads",
    category: "معرض الميديا باينج",
    subtitle: "Media Buying · Scaling Success",
    title: "إدارة وتـــوســـيـــع الـــحـــمـــلات الـــمـــمـــولـــة",
    description: "إطلاق وإدارة حملات Meta و TikTok و Google Ads بميزانيات ضخمة وتحقيق أعلى عائد إعلاني (ROAS).",
    image: "/portfolio/2a9b34945a84d3883bef59ee57fb0121.jpg",
    icon: TrendingUp,
    ctaText: "معرض الميديا باينج",
  },
  {
    id: "motion-video-gallery",
    slug: "motion-video",
    departmentNumber: "قسم 02",
    field: "Motion Graphics & Reels",
    category: "الموشن جرافيك والفيديو",
    subtitle: "Motion Graphics · Video Ads",
    title: "الـــمـــوشـــن ومـــونـــتـــاج الـــفـــيـــديـــوهـــات",
    description: "إنتاج فيديوهات إعلانية وموشن جرافيك للريلز وتيك توك تخطف الانتباه وتحفز الشراء الفوري.",
    image: "/portfolio/8d26727dd84afc3d2d99da81126bdcfe.jpg",
    icon: Film,
    ctaText: "معرض الموشن والفيديو",
  },
  {
    id: "social-designs-gallery",
    slug: "social-designs",
    departmentNumber: "قسم 03",
    field: "Social Media & Ads",
    category: "تصميمات سوشيال",
    subtitle: "Social Designs · Ad Creatives",
    title: "تـــصـــامـــيـــم الـــســـوشـــيـــال مـــيـــديـــا",
    description: "تصميم بوستات وبانرات إعلانية احترافية توقف التمرير وترفع معدلات التفاعل والنقر (CTR).",
    image: "/portfolio/0eb69c9aba3b9e587f00ebb3976d7cb1.jpg",
    icon: Palette,
    ctaText: "معرض تصاميم السوشيال",
  },
  {
    id: "ecommerce-scaling-gallery",
    slug: "ecommerce-scaling",
    departmentNumber: "قسم 04",
    field: "E-Commerce & CRO",
    category: "معرض المتاجر",
    subtitle: "Store Scaling · CRO Mastery",
    title: "تـــوســـيـــع الـــمـــتـــاجـــر وهـــنـــدســـة الـــتـــحـــويـــل",
    description: "تحسين صفحات الهبوط ومسار الشراء لمضاعفة مبيعات المتاجر الإلكترونية ورفع هوامش الربح.",
    image: "/portfolio/a6d2c954f419aa7199d41d1bdf61f9de.jpg",
    icon: Target,
    ctaText: "معرض أعمال المتاجر",
  },
];

import { useLanguage } from "@/context/LanguageContext";

export default function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <section
      id="portfolio"
      className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 text-white overflow-hidden scroll-mt-24"
    >
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF8B2C]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#FF8B2C]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Decorative Background Artworks */}
      <div
        className="absolute top-12 right-8 w-64 h-64 sm:w-88 sm:h-88 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none rotate-[15deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/logo.png')` }}
      />
      <div
        className="absolute bottom-12 left-8 w-56 h-56 sm:w-76 sm:h-76 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none -rotate-[20deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/social-media.png')` }}
      />

      {/* Seamless Top & Bottom Black Gradient Fades */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#060608] via-[#060608]/90 to-transparent pointer-events-none z-10" />

      {/* Section Container */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-12 max-w-[1280px]">
        
        {/* Section Header */}
        <ScrollReveal direction="up" blurAmount={16}>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-serif">
              {t.portfolio.titlePrefix} <span className="text-[#FF8B2C] drop-shadow-[0_0_24px_rgba(255,139,44,0.45)]">{t.portfolio.titleHighlight}</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-medium max-w-xl mx-auto">
              {t.portfolio.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Standalone 3D Coverflow Departments */}
        <div className="w-full space-y-12 sm:space-y-16">
          {PORTFOLIO_CATEGORIES.map((dept) => {
            const catData = PORTFOLIO_DATA[dept.slug];
            const projects = catData?.galleryProjects || [];
            const translatedDept = t.portfolio.departments.find((d) => d.slug === dept.slug);

            const deptTitle = translatedDept ? translatedDept.title : dept.title;
            const deptSubtitle = translatedDept ? translatedDept.subtitle : dept.subtitle;
            const deptDesc = translatedDept ? translatedDept.description : dept.description;
            const deptNum = translatedDept ? translatedDept.departmentNumber : dept.departmentNumber;
            const deptCta = translatedDept ? translatedDept.ctaText : dept.ctaText;

            return (
              <SingleDepartmentCoverflow
                key={dept.id}
                slug={dept.slug}
                departmentNumber={deptNum}
                title={deptTitle}
                subtitle={deptSubtitle}
                description={deptDesc}
                icon={dept.icon}
                ctaText={deptCta}
                initialProjects={projects}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

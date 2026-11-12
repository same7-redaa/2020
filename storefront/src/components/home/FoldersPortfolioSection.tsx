"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Target,
  TrendingUp,
  ExternalLink,
  Film,
  Palette,
  FolderOpen
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FolderCategory {
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
  strategicPillars: string[];
  ctaText: string;
}

const FOLDER_CATEGORIES: FolderCategory[] = [
  {
    id: "folder-media-buying",
    slug: "media-buying",
    departmentNumber: "قسم 01",
    field: "Meta & TikTok & Google Ads",
    category: "معرض الميديا باينج",
    subtitle: "Media Buying · Scaling Success",
    title: "إدارة وتوسيع الحملات الممولة",
    description: "إطلاق وإدارة حملات Meta و TikTok و Google Ads بميزانيات ضخمة وتحقيق أعلى عائد إعلاني (ROAS).",
    image: "/portfolio/2a9b34945a84d3883bef59ee57fb0121.jpg",
    icon: TrendingUp,
    strategicPillars: [
      "هيكلة الـ Full-Funnel والتوسع المالي",
      "خفض تكلفة الاقتناء (CPP) وإعادة الاستهداف",
    ],
    ctaText: "معرض الميديا باينج",
  },
  {
    id: "folder-motion-video",
    slug: "motion-video",
    departmentNumber: "قسم 02",
    field: "Motion Graphics & Reels",
    category: "الموشن جرافيك والفيديو",
    subtitle: "Motion Graphics · Video Ads",
    title: "الموشن ومونتاج الفيديوهات",
    description: "إنتاج فيديوهات إعلانية وموشن جرافيك للريلز وتيك توك تخطف الانتباه وتحفز الشراء الفوري.",
    image: "/portfolio/8d26727dd84afc3d2d99da81126bdcfe.jpg",
    icon: Film,
    strategicPillars: [
      "مونتاج سينمائي بـ Premiere Pro و AE",
      "مؤثرات بصرية وصوتية ترفع المشاهدة",
    ],
    ctaText: "معرض الموشن والفيديو",
  },
  {
    id: "folder-social-designs",
    slug: "social-designs",
    departmentNumber: "قسم 03",
    field: "Social Media & Ads",
    category: "تصميمات سوشيال",
    subtitle: "Social Designs · Ad Creatives",
    title: "تصاميم السوشيال ميديا",
    description: "تصميم بوستات وبانرات إعلانية احترافية توقف التمرير وترفع معدلات التفاعل والنقر (CTR).",
    image: "/portfolio/0eb69c9aba3b9e587f00ebb3976d7cb1.jpg",
    icon: Palette,
    strategicPillars: [
      "تصاميم بـ Photoshop & Illustrator",
      "كرييتفز ترفع معدل النقر (CTR)",
    ],
    ctaText: "معرض تصاميم السوشيال",
  },
  {
    id: "folder-ecommerce-scaling",
    slug: "ecommerce-scaling",
    departmentNumber: "قسم 04",
    field: "E-Commerce & CRO",
    category: "معرض المتاجر",
    subtitle: "Store Scaling · CRO Mastery",
    title: "توسيع المتاجر وهندسة التحويل",
    description: "تحسين صفحات الهبوط ومسار الشراء لمضاعفة مبيعات المتاجر الإلكترونية ورفع هوامش الربح.",
    image: "/portfolio/a6d2c954f419aa7199d41d1bdf61f9de.jpg",
    icon: Target,
    strategicPillars: [
      "تحسين صفحات الهبوط وتجربة الدفع",
      "هيكلة باقات وعروض تزيد المبيعات",
    ],
    ctaText: "معرض أعمال المتاجر",
  },
];

export default function FoldersPortfolioSection() {
  const router = useRouter();
  const [openingSlug, setOpeningSlug] = useState<string | null>(null);

  const handleOpenAndNavigate = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    if (openingSlug) return;

    setOpeningSlug(slug);

    setTimeout(() => {
      router.push(`/portfolio/${slug}`);
    }, 420);
  };

  return (
    <section
      id="folders-portfolio"
      className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 text-white overflow-hidden scroll-mt-24"
    >
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF8B2C]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#FF8B2C]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Decorative Background Artworks */}
      <div
        className="absolute top-12 left-8 w-64 h-64 sm:w-88 sm:h-88 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none -rotate-[15deg] -z-10"
        style={{ backgroundImage: `url('/bg-art/logo.png')` }}
      />
      <div
        className="absolute bottom-12 right-8 w-56 h-56 sm:w-76 sm:h-76 bg-contain bg-no-repeat opacity-10 mix-blend-screen pointer-events-none rotate-[20deg] -z-10"
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8B2C]/10 border border-[#FF8B2C]/30 text-[#FF8B2C] text-xs font-black mb-3 shadow-[0_0_16px_rgba(255,139,44,0.2)]">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>مــلــفــات الأعــمــال الــتــفــاعــلــيــة</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              أقـــســــام <span className="text-[#FF8B2C] drop-shadow-[0_0_24px_rgba(255,139,44,0.45)]">مــجــلــدات الأعـــمــــال</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-400 font-bold max-w-xl mx-auto leading-relaxed">
              افتح المجلدات التفاعلية لاستعراض الرؤية الاستراتيجية ونطاق العمل لكل قسم
            </p>
          </div>
        </ScrollReveal>

        {/* 2x2 Interactive 3D Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto pt-4 pb-8">
          {FOLDER_CATEGORIES.map((dept, idx) => {
            const Icon = dept.icon;
            const isOpening = openingSlug === dept.slug;

            return (
              <div key={dept.id} className="w-full h-full">
                <ScrollReveal 
                  direction="up" 
                  delay={idx * 60}
                  blurAmount={12}
                  className="h-full"
                >
                  <div 
                    onClick={(e) => handleOpenAndNavigate(e, dept.slug)}
                    className={`relative w-full h-full group cursor-pointer transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isOpening ? "-translate-y-4 scale-[1.02]" : "hover:-translate-y-4"
                    }`}
                  >
                    {/* Layer 2 */}
                    <div 
                      className={`absolute top-[-7%] left-1/2 -translate-x-1/2 w-[82%] h-[82%] rounded-[24px] sm:rounded-[28px] bg-[#0c0c14] border border-[#FF8B2C]/30 shadow-[0_8px_20px_rgba(0,0,0,0.6)] origin-bottom z-0 transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none ${
                        isOpening 
                          ? "rotate-[7deg] top-0 w-full h-full border-[#FF8B2C]/60 bg-[#FF8B2C]/10" 
                          : "group-hover:rotate-[7deg] group-hover:top-0 group-hover:w-full group-hover:h-full group-hover:border-[#FF8B2C]/60 group-hover:bg-[#FF8B2C]/10"
                      }`}
                    />

                    {/* Layer 1 */}
                    <div 
                      className={`absolute top-[-3.5%] left-1/2 -translate-x-1/2 w-[91%] h-[91%] rounded-[24px] sm:rounded-[28px] bg-[#14141f] border border-[#FF8B2C]/50 shadow-[0_10px_25px_rgba(0,0,0,0.7)] origin-bottom z-0 transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none ${
                        isOpening
                          ? "-rotate-[7deg] top-0 w-full h-full border-[#FF8B2C] bg-[#FF8B2C]/15"
                          : "group-hover:-rotate-[7deg] group-hover:top-0 group-hover:w-full group-hover:h-full group-hover:border-[#FF8B2C] group-hover:bg-[#FF8B2C]/15"
                      }`}
                    />

                    {/* Main Front Content Card */}
                    <article
                      className={`relative z-10 rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 h-full bg-[#0d0d14] border-2 shadow-[0_10px_30px_rgba(0,0,0,0.85)] transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-between overflow-hidden ${
                        isOpening 
                          ? "border-[#FFA857] shadow-[0_20px_60px_rgba(255,139,44,0.5)] bg-[#12121e]" 
                          : "border-[#FF8B2C] group-hover:shadow-[0_20px_50px_rgba(255,139,44,0.32)]"
                      }`}
                    >
                      <div>
                        {/* Top Row: Department Icon & Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            isOpening 
                              ? "bg-[#FF8B2C] text-[#060608] scale-110 shadow-[0_0_16px_#FF8B2C]" 
                              : "bg-[#FF8B2C]/15 border border-[#FF8B2C] text-[#FF8B2C] shadow-[0_0_12px_rgba(255,139,44,0.3)] group-hover:scale-105 group-hover:bg-[#FF8B2C] group-hover:text-[#060608]"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className={`text-base sm:text-lg font-black transition-colors ${
                            isOpening ? "text-[#FFA857]" : "text-white group-hover:text-[#FF8B2C]"
                          }`}>
                            {dept.title}
                          </h3>
                        </div>

                        {/* 3D Opening Folder Component */}
                        <div className="relative w-full h-36 sm:h-44 flex items-center justify-center overflow-visible mb-3 select-none py-2">
                          <div className="file relative w-48 sm:w-56 h-28 sm:h-32 cursor-pointer origin-bottom [perspective:1500px] z-20">
                            <div className={`work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-16 sm:after:w-20 after:h-4 after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[60px] sm:before:left-[75.5px] before:w-4 before:h-4 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);] ${
                              isOpening ? "shadow-[0_20px_40px_rgba(0,0,0,.3)]" : "group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)]"
                            }`} />
                            
                            <div className={`work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none ${
                              isOpening ? "[transform:rotateX(-24deg)]" : "group-hover:[transform:rotateX(-20deg)]"
                            }`} />
                            
                            <div className={`work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom ${
                              isOpening ? "[transform:rotateX(-34deg)]" : "group-hover:[transform:rotateX(-30deg)]"
                            }`} />
                            
                            <div className={`work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom ${
                              isOpening ? "[transform:rotateX(-42deg)]" : "group-hover:[transform:rotateX(-38deg)]"
                            }`} />

                            <div className={`work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[104px] sm:h-[120px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[110px] sm:after:w-[136px] after:h-[14px] after:bg-amber-400 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[106px] sm:before:right-[132px] before:size-3 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end shadow-lg ${
                              isOpening 
                                ? "shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] [transform:rotateX(-52deg)_translateY(2px)]" 
                                : "group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(1px)]"
                            }`} />
                          </div>
                        </div>

                        {/* Concise Description */}
                        <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal mb-3">
                          {dept.description}
                        </p>

                        {/* Scope / Strategic Pillars List */}
                        <div className="space-y-1.5 mb-3.5 pb-3 border-b border-white/10 group-hover:border-[#FF8B2C]/30 transition-colors">
                          {dept.strategicPillars.map((pillar, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-zinc-300 text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8B2C] mt-1.5 flex-shrink-0 shadow-[0_0_6px_#FF8B2C]" />
                              <span className="leading-snug">{pillar}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom: Direct Action Button */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleOpenAndNavigate(e, dept.slug)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-xs transition-all shadow-[0_2px_12px_rgba(255,139,44,0.35)] cursor-pointer group/btn ${
                            isOpening 
                              ? "bg-[#FFA857] text-[#060608] scale-105 shadow-[0_0_20px_#FF8B2C]" 
                              : "bg-[#FF8B2C] text-[#060608] hover:bg-[#FFA857] hover:scale-105 active:scale-95"
                          }`}
                        >
                          <span>{isOpening ? "جاري فتح المعرض..." : dept.ctaText}</span>
                          <ArrowLeft className={`w-3.5 h-3.5 transition-transform flex-shrink-0 ${isOpening ? "-translate-x-2" : "group-hover/btn:-translate-x-1"}`} />
                        </button>

                        <Link
                          href={`/portfolio/${dept.slug}`}
                          onClick={(e) => handleOpenAndNavigate(e, dept.slug)}
                          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#FF8B2C] transition-colors flex-shrink-0 group-hover:border-white/30 cursor-pointer"
                          title="عرض دراسات الحالة والمعرض"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

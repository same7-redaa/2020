"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HowIWorkSection from "@/components/portfolio/HowIWorkSection";
import PortfolioGalleryGrid from "@/components/portfolio/PortfolioGalleryGrid";
import EcommercePlatformsSections from "@/components/portfolio/EcommercePlatformsSections";
import SocialConnect from "@/components/home/SocialConnect";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryClientViewProps {
  categorySlug: string;
}

export default function CategoryClientView({ categorySlug }: CategoryClientViewProps) {
  const { isAr, t } = useLanguage();
  const category = PORTFOLIO_DATA[categorySlug];

  if (!category) {
    return null;
  }

  const otherCategories = Object.values(PORTFOLIO_DATA).filter(
    (c) => c.slug !== category.slug
  );

  const categoryTrans = t.portfolioPage.categoryData[categorySlug as keyof typeof t.portfolioPage.categoryData];
  const pageTitle = categoryTrans?.title || category.title;
  const pageDesc = categoryTrans?.heroDescription || category.heroDescription;

  return (
    <main className="min-h-screen pt-28 pb-0 text-white overflow-hidden flex flex-col justify-between selection:bg-[#FF8B2C]/30 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-[#FF8B2C]/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-1/4 w-[500px] h-[500px] bg-[#FF8B2C]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 right-10 w-[450px] h-[450px] bg-[#FF8B2C]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Decorative Watermark Arts */}
      <div
        className="absolute top-32 right-6 w-80 h-80 bg-contain bg-no-repeat opacity-[0.05] mix-blend-screen pointer-events-none rotate-12 -z-10"
        style={{ backgroundImage: `url('/bg-art/logo.png')` }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Centered Hero */}
        <section className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 pt-4">
          <ScrollReveal direction="up" blurAmount={12}>
            {/* Centered Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
              {pageTitle}
            </h1>

            {/* Centered Short Description */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl mx-auto">
              {pageDesc}
            </p>
          </ScrollReveal>
        </section>

        {/* 2. How I Work Section */}
        <HowIWorkSection categorySlug={category.slug} />

        {/* 3. Portfolio Image Gallery */}
        {category.slug === "ecommerce-scaling" ? (
          <EcommercePlatformsSections allProjects={category.galleryProjects} />
        ) : (
          <PortfolioGalleryGrid
            projects={category.galleryProjects}
            categoryTitle={pageTitle}
            categorySlug={category.slug}
          />
        )}

        {/* 4. Other Portfolio Categories Navigation */}
        <section className="my-16 sm:my-20">
          <ScrollReveal direction="up" blurAmount={12}>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c14] border border-[#FF8B2C]/30 text-center">
              <div className="max-w-md mx-auto mb-8">
                <p className="text-xs font-black text-[#FF8B2C] mb-1">
                  {t.portfolioPage.otherDepartmentsBadge}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {t.portfolioPage.otherDepartmentsTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherCategories.map((other) => {
                  const otherTrans = t.portfolioPage.categoryData[other.slug as keyof typeof t.portfolioPage.categoryData];
                  const otherName = otherTrans?.categoryName || other.categoryName;

                  return (
                    <Link
                      key={other.slug}
                      href={`/portfolio/${other.slug}`}
                      className={`p-4 rounded-2xl bg-[#14141f] border border-white/10 hover:border-[#FF8B2C] transition-all hover:bg-[#1a1a29] flex items-center justify-between group ${isAr ? "text-right" : "text-left"}`}
                    >
                      <div>
                        <p className="text-sm font-black text-white group-hover:text-[#FF8B2C] transition-colors">
                          {otherName}
                        </p>
                      </div>
                      {isAr ? (
                        <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-[#FF8B2C] group-hover:-translate-x-1 transition-all" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#FF8B2C] group-hover:translate-x-1 transition-all" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

      </div>

      {/* Full-width Background Fade */}
      <div className="w-full h-40 -mt-20 bg-gradient-to-b from-transparent via-[#060608]/80 to-[#060608] pointer-events-none -z-10" />

      {/* Reused Full SocialConnect Section */}
      <SocialConnect 
        titlePrefix={t.portfolioPage.ctaPrefix}
        titleHighlight={t.portfolioPage.ctaHighlight}
        descriptionLines={t.portfolioPage.ctaLines}
      />

    </main>
  );
}

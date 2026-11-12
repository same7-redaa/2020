import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import CategoryClientView from "@/components/portfolio/CategoryClientView";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { category: "media-buying" },
    { category: "motion-video" },
    { category: "social-designs" },
    { category: "ecommerce-scaling" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = PORTFOLIO_DATA[resolvedParams.category];

  if (!category) {
    return {
      title: "معرض الأعمال | إبراهيم علي سليم",
    };
  }

  return {
    title: `${category.title} | إبراهيم علي سليم`,
    description: category.heroDescription,
  };
}

export default async function PortfolioCategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = PORTFOLIO_DATA[resolvedParams.category];

  if (!category) {
    notFound();
  }

  return <CategoryClientView categorySlug={resolvedParams.category} />;
}

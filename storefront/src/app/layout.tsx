import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/layout/SplashScreen";
import ScrollToTop from "@/components/providers/ScrollToTop";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { ClientLogosProvider } from "@/context/ClientLogosContext";
import { ContactSettingsProvider } from "@/context/ContactSettingsContext";
import { LanguageProvider } from "@/context/LanguageContext";

const thmanyahText = localFont({
  src: [
    {
      path: "../../public/fonts/thmanyah-serif-text-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah-serif-text-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah-serif-text-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah-serif-text-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-text",
  display: "swap",
  preload: true,
});

const thmanyahDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/thmanyah-serif-display-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah-serif-display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah-serif-display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "إبراهيم علي سليم | خبير التسويق الرقمي وتوسيع المتاجر الإلكترونية",
  description: "الموقع الرسمي لإبراهيم علي سليم - خبير التسويق الرقمي وإدارة الحملات الإعلانية وتوسيع المتاجر عبر Meta و TikTok و Google",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`h-full antialiased dark ${thmanyahText.variable} ${thmanyahDisplay.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={`min-h-full flex flex-col ambient-glow-bg text-[#f4f4f6] relative selection:bg-[#FF8B2C]/30 selection:text-white ${thmanyahText.className}`}>
        <LanguageProvider>
          <ContactSettingsProvider>
            <PortfolioProvider>
              <ClientLogosProvider>
                <SplashScreen />
                <SmoothScrollProvider>
                  <Suspense fallback={null}>
                    <ScrollToTop />
                  </Suspense>
                  <Header />
                  <div className="relative z-10 flex-grow flex flex-col">
                    {children}
                  </div>
                  <FloatingWhatsApp />
                  <Footer />
                </SmoothScrollProvider>
              </ClientLogosProvider>
            </PortfolioProvider>
          </ContactSettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

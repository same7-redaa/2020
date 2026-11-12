"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Check, 
  Film, 
  Palette, 
  TrendingUp, 
  Target, 
  Play, 
  Globe, 
  Eye, 
  Sparkles,
  Briefcase,
  Users,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Star,
  Phone,
  MessageCircle,
  Mail,
  Send,
  Share2,
  Save
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { useClientLogos } from "@/context/ClientLogosContext";
import { useContactSettings } from "@/context/ContactSettingsContext";

const CATEGORY_TABS = [
  { slug: "media-buying", name: "الميديا باينج", icon: TrendingUp, fullTitle: "الميديا باينج وإدارة الحملات" },
  { slug: "motion-video", name: "الموشن جرافيك", icon: Film, fullTitle: "الموشن جرافيك ومونتاج الفيديوهات" },
  { slug: "social-designs", name: "تصاميم السوشيال", icon: Palette, fullTitle: "تصميمات السوشيال ميديا والهوية" },
  { slug: "ecommerce-scaling", name: "توسيع المتاجر", icon: Target, fullTitle: "معرض نمو وتوسيع المتاجر" },
];

export default function AdminPage() {
  const { data, getProjects, deleteProject, toggleFeaturedProject } = usePortfolio();
  const { logos, addLogo, deleteLogo } = useClientLogos();
  const { settings: contactSettings, updateSettings: updateContactSettings } = useContactSettings();
  
  // Navigation section: 'portfolio' | 'clients' | 'contact'
  const [adminSection, setAdminSection] = useState<"portfolio" | "clients" | "contact">("portfolio");
  const [activeTab, setActiveTab] = useState("media-buying");
  
  // Modals & toast
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteLogoConfirmId, setDeleteLogoConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Contact Settings local state
  const [contactForm, setContactForm] = useState({
    whatsapp: "",
    whatsappDisplay: "",
    phone: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    telegram: "",
    linkedin: "",
    email: "",
    defaultMessage: "",
  });
  const [isSavingContact, setIsSavingContact] = useState(false);

  useEffect(() => {
    if (contactSettings) {
      setContactForm({
        whatsapp: contactSettings.whatsapp || "",
        whatsappDisplay: contactSettings.whatsappDisplay || "",
        phone: contactSettings.phone || "",
        facebook: contactSettings.facebook || "",
        instagram: contactSettings.instagram || "",
        tiktok: contactSettings.tiktok || "",
        telegram: contactSettings.telegram || "",
        linkedin: contactSettings.linkedin || "",
        email: contactSettings.email || "",
        defaultMessage: contactSettings.defaultMessage || "",
      });
    }
  }, [contactSettings]);

  // New Client Logo Form State (Pure Image Upload, No Name)
  const [newLogoImage, setNewLogoImage] = useState("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isLogoSubmitting, setIsLogoSubmitting] = useState(false);
  const [logoFormError, setLogoFormError] = useState<string | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(activeTab, id);
    setDeleteConfirmId(null);
    showToast("تم حذف العمل بنجاح!");
  };

  const handleToggleFeatured = async (projectId: string, currentStatus?: boolean) => {
    await toggleFeaturedProject(activeTab, projectId);
    if (!currentStatus) {
      showToast("⭐ تم تمييز العمل للظهور في كروسيل الصفحة الرئيسية!");
    } else {
      showToast("تم إلغاء تمييز العمل من كروسيل الصفحة الرئيسية");
    }
  };

  const handleSaveContactSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingContact(true);
    try {
      await updateContactSettings(contactForm);
      showToast("تم حفظ وتحديث كافة أرقام وروابط التواصل بنجاح!");
    } catch (err) {
      console.error(err);
      showToast("حدث خطأ أثناء حفظ الإعدادات");
    } finally {
      setIsSavingContact(false);
    }
  };

  const handleDeleteLogo = (id: string) => {
    deleteLogo(id);
    setDeleteLogoConfirmId(null);
    showToast("تم حذف اللوجو بنجاح!");
  };

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLogoFormError("يرجى اختيار ملف صورة صالح (PNG, SVG, JPG, WebP).");
      return;
    }

    setLogoFormError(null);
    setIsUploadingLogo(true);

    // 1. Show immediate preview
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      setNewLogoImage(result);
    };
    reader.readAsDataURL(file);

    // 2. Upload to server disk
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/portfolio/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.success && json.url) {
        setNewLogoImage(json.url);
      } else {
        setLogoFormError(json.message || "فشل رفع اللوجو إلى الخادم");
      }
    } catch (err) {
      console.warn("Upload logo to server failed, using local base64:", err);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleAddLogoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLogoFormError(null);

    if (!newLogoImage.trim()) {
      setLogoFormError("يرجى رفع صورة اللوجو أو إدخال رابط الصورة.");
      return;
    }

    setIsLogoSubmitting(true);
    try {
      addLogo({
        image: newLogoImage.trim(),
      });
      setNewLogoImage("");
      if (logoFileInputRef.current) logoFileInputRef.current.value = "";
      showToast("تمت إضافة اللوجو بنجاح إلى شريط العملاء!");
    } catch (err) {
      console.error(err);
      setLogoFormError("حدث خطأ أثناء حفظ اللوجو.");
    } finally {
      setIsLogoSubmitting(false);
    }
  };

  const currentProjects = getProjects(activeTab);
  const activeCategoryMeta = PORTFOLIO_DATA[activeTab];

  return (
    <main className="min-h-screen pt-6 sm:pt-8 pb-16 text-white bg-[#060608] selection:bg-[#FF8B2C]/30 selection:text-white relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-[#FF8B2C]/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-[#FF8B2C]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100000] px-6 py-3 rounded-2xl bg-[#0e0e14]/95 border-2 border-[#FF8B2C] text-[#FF8B2C] font-black text-sm shadow-[0_10px_35px_rgba(255,139,44,0.35)] flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 max-w-[1720px] mx-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#FF8B2C] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>لوحــــة تـــحـــكـــم الـــمـــوقـــع</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              إدارة <span className="text-[#FF8B2C] drop-shadow-[0_0_20px_rgba(255,139,44,0.4)]">معارض الأعمال وشريط العملاء وبيانات التواصل</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FF8B2C] hover:bg-[#FFA857] text-[#060608] text-xs sm:text-sm font-black shadow-[0_4px_20px_rgba(255,139,44,0.35)] transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة الموقع بالكامل</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Primary Admin Mode Switcher: Portfolio vs Client Logos vs Contact Settings */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 p-1.5 rounded-2xl bg-[#0e0e16] border border-white/10 max-w-2xl overflow-x-auto">
          <button
            type="button"
            onClick={() => setAdminSection("portfolio")}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              adminSection === "portfolio"
                ? "bg-[#FF8B2C] text-[#060608] shadow-[0_4px_20px_rgba(255,139,44,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>معارض الأعمال</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection("clients")}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              adminSection === "clients"
                ? "bg-[#FF8B2C] text-[#060608] shadow-[0_4px_20px_rgba(255,139,44,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>لوجوهات عملائي ({logos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection("contact")}
            className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              adminSection === "contact"
                ? "bg-[#FF8B2C] text-[#060608] shadow-[0_4px_20px_rgba(255,139,44,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>روابط وأرقام التواصل</span>
          </button>
        </div>

        {/* SECTION 3: CONTACT & SOCIAL SETTINGS MANAGEMENT */}
        {adminSection === "contact" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Info Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c14] border border-[#FF8B2C]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#FF8B2C] block mb-1">
                  إعدادات التواصل • السوشيال ميديا والواتساب
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  التحكم في أرقام الواتساب وروابط منصات التواصل
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  أي تعديل هنا يتم تطبيقه فوراً في زر الواتساب العائم، وقسم السوشيال ميديا، والفوتر، وأزرار طلب الخدمة في الموقع بالكامل.
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-[#12121c] border border-white/10 flex items-center gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-300">متصل ومتزامن مع الموقع</span>
              </div>
            </div>

            {/* Form Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e16] border border-white/10 shadow-xl">
              <form onSubmit={handleSaveContactSettings} className="space-y-6">
                
                {/* WhatsApp Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="text-base font-black text-[#FF8B2C] flex items-center gap-2 mb-4">
                    <MessageCircle className="w-5 h-5" />
                    <span>إعدادات الواتساب والمحادثات المباشرة</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رقم الواتساب بالصيغة الدولية (بدون + أو مسافات): <span className="text-[#FF8B2C]">*</span>
                      </label>
                      <input
                        type="text"
                        value={contactForm.whatsapp}
                        onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value.replace(/[^0-9]/g, "") })}
                        placeholder="201026048123"
                        required
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-sm font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1">
                        هذا الرقم الذي سيتم توجيه العملاء إليه عند الضغط على أزرار الواتساب (مثال: 201026048123).
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        الرقم الظاهر للعميل في النصوص (اختياري):
                      </label>
                      <input
                        type="text"
                        value={contactForm.whatsappDisplay}
                        onChange={(e) => setContactForm({ ...contactForm, whatsappDisplay: e.target.value })}
                        placeholder="+20 102 604 8123"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-sm font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1">
                        الشكل الجمالي المنسق للرقم الذي يظهر في النصوص والفوتر.
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رسالة الواتساب الترحيبية الافتراضية:
                      </label>
                      <input
                        type="text"
                        value={contactForm.defaultMessage}
                        onChange={(e) => setContactForm({ ...contactForm, defaultMessage: e.target.value })}
                        placeholder="مرحباً إبراهيم، أود الاستفسار عن خدماتك وبدء العمل معك."
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Direct Calls & Email Section */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-4">
                    <Phone className="w-5 h-5 text-[#FF8B2C]" />
                    <span>الاتصال المباشر والبريد الإلكتروني</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رقم الهاتف للاتصال المباشر (Phone Call):
                      </label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+201026048123"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-sm font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        البريد الإلكتروني (Email Address):
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="contact@ibrahimslim.online"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-sm font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Links Section */}
                <div className="pb-4">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-4">
                    <Share2 className="w-5 h-5 text-[#FF8B2C]" />
                    <span>روابط منصات التواصل الاجتماعي</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رابط فيسبوك (Facebook URL):
                      </label>
                      <input
                        type="url"
                        value={contactForm.facebook}
                        onChange={(e) => setContactForm({ ...contactForm, facebook: e.target.value })}
                        placeholder="https://facebook.com/..."
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-xs font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رابط إنستجرام (Instagram URL):
                      </label>
                      <input
                        type="url"
                        value={contactForm.instagram}
                        onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                        placeholder="https://instagram.com/..."
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-xs font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رابط لينكد إن (LinkedIn Profile URL):
                      </label>
                      <input
                        type="url"
                        value={contactForm.linkedin}
                        onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-xs font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رابط تيك توك (TikTok URL):
                      </label>
                      <input
                        type="url"
                        value={contactForm.tiktok}
                        onChange={(e) => setContactForm({ ...contactForm, tiktok: e.target.value })}
                        placeholder="https://tiktok.com/@..."
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-xs font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        رابط تليجرام (Telegram URL):
                      </label>
                      <input
                        type="url"
                        value={contactForm.telegram}
                        onChange={(e) => setContactForm({ ...contactForm, telegram: e.target.value })}
                        placeholder="https://t.me/..."
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-xs font-mono outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSavingContact}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF8B2C] hover:bg-[#FFA857] text-[#060608] font-black text-sm shadow-[0_4px_25px_rgba(255,139,44,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 stroke-[2.5]" />
                    <span>{isSavingContact ? "جاري الحفظ والتحديث..." : "حفظ وتحديث روابط التواصل فوراً"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SECTION 1: CLIENT LOGOS MANAGEMENT */}
        {adminSection === "clients" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Info Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c14] border border-[#FF8B2C]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#FF8B2C] block mb-1">
                  قسم شركاء النجاح • الشريط المتحرك (Clients Ticker)
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  التحكم في صور لوجوهات العملاء والشركات
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  يمكنك رفع صور اللوجوهات الجديدة من جهازك مباشرة أو حذف أي لوجو قديم ليتم تحديث الشريط المتحرك في الصفحة الرئيسية فوراً.
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-[#12121c] border border-white/10 text-center shrink-0">
                <span className="text-[11px] text-zinc-400 block font-bold">إجمالي اللوجوهات</span>
                <span className="text-xl sm:text-2xl font-black text-[#FF8B2C]">{logos.length}</span>
              </div>
            </div>

            {/* Add New Client Logo Form Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e16] border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-black text-white mb-6 pb-4 border-b border-white/10">
                <Plus className="w-5 h-5 text-[#FF8B2C]" />
                <span>رفع وإضافة لوجو جديد إلى الشريط المتحرك</span>
              </div>

              <form onSubmit={handleAddLogoSubmit} className="space-y-6">
                
                {logoFormError && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{logoFormError}</span>
                  </div>
                )}

                {/* Upload from Device Dropzone */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-2">
                    اختر أو اسحب صورة اللوجو من جهازك: <span className="text-[#FF8B2C]">*</span>
                  </label>
                  
                  <div
                    onClick={() => logoFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                      newLogoImage
                        ? "border-[#FF8B2C]/50 bg-[#FF8B2C]/5"
                        : "border-white/15 bg-[#08080c] hover:border-[#FF8B2C]/40 hover:bg-white/5"
                    }`}
                  >
                    <input
                      ref={logoFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="hidden"
                    />

                    {newLogoImage ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-36 h-20 relative bg-[#12121c] rounded-2xl border border-[#FF8B2C]/40 p-3 flex items-center justify-center">
                          <Image
                            src={newLogoImage}
                            alt="Logo Preview"
                            width={100}
                            height={60}
                            unoptimized
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <p className="text-xs font-bold text-[#FF8B2C]">
                          تم اختيار اللوجو بنجاح (انقر لتغيير الصورة)
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-[#FF8B2C]">
                          <Upload className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-bold text-white mb-1">
                            انقر لرفع اللوجو مباشرة من جهازك
                          </p>
                          <p className="text-xs text-zinc-500">
                            صيغ مدعومة: PNG, SVG, JPG, WebP بخلفية شفافة
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Direct Image URL input as alternative */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">
                    أو إدخال رابط صورة اللوجو مباشرة (اختياري):
                  </label>
                  <input
                    type="text"
                    value={newLogoImage}
                    onChange={(e) => setNewLogoImage(e.target.value)}
                    placeholder="https://... أو /hero-icons/meta.png"
                    className="w-full px-4 py-3 rounded-2xl bg-[#08080c] border border-white/15 focus:border-[#FF8B2C] text-white text-xs font-mono outline-none transition-all placeholder:text-zinc-600"
                    dir="ltr"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isLogoSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF8B2C] hover:bg-[#FFA857] text-[#060608] font-black text-sm shadow-[0_4px_25px_rgba(255,139,44,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>{isLogoSubmitting ? "جاري الحفظ..." : "حفظ ونشر اللوجو في الشريط"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Client Logos Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#FF8B2C]" />
                  <span>اللوجوهات المعروضة حالياً في الشريط المتحرك</span>
                </h3>
                <span className="text-xs text-zinc-400 font-bold">({logos.length} لوجو)</span>
              </div>

              {logos.length === 0 ? (
                <div className="text-center py-16 rounded-3xl bg-[#0b0b12] border border-white/10 text-zinc-400">
                  لا توجد لوجوهات مضافة حالياً.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                  {logos.map((logo, idx) => (
                    <div
                      key={logo.id}
                      className="group rounded-2xl bg-[#0e0e16] border border-white/10 hover:border-[#FF8B2C]/50 p-3.5 transition-all duration-300 flex flex-col items-center justify-between gap-3 text-center hover:shadow-[0_8px_25px_rgba(0,0,0,0.7)]"
                    >
                      {/* Logo Preview box */}
                      <div className="w-full h-20 bg-[#060608] rounded-xl border border-white/5 flex items-center justify-center p-2 relative overflow-hidden">
                        <Image
                          src={logo.image}
                          alt="Client Logo"
                          width={80}
                          height={46}
                          unoptimized
                          className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-white/10 text-[9px] font-bold text-zinc-400">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => setDeleteLogoConfirmId(logo.id)}
                        className="w-full py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border border-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* SECTION 2: PORTFOLIO PROJECTS MANAGEMENT */}
        {adminSection === "portfolio" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Category Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.slug;
                const count = (data[tab.slug] !== undefined ? data[tab.slug] : (PORTFOLIO_DATA[tab.slug]?.galleryProjects || [])).length;

                return (
                  <button
                    key={tab.slug}
                    onClick={() => setActiveTab(tab.slug)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between text-right cursor-pointer ${
                      isActive
                        ? "bg-[#12121c] border-[#FF8B2C] shadow-[0_8px_30px_rgba(255,139,44,0.25)] scale-[1.02]"
                        : "bg-[#0b0b12] border-white/10 hover:border-white/20 hover:bg-[#0f0f18]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive ? "bg-[#FF8B2C] text-[#060608]" : "bg-white/5 text-zinc-400"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-xs sm:text-sm font-black ${isActive ? "text-[#FF8B2C]" : "text-white"}`}>
                          {tab.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5 font-medium">
                          {count} أعمال
                        </p>
                      </div>
                    </div>

                    <span className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-[#FF8B2C] shadow-[0_0_10px_#FF8B2C]" : "bg-zinc-700"}`} />
                  </button>
                );
              })}
            </div>

            {/* Tab Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c14] border border-[#FF8B2C]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#FF8B2C] block mb-1">
                  {activeCategoryMeta?.departmentNumber} • {activeCategoryMeta?.categoryName}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  قائمة الأعمال المعروضة في قسم: {activeCategoryMeta?.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  {activeTab === "media-buying" && "معرض الميديا باينج: صورة وعنوان فقط."}
                  {activeTab === "social-designs" && "معرض تصاميم السوشيال ميديا: صورة وعنوان فقط."}
                  {activeTab === "motion-video" && "معرض الموشن جرافيك: صورة غلاف + عنوان + رابط فيديو يوتيوب."}
                  {activeTab === "ecommerce-scaling" && "معرض نمو وتوسيع المتاجر: صورة غلاف المتجر + عنوان المتجر + رابط المتجر (يظهر زر زيارة المتجر مباشرة)."}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs font-bold text-amber-400/90">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>انقر على زر النجمة (⭐) لتمييز العمل ليظهر في كروسيل 3D بالصفحة الرئيسية مباشرة.</span>
                </div>
              </div>

              <Link
                href={`/admin/add?category=${activeTab}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FF8B2C] hover:bg-[#FFA857] text-[#060608] font-black text-xs sm:text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة عمل لهذا القسم</span>
              </Link>
            </div>

            {/* Gallery Items Grid */}
            {currentProjects.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-[#0b0b12] border border-white/10">
                <p className="text-base font-bold text-zinc-400 mb-4">لا توجد أعمال مضافة في هذا القسم حالياً.</p>
                <Link
                  href={`/admin/add?category=${activeTab}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF8B2C] text-[#060608] font-black text-sm"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>إضافة أول عمل الآن</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
                {currentProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className={`group rounded-3xl bg-[#0e0e16] border overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between ${
                      project.isFeaturedInCoverflow
                        ? "border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                        : "border-white/10 hover:border-[#FF8B2C]/60"
                    }`}
                  >
                    <div>
                      {/* Image Preview Banner */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#161622] border-b border-white/10">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          unoptimized={project.image.startsWith("data:")}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Indicators */}
                        <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-full bg-[#060608]/80 backdrop-blur-md text-[11px] font-bold text-[#FF8B2C] border border-[#FF8B2C]/30">
                            #{idx + 1}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {project.isFeaturedInCoverflow && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-[#060608] text-[10px] font-black flex items-center gap-1 shadow-lg animate-pulse">
                                <Star className="w-3 h-3 fill-current" />
                                <span>كروسيل الرئيسية</span>
                              </span>
                            )}
                            {project.videoUrl && (
                              <span className="px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                                <Play className="w-3 h-3 fill-current" />
                                <span>فيديو</span>
                              </span>
                            )}
                            {project.storeUrl && (
                              <span className="px-2.5 py-1 rounded-full bg-blue-500/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                                <Globe className="w-3 h-3" />
                                <span>متجر</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Title & Details */}
                      <div className="p-5">
                        <h3 className="text-base font-black text-white line-clamp-2 mb-2 leading-relaxed">
                          {project.storeName || project.title}
                        </h3>

                        {/* Growth Metrics Pills */}
                        {(project.salesGrowth || project.conversionRate || project.ordersCount) && (
                          <div className="flex items-center gap-1.5 flex-wrap mb-3">
                            {project.salesGrowth && (
                              <span className="px-2 py-0.5 rounded-md bg-[#FF8B2C]/15 border border-[#FF8B2C]/30 text-[#FF8B2C] font-black text-[10px]">
                                {project.salesGrowth}
                              </span>
                            )}
                            {project.conversionRate && (
                              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white font-bold text-[10px]">
                                {project.conversionRate}
                              </span>
                            )}
                            {project.ordersCount && (
                              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-bold text-[10px]">
                                {project.ordersCount}
                              </span>
                            )}
                          </div>
                        )}

                        {project.videoUrl && (
                          <p className="text-xs text-zinc-400 truncate flex items-center gap-1.5 mb-1.5">
                            <Film className="w-3.5 h-3.5 text-[#FF8B2C]" />
                            <span className="truncate">{project.videoUrl}</span>
                          </p>
                        )}

                        {project.storeUrl && (
                          <p className="text-xs text-zinc-400 truncate flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#FF8B2C]" />
                            <span className="truncate">{project.storeUrl}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-3.5 pt-3 border-t border-white/10 flex flex-col gap-2.5 bg-[#0a0a10]">
                      
                      {/* 1-Click Toggle for Homepage Coverflow */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(project.id, project.isFeaturedInCoverflow)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          project.isFeaturedInCoverflow
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500 hover:text-[#060608]"
                            : "bg-white/5 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 border border-white/10"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${project.isFeaturedInCoverflow ? "fill-amber-400" : ""}`} />
                        <span>{project.isFeaturedInCoverflow ? "معروض بكروسيل الرئيسية ⭐" : "إظهار في كروسيل الرئيسية"}</span>
                      </button>

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                        <span className="text-[11px] text-zinc-500 font-medium">خيارات العمل</span>
                        
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/add?edit=${project.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#FF8B2C] text-zinc-300 hover:text-[#060608] text-xs font-bold transition-all cursor-pointer border border-white/10"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </Link>

                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold transition-all cursor-pointer border border-red-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Delete Project Confirmation Modal */}
      {deleteConfirmId && (
        <div 
          onClick={() => setDeleteConfirmId(null)}
          className="fixed inset-0 z-[100000] bg-[#060608]/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-[#12121c] border border-red-500/40 p-6 sm:p-8 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-black text-white mb-2">تأكيد حذف العمل</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6">
              هل أنت متأكد من رغبتك في حذف هذا العمل نهائياً من المعرض؟
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
              >
                تراجع
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-xs transition-all cursor-pointer shadow-lg"
              >
                نعم، احذف العمل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Client Logo Confirmation Modal */}
      {deleteLogoConfirmId && (
        <div 
          onClick={() => setDeleteLogoConfirmId(null)}
          className="fixed inset-0 z-[100000] bg-[#060608]/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-[#12121c] border border-red-500/40 p-6 sm:p-8 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-black text-white mb-2">تأكيد حذف اللوجو</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6">
              هل أنت متأكد من رغبتك في حذف هذا اللوجو نهائياً من شريط العملاء؟
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteLogoConfirmId(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
              >
                تراجع
              </button>
              <button
                onClick={() => handleDeleteLogo(deleteLogoConfirmId)}
                className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-xs transition-all cursor-pointer shadow-lg"
              >
                نعم، احذف اللوجو
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}


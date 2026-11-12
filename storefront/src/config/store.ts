// Central store configuration (single source of truth)

/** WhatsApp number that receives orders, in international format without "+" (Egypt: 20 + 1023160657) */
export const STORE_WHATSAPP_NUMBER = "201023160657";

/** Human-readable local format shown in the UI */
export const STORE_WHATSAPP_DISPLAY = "01023160657";

export const STORE_NAME = "إبراهيم علي سليم";

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: "الدفع عند الاستلام",
  instapay: "InstaPay",
  vodafone: "فودافون كاش",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${STORE_WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export interface ContactSettings {
  whatsapp: string;          // e.g. "201023160657"
  whatsappDisplay: string;   // e.g. "01023160657"
  phone: string;             // e.g. "01023160657"
  facebook: string;          // e.g. "https://facebook.com/..."
  instagram: string;         // e.g. "https://instagram.com/..."
  tiktok: string;            // e.g. "https://tiktok.com/@..."
  telegram: string;          // e.g. "https://t.me/..."
  linkedin?: string;         // e.g. "https://linkedin.com/in/..."
  email: string;             // e.g. "contact@ibrahimslim.online"
  defaultMessage?: string;
}

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  whatsapp: "201023160657",
  whatsappDisplay: "01023160657",
  phone: "01023160657",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  telegram: "https://t.me",
  linkedin: "https://linkedin.com",
  email: "contact@ibrahimslim.online",
  defaultMessage: "مرحباً إبراهيم، أود الاستفسار عن خدماتك وبدء العمل معك.",
};



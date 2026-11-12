export interface ClientLogo {
  id: string;
  name?: string;
  image: string; // url or data:image base64
  createdAt?: number;
}

export const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  { id: "logo-1", name: "Meta Ads", image: "/hero-icons/meta.png" },
  { id: "logo-2", name: "Google Ads", image: "/hero-icons/google-ads.png" },
  { id: "logo-3", name: "TikTok for Business", image: "/hero-icons/tiktok.png" },
  { id: "logo-4", name: "Adobe Systems", image: "/certificates/adobe.png" },
  { id: "logo-5", name: "HubSpot", image: "/certificates/hubspot.png" },
  { id: "logo-6", name: "Udacity", image: "/certificates/udacity.png" },
  { id: "logo-7", name: "Digital Egypt", image: "/certificates/digital-egypt.png" },
  { id: "logo-8", name: "Instagram Business", image: "/hero-icons/instagram.png" },
  { id: "logo-9", name: "Facebook", image: "/hero-icons/facebook.png" },
  { id: "logo-10", name: "Adobe Photoshop", image: "/hero-icons/photoshop.png" },
  { id: "logo-11", name: "Adobe Illustrator", image: "/hero-icons/illustrator.png" },
  { id: "logo-12", name: "Adobe Premiere Pro", image: "/hero-icons/premiere-pro.png" },
];

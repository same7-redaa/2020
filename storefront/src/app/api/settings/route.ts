import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { DEFAULT_CONTACT_SETTINGS, ContactSettings } from "@/types/contactSettings";
import { verifyAdminSession } from "@/lib/auth";

const DB_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DB_DIR, "settings-db.json");

async function readSettingsDB(): Promise<ContactSettings> {
  try {
    await mkdir(DB_DIR, { recursive: true });
    const content = await readFile(SETTINGS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    const initial = DEFAULT_CONTACT_SETTINGS;
    try {
      await writeFile(SETTINGS_FILE, JSON.stringify(initial, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to initialize settings DB:", e);
    }
    return initial;
  }
}

async function writeSettingsDB(settings: ContactSettings): Promise<void> {
  await mkdir(DB_DIR, { recursive: true });
  await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}

export async function GET() {
  try {
    const settings = await readSettingsDB();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error reading settings DB:", error);
    return NextResponse.json({ success: false, data: DEFAULT_CONTACT_SETTINGS }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Enforce Admin Authentication
    const isAuth = await verifyAdminSession(req);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "غير مصرح لك بتعديل بيانات التواصل (جلسة غير مسجلة)" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const current = await readSettingsDB();
    
    // Sanitize values
    const updated: ContactSettings = {
      whatsapp: body.whatsapp ? String(body.whatsapp).replace(/[^0-9]/g, "").substring(0, 30) : current.whatsapp,
      whatsappDisplay: body.whatsappDisplay ? String(body.whatsappDisplay).substring(0, 50) : current.whatsappDisplay,
      phone: body.phone ? String(body.phone).substring(0, 50) : current.phone,
      facebook: body.facebook ? String(body.facebook).substring(0, 500) : current.facebook,
      instagram: body.instagram ? String(body.instagram).substring(0, 500) : current.instagram,
      tiktok: body.tiktok ? String(body.tiktok).substring(0, 500) : current.tiktok,
      telegram: body.telegram ? String(body.telegram).substring(0, 500) : current.telegram,
      linkedin: body.linkedin ? String(body.linkedin).substring(0, 500) : current.linkedin,
      email: body.email ? String(body.email).substring(0, 150) : current.email,
      defaultMessage: body.defaultMessage ? String(body.defaultMessage).substring(0, 500) : current.defaultMessage,
    };

    await writeSettingsDB(updated);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error saving settings DB:", error);
    return NextResponse.json({ success: false, message: "فشل حفظ إعدادات التواصل" }, { status: 500 });
  }
}

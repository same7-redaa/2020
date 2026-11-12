import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { DEFAULT_CLIENT_LOGOS, ClientLogo } from "@/data/clientLogosData";
import { verifyAdminSession } from "@/lib/auth";

const DB_DIR = path.join(process.cwd(), "data");
const LOGOS_FILE = path.join(DB_DIR, "logos-db.json");

async function readLogosDB(): Promise<ClientLogo[]> {
  try {
    await mkdir(DB_DIR, { recursive: true });
    const content = await readFile(LOGOS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    const initial = DEFAULT_CLIENT_LOGOS;
    try {
      await writeFile(LOGOS_FILE, JSON.stringify(initial, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to initialize logos DB:", e);
    }
    return initial;
  }
}

async function writeLogosDB(logos: ClientLogo[]): Promise<void> {
  await mkdir(DB_DIR, { recursive: true });
  await writeFile(LOGOS_FILE, JSON.stringify(logos, null, 2), "utf-8");
}

export async function GET() {
  try {
    const logos = await readLogosDB();
    return NextResponse.json({ success: true, data: logos });
  } catch (error) {
    console.error("Error reading logos DB:", error);
    return NextResponse.json({ success: false, data: DEFAULT_CLIENT_LOGOS }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Enforce Admin Authentication
    const isAuth = await verifyAdminSession(req);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "غير مصرح لك بإضافة لوجوهات (جلسة غير مسجلة)" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { image, name } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json({ success: false, message: "صورة اللوجو مطلوبة" }, { status: 400 });
    }

    const currentLogos = await readLogosDB();
    const newLogo: ClientLogo = {
      id: `logo-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: name ? String(name).substring(0, 100) : "Client Logo",
      image: String(image).substring(0, 1000),
    };

    const updated = [newLogo, ...currentLogos];
    await writeLogosDB(updated);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error adding logo:", error);
    return NextResponse.json({ success: false, message: "فشل حفظ اللوجو" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Enforce Admin Authentication
    const isAuth = await verifyAdminSession(req);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "غير مصرح لك بحذف لوجوهات (جلسة غير مسجلة)" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const logoId = searchParams.get("id");

    if (!logoId) {
      return NextResponse.json({ success: false, message: "معرف اللوجو مطلوب" }, { status: 400 });
    }

    const currentLogos = await readLogosDB();
    const updated = currentLogos.filter((l) => l.id !== logoId);
    await writeLogosDB(updated);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error deleting logo:", error);
    return NextResponse.json({ success: false, message: "فشل حذف اللوجو" }, { status: 500 });
  }
}

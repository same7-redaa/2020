import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { PORTFOLIO_DATA, GalleryProject } from "@/data/portfolioData";
import { verifyAdminSession } from "@/lib/auth";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "portfolio-db.json");

const VALID_CATEGORIES = new Set([
  "media-buying",
  "motion-video",
  "social-designs",
  "ecommerce-scaling",
]);

function getInitialData(): Record<string, GalleryProject[]> {
  const initial: Record<string, GalleryProject[]> = {};
  Object.keys(PORTFOLIO_DATA).forEach((key) => {
    initial[key] = PORTFOLIO_DATA[key].galleryProjects || [];
  });
  return initial;
}

async function readDB(): Promise<Record<string, GalleryProject[]>> {
  try {
    await mkdir(DB_DIR, { recursive: true });
    const content = await readFile(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    const initial = getInitialData();
    try {
      await writeFile(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to initialize portfolio DB:", e);
    }
    return initial;
  }
}

async function writeDB(data: Record<string, GalleryProject[]>): Promise<void> {
  await mkdir(DB_DIR, { recursive: true });
  await writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db });
  } catch (error) {
    console.error("Error reading portfolio DB:", error);
    return NextResponse.json({ success: false, data: getInitialData() }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce Admin Authentication
    const isAuth = await verifyAdminSession(req);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "غير مصرح لك بتعديل بيانات المعرض (جلسة غير مسجلة)" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "بيانات الطلب غير صالحة" }, { status: 400 });
    }

    const { categorySlug, project } = body;

    if (!categorySlug || typeof categorySlug !== "string" || !VALID_CATEGORIES.has(categorySlug)) {
      return NextResponse.json({ success: false, message: "قسم المعرض غير صالح" }, { status: 400 });
    }

    if (!project || typeof project !== "object" || !project.image || !project.title) {
      return NextResponse.json({ success: false, message: "بيانات العمل (العنوان والصورة) مطلوبة" }, { status: 400 });
    }

    const sanitizedProject: GalleryProject = {
      id: typeof project.id === "string" && project.id.length < 100 
        ? project.id 
        : `custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: String(project.title).substring(0, 300),
      category: PORTFOLIO_DATA[categorySlug]?.categoryName || categorySlug,
      image: String(project.image).substring(0, 1000),
      storeName: project.storeName ? String(project.storeName).substring(0, 150) : undefined,
      storeUrl: project.storeUrl ? String(project.storeUrl).substring(0, 500) : undefined,
      videoUrl: project.videoUrl ? String(project.videoUrl).substring(0, 500) : undefined,
      salesGrowth: project.salesGrowth ? String(project.salesGrowth).substring(0, 50) : undefined,
      conversionRate: project.conversionRate ? String(project.conversionRate).substring(0, 50) : undefined,
      ordersCount: project.ordersCount ? String(project.ordersCount).substring(0, 50) : undefined,
      isFeaturedInCoverflow: Boolean(project.isFeaturedInCoverflow),
    };

    const db = await readDB();
    const currentList = db[categorySlug] || [];

    // If updating existing project
    if (project.id && currentList.some((p) => p.id === project.id)) {
      db[categorySlug] = currentList.map((p) => (p.id === project.id ? { ...p, ...sanitizedProject } : p));
    } else {
      db[categorySlug] = [sanitizedProject, ...currentList];
    }

    await writeDB(db);

    return NextResponse.json({ success: true, data: db });
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ success: false, message: "فشل حفظ المشروع" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // 1. Enforce Admin Authentication
    const isAuth = await verifyAdminSession(req);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "غير مصرح لك بحذف أعمال (جلسة غير مسجلة)" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const projectId = searchParams.get("id");

    if (!categorySlug || !projectId) {
      return NextResponse.json({ success: false, message: "بيانات غير مكتملة" }, { status: 400 });
    }

    const db = await readDB();
    const currentList = db[categorySlug] || [];
    db[categorySlug] = currentList.filter((p) => p.id !== projectId);

    await writeDB(db);

    return NextResponse.json({ success: true, data: db });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ success: false, message: "فشل حذف المشروع" }, { status: 500 });
  }
}

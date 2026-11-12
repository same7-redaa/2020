import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { verifyAdminSession } from "@/lib/auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Megabytes max

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".gif"
]);

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif"
]);

/**
 * Validates binary image signatures (Magic Bytes) to ensure genuine images
 */
function isValidImageSignature(buffer: Buffer, ext: string): boolean {
  if (buffer.length < 4) return false;

  // JPEG magic bytes: FF D8 FF
  if (ext === ".jpg" || ext === ".jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG magic bytes: 89 50 4E 47
  if (ext === ".png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  // GIF magic bytes: 47 49 46 38
  if (ext === ".gif") {
    return (
      buffer[0] === 0x47 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x38
    );
  }

  // WebP magic bytes: 'RIFF' .... 'WEBP'
  if (ext === ".webp") {
    const isRiff = buffer.subarray(0, 4).toString("ascii") === "RIFF";
    const isWebp = buffer.subarray(8, 12).toString("ascii") === "WEBP";
    return isRiff && isWebp;
  }

  // SVG: textual XML check (ensure no embedded executable scripts)
  if (ext === ".svg") {
    const text = buffer.toString("utf-8", 0, Math.min(buffer.length, 2000)).toLowerCase();
    // Block malicious embedded script tags or onclick events
    if (text.includes("<script") || text.includes("javascript:") || text.includes("onload=") || text.includes("onerror=")) {
      return false;
    }
    return text.includes("<svg") || text.includes("<?xml");
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce Admin Authentication
    const isAuth = await verifyAdminSession(req);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "غير مصرح لك برفع ملفات (جلسة غير مسجلة)" },
        { status: 401 }
      );
    }

    // 2. Extract and Validate Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "لم يتم اختيار ملف صالح للرفع" },
        { status: 400 }
      );
    }

    // 3. File Size Validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "حجم الملف كبير جداً (الحد الأقصى المسموح به 10 ميجابايت)" },
        { status: 400 }
      );
    }

    // 4. File Extension & MIME Type Whitelist
    const rawExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(rawExt)) {
      return NextResponse.json(
        { success: false, message: `صيغة الملف (${rawExt}) غير مدعومة. الصيغ المسموحة: JPG, PNG, WebP, SVG, GIF` },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: "نوع ملف الصورة غير صالح ومرفوض أمنياً" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Magic Bytes / Header Validation
    if (!isValidImageSignature(buffer, rawExt)) {
      return NextResponse.json(
        { success: false, message: "محتوى الملف غير صالح أو تم التلاعب به، تم رفض الملف لدواعي الأمان." },
        { status: 400 }
      );
    }

    // 6. Secure Uploads Directory & Randomized Filename
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const randomSuffix = crypto.randomBytes(8).toString("hex");
    const timestamp = Date.now();
    const rawBase = path.basename(file.name, rawExt).replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 30);
    const safeBase = rawBase || "img";
    const secureFilename = `${timestamp}_${safeBase}_${randomSuffix}${rawExt}`;
    const targetFilePath = path.join(uploadsDir, secureFilename);

    await writeFile(targetFilePath, buffer);

    const publicUrl = `/uploads/${secureFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: secureFilename,
    });
  } catch (error) {
    console.error("Secure upload error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة وحفظ الصورة" },
      { status: 500 }
    );
  }
}

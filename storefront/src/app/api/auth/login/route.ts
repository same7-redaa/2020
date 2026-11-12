import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { 
  ADMIN_PASSWORD, 
  AUTH_COOKIE_NAME, 
  AUTH_TOKEN_SECRET, 
  safeCompare,
  verifyAdminSession 
} from "@/lib/auth";

// In-memory rate limiting map: IP -> { attempts: number, lockUntil: number }
interface RateLimitInfo {
  attempts: number;
  lockUntil: number;
}
const rateLimitMap = new Map<string, RateLimitInfo>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();
    const rateInfo = rateLimitMap.get(ip) || { attempts: 0, lockUntil: 0 };

    // Check if IP is currently locked out
    if (rateInfo.lockUntil > now) {
      const remainingMinutes = Math.ceil((rateInfo.lockUntil - now) / 60000);
      return NextResponse.json(
        { 
          success: false, 
          message: `تم حظر المحاولات مؤقتاً لكثرة الأخطاء. يرجى المحاولة بعد ${remainingMinutes} دقيقة.` 
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { password } = body;

    // Validate password input presence
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "يرجى كتابة كلمة المرور" },
        { status: 400 }
      );
    }

    // Timing-safe password verification
    const isValid = safeCompare(password.trim(), ADMIN_PASSWORD);

    if (!isValid) {
      rateInfo.attempts += 1;
      if (rateInfo.attempts >= MAX_FAILED_ATTEMPTS) {
        rateInfo.lockUntil = now + LOCKOUT_DURATION_MS;
        rateLimitMap.set(ip, rateInfo);
        return NextResponse.json(
          { 
            success: false, 
            message: `تم تجاوز الحد الأقصى للمحاولات الخاطئة (5 محاولات). تم حظر المحاولات لمدة 15 دقيقة لدواعي الأمان.` 
          },
          { status: 429 }
        );
      }
      rateLimitMap.set(ip, rateInfo);
      const remaining = MAX_FAILED_ATTEMPTS - rateInfo.attempts;
      return NextResponse.json(
        { 
          success: false, 
          message: `كلمة المرور غير صحيحة. متبقي لديك ${remaining} محاولات.` 
        },
        { status: 401 }
      );
    }

    // On successful login, reset failed attempts
    rateLimitMap.delete(ip);

    // Set Secure HttpOnly Session Cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, AUTH_TOKEN_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      token: AUTH_TOKEN_SECRET,
    });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const isAuth = await verifyAdminSession(req);
  if (isAuth) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "تم تسجيل الخروج بنجاح" });
}

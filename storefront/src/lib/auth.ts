import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const AUTH_COOKIE_NAME = "ibrahim_admin_session";
// Set AUTH_TOKEN_SECRET and ADMIN_PASSWORD in .env (see .env.example). Without them a random
// value is used, so nobody can log in and no old session cookie is accepted.
export const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || crypto.randomBytes(32).toString("hex");
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || crypto.randomBytes(32).toString("hex");

/**
 * Constant-time safe string comparison to prevent timing attacks
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Verifies if the incoming request is from an authenticated admin session.
 * Checks HTTP-only cookie first, then Authorization Bearer header.
 */
export async function verifyAdminSession(req?: NextRequest): Promise<boolean> {
  try {
    // 1. Check Cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
    if (sessionCookie && safeCompare(sessionCookie.value, AUTH_TOKEN_SECRET)) {
      return true;
    }

    // 2. Check Authorization Header if request object is provided
    if (req) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7).trim();
        if (safeCompare(token, AUTH_TOKEN_SECRET)) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Auth verification error:", error);
    return false;
  }
}

// app/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/auth", "/api", "/customer"]; // Path ที่ไม่ต้องการการตรวจสอบ

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log("middleware hit:", pathname);
  // เช็คว่า path ปัจจุบันอยู่ใน list ของ PUBLIC_PATHS หรือไม่
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ตรวจสอบ token ใน cookies
  const token = await req.cookies.get("token")?.value;
  // ถ้าไม่มี token ให้ redirect ไปหน้า login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "secret-key"
    );

    // ตรวจสอบความถูกต้องของ token
    await jwtVerify(token, secret);

    return NextResponse.next(); // ถ้า token ถูกต้อง ให้ไปต่อ
  } catch (err) {
    console.log("Error:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url)); // ถ้า token ไม่ถูกต้อง ให้ redirect ไปหน้า login
  }
}

// กำหนด path ที่ต้องการให้ middleware ตรวจสอบ
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin/:path*", "/menu/:path*"],
};

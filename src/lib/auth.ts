// lib/auth.ts

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key"; // Secret key สำหรับ JWT

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก token
export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  try {
    // ตรวจสอบ JWT โดยใช้ jose
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
}

// ฟังก์ชันสำหรับสร้าง JWT
export async function createJWT(userId: string) {
  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" }) // ใช้ HMAC SHA256
    .setIssuedAt()
    .setExpirationTime("1h") // ตั้งเวลา expiration
    .sign(new TextEncoder().encode(JWT_SECRET));

  return jwt;
}

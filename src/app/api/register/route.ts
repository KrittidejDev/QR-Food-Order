import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // สมมติว่าคุณใช้ Prisma
import bcrypt from "bcryptjs"; // นำเข้า bcryptjs

// สร้าง schema สำหรับการตรวจสอบข้อมูลที่รับมาจากฟอร์ม
const registerSchema = z
  .object({
    email: z.string().email(), // ตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
    password: z.string().min(8, "Password must be at least 8 characters long"), // ตรวจสอบ password ความยาว
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"), // ตรวจสอบ confirmPassword ความยาว
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // ถ้าผิดจะบอกข้อผิดพลาดที่ confirmPassword
  });

export async function POST(req: Request) {
  const data = await req.json();
  // ตรวจสอบข้อมูลด้วย schema
  try {
    const parsedData = registerSchema.parse(data); // ถ้าผิดจะมีข้อผิดพลาด

    // ตรวจสอบว่าอีเมลนี้มีผู้ใช้งานอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }

    // เข้ารหัสรหัสผ่านก่อนที่จะบันทึก
    const hashedPassword = await bcrypt.hash(parsedData.password, 10); // 10 คือค่า saltRounds

    // ถ้าไม่มีผู้ใช้งานในระบบให้ทำการสร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        email: parsedData.email,
        password: hashedPassword, // ใช้รหัสผ่านที่เข้ารหัสแล้ว
      },
    });

    return NextResponse.json(
      { message: "Registration successful", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // ถ้ามีข้อผิดพลาดจาก schema
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    // หากมีข้อผิดพลาดอื่นๆ
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

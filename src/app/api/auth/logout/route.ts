// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "No token found. Already logged out or not logged in." },
      { status: 400 }
    );
  }

  cookieStore.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // ลบ cookie
  });

  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}

// app/api/restaurants/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // เชื่อมต่อกับ Prisma

export async function POST(req: Request) {
  const { name, address, ownerId, phone } = await req.json();

  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        phone,
        ownerId, // ใช้ userId ของเจ้าของร้าน
      },
    });

    return NextResponse.json({ restaurant: newRestaurant }, { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const ownerId = searchParams.get("ownerId");

  if (!ownerId) {
    return NextResponse.json({ error: "ownerId is required" }, { status: 400 });
  }

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        ownerId,
      },
    });

    return NextResponse.json({ restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

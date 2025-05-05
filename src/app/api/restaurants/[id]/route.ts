// app/api/restaurants/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const id = url.pathname.split("/").pop(); // ดึง id จาก URL

  if (!id) {
    return NextResponse.json(
      { error: "Restaurant ID is required" },
      { status: 400 }
    );
  }

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        owner: true,
        tables: true,
        menuItems: true,
        orders: true,
      },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const restaurantItem = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurantItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    // if (menuItem.image) {
    //   const hash = extractIpfsHash(menuItem.image);
    //   if (hash) {
    //     await deleteFileFromPinata(hash);
    //   }
    // }

    await prisma.restaurant.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}

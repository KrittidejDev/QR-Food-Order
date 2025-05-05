import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, price, category, image, active, userId } = await req.json();

  console.log("DATAAA", name, price, category, image, active, userId);

  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        price,
        category,
        image,
        active,
        restaurantId: userId, // เปลี่ยนเป็น userId
      },
    });

    return NextResponse.json({ menu: newMenuItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json(
      { error: "Missing restaurantId" },
      { status: 400 }
    );
  }

  try {
    const menus = await prisma.menuItem.findMany({
      where: {
        restaurantId: restaurantId,
      },
    });

    return NextResponse.json({ menus });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return NextResponse.json(
      { error: "Failed to fetch menus" },
      { status: 500 }
    );
  }
}

// ฟังก์ชันแยก IPFS hash จาก URL
export function extractIpfsHash(url: string): string | null {
  const match = url.match(/ipfs\/([^/]+)/);
  return match ? match[1] : null;
}

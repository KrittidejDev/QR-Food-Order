import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODYYY", body);

    const newOrder = await prisma.order.create({
      data: {
        restaurantId: body.restaurantId,
        tableId: body.tableId,
        items: {
          create: body.items.map((item: any) => ({
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(newOrder, { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

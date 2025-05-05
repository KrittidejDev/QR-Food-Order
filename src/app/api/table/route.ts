import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const { name, restaurantId } = await req.json();

  if (!restaurantId || !name) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    // สร้าง table ก่อน
    const table = await prisma.table.create({
      data: {
        name,
        restaurantId,
        qr_code_link: "", // ชั่วคราว
      },
    });

    const qrUrl = `${process.env.BASE_URL}/customer/${restaurantId}/${table.id}`;

    const qrImage = await QRCode.toDataURL(qrUrl);

    // อัปเดต qr_code_link
    const updatedTable = await prisma.table.update({
      where: { id: table.id },
      data: {
        qr_code_link: qrImage,
      },
    });

    return NextResponse.json(updatedTable);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json(
      { error: "restaurantId is required" },
      { status: 400 }
    );
  }

  const tables = await prisma.table.findMany({
    where: {
      restaurantId,
    },
  });

  return NextResponse.json(tables);
}

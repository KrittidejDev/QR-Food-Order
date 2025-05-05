import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { extractIpfsHash } from "../route"; // ✅ ใช้จาก route เดิม หรือย้าย helper ไป lib
import { deleteFileFromPinata } from "@/lib/pinata";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    if (menuItem.image) {
      const hash = extractIpfsHash(menuItem.image);
      if (hash) {
        await deleteFileFromPinata(hash);
      }
    }

    await prisma.menuItem.delete({
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

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { name, price, category, image, active } = await req.json();
  const id = context.params.id;
  console.log("received values in PATCH:", {
    name,
    price,
    category,
    image,
    active,
  });

  try {
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        price,
        category,
        image,
        active,
      },
    });

    return NextResponse.json({ menu: updatedMenuItem }, { status: 200 });
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

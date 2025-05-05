import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    await prisma.table.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Table deleted" });
  } catch {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { name } = await req.json();
  const updated = await prisma.table.update({
    where: { id: id },
    data: { name },
  });

  return NextResponse.json(updated);
}

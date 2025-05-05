import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

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
  { params }: { params: { id: string } }
) {
  const { name } = await req.json();
  const updated = await prisma.table.update({
    where: { id: params.id },
    data: { name },
  });

  return NextResponse.json(updated);
}

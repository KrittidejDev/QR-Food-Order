import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const orders = await prisma.order.findMany();
  return Response.json(orders);
}

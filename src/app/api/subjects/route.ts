import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const subjects = await prisma.subject.findMany();
  return NextResponse.json(subjects);
}

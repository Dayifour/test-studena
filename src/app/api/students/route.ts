import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const students = await prisma.student.findMany({
    include: {
      subjects: true,
      levels: true,
      availabilities: true,
    },
  });
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const data = await request.json();
  // TODO: Validation des données
  const student = await prisma.student.create({
    data: {
      fullName: data.fullName,
      subjects: {
        connect: data.subjectIds.map((id: number) => ({ id })),
      },
      levels: {
        connect: data.levelIds.map((id: number) => ({ id })),
      },
      availabilities: {
        create: data.availabilities,
      },
    },
    include: {
      subjects: true,
      levels: true,
      availabilities: true,
    },
  });
  return NextResponse.json(student);
}

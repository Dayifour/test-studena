import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const tutors = await prisma.tutor.findMany({
    include: {
      subjects: true,
      levels: true,
      availabilities: true,
    },
  });
  return NextResponse.json(tutors);
}

export async function POST(request: Request) {
  const data = await request.json();
  // Validation des données pour les disponibilités, matières et niveaux
  const availabilities = Array.isArray(data.availabilities)
    ? data.availabilities.filter(
        (a: { day?: string; startTime?: string; endTime?: string }) =>
          typeof a.day === "string" &&
          typeof a.startTime === "string" &&
          typeof a.endTime === "string"
      )
    : [];
  const subjectIds = Array.isArray(data.subjectIds) ? data.subjectIds : [];
  const levelIds = Array.isArray(data.levelIds) ? data.levelIds : [];
  if (
    !data.fullName ||
    subjectIds.length === 0 ||
    levelIds.length === 0 ||
    availabilities.length === 0
  ) {
    return NextResponse.json(
      {
        error:
          "Tous les champs sont obligatoires (nom, matières, niveaux, disponibilités)",
      },
      { status: 400 }
    );
  }
  // Création du tuteur avec plusieurs matières, niveaux et disponibilités
  const tutor = await prisma.tutor.create({
    data: {
      fullName: data.fullName,
      subjects: {
        connect: subjectIds.map((id: number) => ({ id })),
      },
      levels: {
        connect: levelIds.map((id: number) => ({ id })),
      },
      availabilities: {
        create: availabilities,
      },
    },
    include: {
      subjects: true,
      levels: true,
      availabilities: true,
    },
  });
  return NextResponse.json(tutor);
}

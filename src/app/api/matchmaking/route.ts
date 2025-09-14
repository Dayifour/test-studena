import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function checkAvailability(studentSlots: { id: number; day: string; startTime: string; endTime: string; tutorId: number | null; studentId: number | null; }[], tutorSlots: { id: number; day: string; startTime: string; endTime: string; tutorId: number | null; studentId: number | null; }[]) {
  // Renvoie le nombre de créneaux communs
  let perfect = 0;
  let partial = 0;
  for (const s of studentSlots) {
    for (const t of tutorSlots) {
      if (s.day === t.day) {
        if (s.startTime === t.startTime && s.endTime === t.endTime) {
          perfect++;
        } else {
          // Vérifie chevauchement partiel
          if (s.startTime < t.endTime && s.endTime > t.startTime) {
            partial++;
          }
        }
      }
    }
  }
  return { perfect, partial };
}

function computeScore({
  subjectMatch,
  levelMatch,
  perfect,
  partial,
}: {
  subjectMatch: boolean;
  levelMatch: boolean;
  perfect: number;
  partial: number;
}) {
  // Pondération simple : matière (40%), niveau (20%), dispo parfaite (30%), dispo partielle (10%)
  let score = 0;
  if (subjectMatch) score += 40;
  if (levelMatch) score += 20;
  score += Math.min(perfect * 30, 30);
  score += Math.min(partial * 10, 10);
  return score;
}

export async function POST(request: Request) {
  const data = await request.json();
  const student = await prisma.student.findUnique({
    where: { id: data.studentId },
    include: {
      subjects: true,
      levels: true,
      availabilities: true,
    },
  });
  if (!student)
    return NextResponse.json({ error: "Élève introuvable" }, { status: 404 });

  const tutors = await prisma.tutor.findMany({
    include: {
      subjects: true,
      levels: true,
      availabilities: true,
    },
  });

  const matches = tutors
    .map((tutor) => {
      const subjectMatch = tutor.subjects.some((s) =>
        student.subjects.map((ss) => ss.id).includes(s.id)
      );
      const levelMatch = tutor.levels.some((l) =>
        student.levels.map((sl) => sl.id).includes(l.id)
      );
      const { perfect, partial } = checkAvailability(
        student.availabilities,
        tutor.availabilities
      );
      const score = computeScore({
        subjectMatch,
        levelMatch,
        perfect,
        partial,
      });
      return {
        tutor,
        score,
        perfect,
        partial,
        subjectMatch,
        levelMatch,
      };
    })
    .filter(
      (m) => m.subjectMatch && m.levelMatch && (m.perfect > 0 || m.partial > 0)
    )
    .sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    return NextResponse.json({
      message: "Aucun tuteur disponible pour cet élève.",
    });
  }

  return NextResponse.json(matches);
}

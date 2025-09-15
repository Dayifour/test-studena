import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function checkAvailability(
  studentSlots: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    tutorId: number | null;
    studentId: number | null;
  }[],
  tutorSlots: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    tutorId: number | null;
    studentId: number | null;
  }[]
) {
  // Renvoie le nombre de créneaux communs
  let perfect = 0;
  let partial = 0;
  // Fonction pour convertir "18h" ou "18:00" en minutes
  function toMinutes(str: string) {
    if (!str) return 0;
    const s = str.replace("h", ":");
    const [h, m = "0"] = s.split(":");
    return parseInt(h) * 60 + parseInt(m);
  }
  const tolerance = 15; // minutes de tolérance
  for (const s of studentSlots) {
    for (const t of tutorSlots) {
      const dayS = s.day.trim().toLowerCase();
      const dayT = t.day.trim().toLowerCase();
      if (dayS === dayT) {
        // Convertir les horaires en minutes
        const sStart = toMinutes(s.startTime);
        const sEnd = toMinutes(s.endTime);
        const tStart = toMinutes(t.startTime);
        const tEnd = toMinutes(t.endTime);
        // Disponibilité parfaite : horaires identiques ou dans la tolérance
        if (
          Math.abs(sStart - tStart) <= tolerance &&
          Math.abs(sEnd - tEnd) <= tolerance
        ) {
          perfect++;
        } else {
          // Chevauchement partiel : au moins 30 min d'intersection
          const overlap = Math.min(sEnd, tEnd) - Math.max(sStart, tStart);
          if (overlap >= 30) {
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
  try {
    const data = await request.json();
    const studentId =
      typeof data.studentId === "number"
        ? data.studentId
        : Number(data.studentId);
    if (!studentId || isNaN(studentId)) {
      return NextResponse.json(
        { error: "ID élève manquant ou invalide" },
        { status: 400 }
      );
    }
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        subjects: true,
        levels: true,
        availabilities: true,
      },
    });
    if (!student) {
      return NextResponse.json({ error: "Élève introuvable" }, { status: 404 });
    }
    const tutors = await prisma.tutor.findMany({
      include: {
        subjects: true,
        levels: true,
        availabilities: true,
      },
    });

    // Correction : utilise Set pour garantir la correspondance des IDs
    // Nouvelle logique propre et fiable
    interface Subject {
      id: number;
      name?: string;
    }

    interface Level {
      id: number;
      name?: string;
    }

    interface Availability {
      id: number;
      day: string;
      startTime: string;
      endTime: string;
      tutorId: number | null;
      studentId: number | null;
    }

    interface Tutor {
      id: number;
      fullName: string;
      subjects: Subject[];
      levels: Level[];
      availabilities: Availability[];
    }

    const debugStudent = {
      id: student.id,
      fullName: student.fullName,
      subjectIds: student.subjects.map((s: Subject) => s.id),
      levelIds: student.levels.map((l: Level) => l.id),
      availabilities: student.availabilities,
    };
    const debugTutors = tutors.map((tutor: Tutor) => ({
      id: tutor.id,
      fullName: tutor.fullName,
      subjectIds: tutor.subjects.map((s: Subject) => s.id),
      levelIds: tutor.levels.map((l: Level) => l.id),
      availabilities: tutor.availabilities,
    }));

    const studentSubjectIds: Set<number> = new Set(debugStudent.subjectIds);
    const studentLevelIds: Set<number> = new Set(debugStudent.levelIds);

    interface Match {
      tutor: Tutor;
      score: number;
      perfect: number;
      partial: number;
      subjectMatch: boolean;
      levelMatch: boolean;
      tutorSubjectIds: number[];
      tutorLevelIds: number[];
      studentSubjectIds: number[];
      studentLevelIds: number[];
      reason: string;
    }

    const evaluated: Match[] = tutors.map((tutor: Tutor): Match => {
      const tutorSubjectIds = new Set(tutor.subjects.map((s: Subject) => s.id));
      const tutorLevelIds = new Set(tutor.levels.map((l: Level) => l.id));
      // Vérifie au moins une matière ET un niveau en commun
      const subjectMatch: boolean = Array.from(tutorSubjectIds).some((id) =>
        studentSubjectIds.has(id)
      );
      const levelMatch: boolean = Array.from(tutorLevelIds).some((id) =>
        studentLevelIds.has(id)
      );
      const { perfect, partial }: { perfect: number; partial: number } =
        checkAvailability(student.availabilities, tutor.availabilities);
      const score: number = computeScore({
        subjectMatch,
        levelMatch,
        perfect,
        partial,
      });
      let reason: string = "";
      if (!subjectMatch) reason += "Pas de matière en commun. ";
      if (!levelMatch) reason += "Pas de niveau en commun. ";
      if (perfect === 0 && partial === 0)
        reason += "Aucune disponibilité compatible. ";
      return {
        tutor,
        score,
        perfect,
        partial,
        subjectMatch,
        levelMatch,
        tutorSubjectIds: Array.from(tutorSubjectIds) as number[],
        tutorLevelIds: Array.from(tutorLevelIds) as number[],
        studentSubjectIds: Array.from(studentSubjectIds) as number[],
        studentLevelIds: Array.from(studentLevelIds) as number[],
        reason,
      };
    });

    // Étape 1: Filtre strict (matière ET niveau) + au moins un chevauchement de dispo
    const strictMatches = evaluated
      .filter(
        (m: Match) =>
          m.subjectMatch && m.levelMatch && (m.perfect > 0 || m.partial > 0)
      )
      .sort((a: Match, b: Match) => b.score - a.score);

    // Étape 2 (fallback): si rien en strict, autoriser matière OU niveau avec dispo
    const fallbackMatches = evaluated
      .filter(
        (m: Match) =>
          (m.subjectMatch || m.levelMatch) && (m.perfect > 0 || m.partial > 0)
      )
      .sort((a: Match, b: Match) => b.score - a.score);

    const matches: Match[] =
      strictMatches.length > 0 ? strictMatches : fallbackMatches;

    return NextResponse.json({
      matches: matches,
      debugStudent: debugStudent,
      debugTutors: debugTutors,
    });
  } catch (error) {
    console.error("Erreur dans le matchmaking:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

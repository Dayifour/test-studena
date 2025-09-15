"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import TutorCard from "../../components/TutorCard";

export default function MatchmakingPage() {
  const [students, setStudents] = useState<{ id: number; fullName: string }[]>(
    []
  );
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  type Availability = {
    day: string;
    startTime: string;
    endTime: string;
  };
  type TutorMatch = {
    tutor: {
      id: number;
      fullName: string;
      subjects: { name: string }[];
      levels: { name: string }[];
      availabilities: Availability[];
    };
    score: number;
  };

  const [results, setResults] = useState<TutorMatch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data: { id: number; fullName: string }[]) => {
        setStudents(data.map((s) => ({ id: s.id, fullName: s.fullName })));
      });
  }, []);

  const handleMatch = async () => {
    if (!selectedStudent) return;
    setLoading(true);
    setResults([]);
    const res = await fetch("/api/matchmaking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: Number(selectedStudent) }),
    });
    const data = await res.json();
    // L'API renvoie { matches, debugStudent, debugTutors } ou { message, ... }
    setResults(
      Array.isArray(data?.matches) ? (data.matches as TutorMatch[]) : []
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-6 tracking-tight">
        Matchmaking Élève ↔ Tuteur
      </h1>
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
        <p className="text-lg text-gray-700 mb-4">
          Sélectionnez un élève pour découvrir les meilleurs tuteurs
          correspondants selon la matière, le niveau et les disponibilités.
        </p>
        <div className="mb-6">
          <select
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Sélectionner un élève</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName}
              </option>
            ))}
          </select>
          <button
            className="mt-4 px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition w-full"
            onClick={handleMatch}
            disabled={!selectedStudent || loading}
          >
            {loading
              ? "Recherche en cours..."
              : "Trouver les meilleurs tuteurs"}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="text-green-500 animate-pulse">
              Recherche des meilleurs matchs...
            </div>
          )}
          {!loading && results.length === 0 && selectedStudent && (
            <div className="bg-gray-100 rounded p-4 text-gray-500">
              Aucun tuteur disponible pour cet élève.
            </div>
          )}
          {!loading &&
            results.length > 0 &&
            results.map((match) => (
              <TutorCard
                key={match.tutor.id}
                fullName={match.tutor.fullName}
                subjects={match.tutor.subjects.map((s) => s.name)}
                levels={match.tutor.levels.map((l) => l.name)}
                availabilities={match.tutor.availabilities.map((a) => ({
                  day: a.day,
                  startTime: a.startTime,
                  endTime: a.endTime,
                }))}
                score={match.score}
              />
            ))}
        </div>
      </div>
      <Link
        href="/students"
        className="mt-4 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
      >
        Voir les élèves
      </Link>
      <Link
        href="/tutors"
        className="mt-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Voir les tuteurs
      </Link>
    </div>
  );
}

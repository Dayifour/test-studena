"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import StudentCard from "../../components/StudentCard";

export default function StudentsPage() {
  interface Student {
    id: string | number;
    fullName: string;
    subjects: { name: string }[];
    levels: { name: string }[];
    availabilities: { day: string; startTime: string; endTime: string }[];
  }
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700 mb-6 tracking-tight">
        Liste des Élèves
      </h1>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {loading ? (
          <div className="text-center text-purple-500 animate-pulse">
            Chargement des élèves...
          </div>
        ) : students.length === 0 ? (
          <Card title="Aucun élève disponible">
            <div className="text-gray-500">
              Ajoutez un élève pour commencer le matching !
            </div>
          </Card>
        ) : (
          students.map((student) => (
            <StudentCard
              key={student.id}
              fullName={student.fullName}
              subjects={student.subjects.map((s) => s.name)}
              levels={student.levels.map((l) => l.name)}
              availabilities={student.availabilities}
            />
          ))
        )}
      </div>
      <Link
        href="/students/add"
        className="mt-8 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
      >
        Ajouter un élève
      </Link>
    </div>
  );
}

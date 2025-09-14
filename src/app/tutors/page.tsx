"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import TutorCard from "../../components/TutorCard";

interface Tutor {
  id: string | number;
  fullName: string;
  subjects: { name: string }[];
  levels: { name: string }[];
  availabilities: { day: string; timeSlots: string[] }[]; // Adjust fields as needed
}

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tutors")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 tracking-tight">
        Liste des Tuteurs
      </h1>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {loading ? (
          <div className="text-center text-blue-500 animate-pulse">
            Chargement des tuteurs...
          </div>
        ) : tutors.length === 0 ? (
          <Card title="Aucun tuteur disponible">
            <div className="text-gray-500">
              Ajoutez un tuteur pour commencer le matching !
            </div>
          </Card>
        ) : (
          tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              fullName={tutor.fullName}
              subjects={tutor.subjects.map((s) => s.name)}
              levels={tutor.levels.map((l) => l.name)}
              availabilities={tutor.availabilities.map((a) => ({
                day: a.day,
                startTime: a.timeSlots[0] || "",
                endTime: a.timeSlots[a.timeSlots.length - 1] || "",
              }))}
            />
          ))
        )}
      </div>
      <Link
        href="/tutors/add"
        className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Ajouter un tuteur
      </Link>
    </div>
  );
}

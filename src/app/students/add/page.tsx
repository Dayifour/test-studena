"use client";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function AddStudentPage() {
  const [fullName, setFullName] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Adapter pour la vraie structure
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        subjectIds: subjects.map(Number),
        levelIds: levels.map(Number),
        availabilities: [
          {
            day: availabilities.split(" ")[0],
            startTime: availabilities.split(" ")[1]?.split("-")[0],
            endTime: availabilities.split(" ")[1]?.split("-")[1],
          },
        ],
      }),
    });
    setSuccess(true);
    setFullName("");
    setSubjects([]);
    setLevels([]);
    setAvailabilities("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-100 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          Ajouter un élève
        </h2>
        <Input
          label="Nom complet"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Select
          label="Matières (ID)"
          name="subjects"
          value={subjects.join(",")}
          onChange={(e) => setSubjects(e.target.value.split(","))}
          options={["1", "2", "3"]}
        />
        <Select
          label="Niveaux (ID)"
          name="levels"
          value={levels.join(",")}
          onChange={(e) => setLevels(e.target.value.split(","))}
          options={["1", "2", "3"]}
        />
        <Input
          label="Disponibilité (ex: Lundi 18h-20h)"
          name="availabilities"
          value={availabilities}
          onChange={(e) => setAvailabilities(e.target.value)}
        />
        <Button type="submit">Ajouter</Button>
        {success && (
          <div className="text-green-600 font-semibold mt-2">
            Élève ajouté avec succès !
          </div>
        )}
        <Link href="/students" className="text-purple-600 underline mt-4">
          Retour à la liste
        </Link>
      </form>
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function AddTutorPage() {
  const [fullName, setFullName] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [levelOptions, setLevelOptions] = useState<
    { id: number; name: string }[]
  >([]);
  useEffect(() => {
    fetch("/api/subjects")
      .then((res) => res.json())
      .then((data) => setSubjectOptions(data));
    fetch("/api/levels")
      .then((res) => res.json())
      .then((data) => setLevelOptions(data));
  }, []);
  const [availabilities, setAvailabilities] = useState<string[]>([""]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleAddAvailability = () => {
    setAvailabilities([...availabilities, ""]);
  };
  const handleAvailabilityChange = (idx: number, value: string) => {
    const updated = [...availabilities];
    updated[idx] = value;
    setAvailabilities(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Validation de chaque disponibilité
    const parsedAvailabilities = availabilities
      .map((a) => {
        const [day, time] = a.split(" ");
        const [startTime, endTime] = time ? time.split("-") : ["", ""];
        if (!day || !startTime || !endTime) return null;
        return { day, startTime, endTime };
      })
      .filter(Boolean);
    if (parsedAvailabilities.length === 0) {
      setError(
        "Format de disponibilité invalide. Exemple attendu : Lundi 18h-20h"
      );
      return;
    }
    await fetch("/api/tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        subjectIds: subjects.map(Number),
        levelIds: levels.map(Number),
        availabilities: parsedAvailabilities,
      }),
    });
    setSuccess(true);
    setFullName("");
    setSubjects([]);
    setLevels([]);
    setAvailabilities([""]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          Ajouter un tuteur
        </h2>
        <Input
          label="Nom complet"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Select
          label="Matières"
          name="subjects"
          value={subjects.join(",")}
          onChange={(e) => setSubjects(e.target.value.split(","))}
          options={subjectOptions.map((s) => String(s.id))}
        />
        <Select
          label="Niveaux"
          name="levels"
          value={levels.join(",")}
          onChange={(e) => setLevels(e.target.value.split(","))}
          options={levelOptions.map((l) => String(l.id))}
        />
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Disponibilités (ex: Lundi 18h-20h)
          </label>
          {availabilities.map((a, idx) => (
            <Input
              key={idx}
              label={""}
              name={`availability-${idx}`}
              value={a}
              onChange={(e) => handleAvailabilityChange(idx, e.target.value)}
              placeholder="Lundi 18h-20h"
            />
          ))}
          <Button type="button" onClick={handleAddAvailability}>
            + Ajouter une disponibilité
          </Button>
        </div>
        <Button type="submit">Ajouter</Button>
        {error && (
          <div className="text-red-600 font-semibold mt-2">{error}</div>
        )}
        {success && (
          <div className="text-green-600 font-semibold mt-2">
            Tuteur ajouté avec succès !
          </div>
        )}
        <Link href="/tutors" className="text-blue-600 underline mt-4">
          Retour à la liste
        </Link>
      </form>
    </div>
  );
}

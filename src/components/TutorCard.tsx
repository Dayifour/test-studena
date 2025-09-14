import AvailabilityDisplay from "./AvailabilityDisplay";

export interface TutorCardProps {
  fullName: string;
  subjects: string[];
  levels: string[];
  availabilities: { day: string; startTime: string; endTime: string }[];
  score?: number;
}

export default function TutorCard({
  fullName,
  subjects,
  levels,
  availabilities,
  score,
}: TutorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{fullName}</h3>
        {score !== undefined && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
            Compatibilité : {score}%
          </span>
        )}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Matières :</span> {subjects.join(", ")}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Niveaux :</span> {levels.join(", ")}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Disponibilités :</span>
        <div className="flex flex-wrap mt-1">
          {availabilities.map((a, i) => (
            <AvailabilityDisplay key={i} {...a} />
          ))}
        </div>
      </div>
    </div>
  );
}

import AvailabilityDisplay from "./AvailabilityDisplay";

export interface StudentCardProps {
  fullName: string;
  subjects: string[];
  levels: string[];
  availabilities: { day: string; startTime: string; endTime: string }[];
}

export default function StudentCard({
  fullName,
  subjects,
  levels,
  availabilities,
}: StudentCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{fullName}</h3>
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

interface AvailabilityProps {
  day: string;
  startTime: string;
  endTime: string;
}

export default function AvailabilityDisplay({
  day,
  startTime,
  endTime,
}: AvailabilityProps) {
  return (
    <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 mb-1 text-xs">
      {day} {startTime}-{endTime}
    </span>
  );
}

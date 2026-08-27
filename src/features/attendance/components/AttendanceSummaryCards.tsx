import Card from "../../../components/ui/Card";
import type { AttendanceSummary } from "../types/attendance.types";

interface AttendanceSummaryCardsProps {
  summary: AttendanceSummary;
}

export default function AttendanceSummaryCards({
  summary,
}: AttendanceSummaryCardsProps) {
  const cards = [
    {
      label: "Total Students",
      value: summary.total,
    },
    {
      label: "Present",
      value: summary.present,
    },
    {
      label: "Absent",
      value: summary.absent,
    },
    {
      label: "Leave",
      value: summary.leave,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="p-5">
          <p className="text-sm text-slate-500">
            {card.label}
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {card.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
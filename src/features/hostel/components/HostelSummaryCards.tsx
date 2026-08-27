import Card from "../../../components/ui/Card";

interface HostelSummaryCardsProps {
  totalBeds: number;
  occupiedBeds: number;
}

export default function HostelSummaryCards({
  totalBeds,
  occupiedBeds,
}: HostelSummaryCardsProps) {
  const availableBeds =
    totalBeds - occupiedBeds;

  const occupancy =
    totalBeds === 0
      ? 0
      : Math.round(
          (occupiedBeds / totalBeds) * 100,
        );

  const cards = [
    {
      label: "Total Beds",
      value: totalBeds,
    },
    {
      label: "Occupied",
      value: occupiedBeds,
    },
    {
      label: "Available",
      value: availableBeds,
    },
    {
      label: "Occupancy",
      value: `${occupancy}%`,
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
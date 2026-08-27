import type { FeeRecord } from "../types/fee.types";

interface FeeSummaryCardsProps {
  fees: FeeRecord[];
}

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function FeeSummaryCards({
  fees,
}: FeeSummaryCardsProps) {
  const expected = fees.reduce(
    (sum, fee) => sum + fee.amountDue,
    0
  );

  const collected = fees.reduce(
    (sum, fee) => sum + fee.amountPaid,
    0
  );

  const pending = fees.reduce(
    (sum, fee) =>
      sum + Math.max(fee.amountDue - fee.amountPaid, 0),
    0
  );

  const overdue = fees.filter(
    (fee) => fee.status === "overdue"
  ).length;

  const cards = [
    {
      title: "Expected",
      value: formatCurrency(expected),
    },
    {
      title: "Collected",
      value: formatCurrency(collected),
    },
    {
      title: "Pending",
      value: formatCurrency(pending),
    },
    {
      title: "Overdue",
      value: overdue.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
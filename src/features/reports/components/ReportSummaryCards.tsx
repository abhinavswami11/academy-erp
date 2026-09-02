import {
  Users,
  UserCheck,
  IndianRupee,
  Wallet,
  Receipt,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../students/utils/formatters";

interface ReportSummaryCardsProps {
  totalStudents: number;
  activeStudents: number;
  feesDue: number;
  feesCollected: number;
  outstandingFees: number;
}

export default function ReportSummaryCards({
  totalStudents,
  activeStudents,
  feesDue,
  feesCollected,
  outstandingFees,
}: ReportSummaryCardsProps) {
  const cards = [
    {
      title: "Total Students",
      value: totalStudents.toString(),
      icon: Users,
    },
    {
      title: "Active Students",
      value: activeStudents.toString(),
      icon: UserCheck,
    },
    {
      title: "Total Fees Due",
      value: formatCurrency(feesDue),
      icon: Receipt,
    },
    {
      title: "Fees Collected",
      value: formatCurrency(feesCollected),
      icon: IndianRupee,
    },
    {
      title: "Outstanding Fees",
      value: formatCurrency(outstandingFees),
      icon: Wallet,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-3">
                <Icon className="h-5 w-5 text-slate-700" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

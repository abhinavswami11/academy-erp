import { ArrowDown, ArrowUp, Wallet, Receipt } from "lucide-react";

import Card from "../../../components/ui/Card";
import type { Transaction } from "../types/accounts.types";
import { calculateTotals } from "../services/accounts.service";

interface AccountSummaryCardsProps {
  transactions: Transaction[];
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AccountSummaryCards({
  transactions,
}: AccountSummaryCardsProps) {
  const totals = calculateTotals(transactions);

  const cards = [
    {
      label: "Total Income",
      value: formatCurrency(totals.income),
      icon: ArrowUp,
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totals.expenses),
      icon: ArrowDown,
      iconClass: "bg-red-100 text-red-700",
    },
    {
      label: "Current Balance",
      value: formatCurrency(totals.balance),
      icon: Wallet,
      iconClass: "bg-blue-100 text-blue-700",
    },
    {
      label: "Transactions",
      value: transactions.length.toString(),
      icon: Receipt,
      iconClass: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.label}
                </p>

                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div
                className={`rounded-lg p-2.5 ${card.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
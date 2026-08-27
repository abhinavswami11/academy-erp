import { Trash2 } from "lucide-react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import type { Transaction } from "../types/accounts.types";

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(date: string): string {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

export default function TransactionTable({
  transactions,
  onDelete,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm text-slate-500">
          No transactions match your filters.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">
                Description
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Category
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Date
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Method
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Type
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Amount
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {transaction.description}
                  </p>

                  {transaction.notes && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {transaction.notes}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {transaction.category}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {formatDate(transaction.date)}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {transaction.paymentMethod}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      transaction.type === "income"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td
                  className={`px-4 py-3 font-medium ${
                    transaction.type === "income"
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  {formatCurrency(transaction.amount)}
                </td>

                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    className="min-h-9 px-2 py-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
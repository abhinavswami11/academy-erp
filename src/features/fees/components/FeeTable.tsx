import type { FeeRecord, FeeStatus } from "../types/fee.types";

interface FeeTableProps {
  fees: FeeRecord[];
  onViewHistory: (fee: FeeRecord) => void;
}

const statusStyles: Record<FeeStatus, string> = {
  paid: "bg-green-50 text-green-700",
  partial: "bg-yellow-50 text-yellow-700",
  pending: "bg-slate-100 text-slate-700",
  overdue: "bg-red-50 text-red-700",
};

const statusLabels: Record<FeeStatus, string> = {
  paid: "Paid",
  partial: "Partial",
  pending: "Pending",
  overdue: "Overdue",
};

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

const formatPeriod = (month: number, year: number) =>
  new Date(year, month - 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

export default function FeeTable({
  fees,
  onViewHistory,
}: FeeTableProps) {
  if (fees.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-medium text-slate-900">
          No fee records found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Student
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Period
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Due
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Paid
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Balance
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => {
              const balance = Math.max(
                fee.amountDue - fee.amountPaid,
                0
              );

              return (
                <tr
                  key={fee.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">
                      {fee.studentName}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatPeriod(fee.month, fee.year)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatCurrency(fee.amountDue)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatCurrency(fee.amountPaid)}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-900">
                    {formatCurrency(balance)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[fee.status]}`}
                    >
                      {statusLabels[fee.status]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onViewHistory(fee)}
                      className="text-sm font-medium text-slate-700 hover:text-slate-950"
                    >
                      History
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
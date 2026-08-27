import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../students/utils/formatters";

import type { FeeRecord } from "../../fees/types/fee.types";
import type { FeeStats } from "../utils/report.utils";

interface FeeReportProps {
  fees: FeeRecord[];
  stats: FeeStats;
}

export default function FeeReport({
  fees,
  stats,
}: FeeReportProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Fee Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fee collection and outstanding payment statistics.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pb-5 md:grid-cols-3 lg:grid-cols-7">
        <FeeStat label="Due" value={stats.due} />
        <FeeStat label="Collected" value={stats.collected} />
        <FeeStat label="Outstanding" value={stats.outstanding} />
        <FeeCount label="Paid" value={stats.paid} />
        <FeeCount label="Partial" value={stats.partial} />
        <FeeCount label="Pending" value={stats.pending} />
        <FeeCount label="Overdue" value={stats.overdue} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50">
              <th className="px-5 py-3 font-medium text-slate-600">
                Student
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Month
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Due
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Paid
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Outstanding
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {fees.map((fee) => {
              const outstanding = Math.max(
                fee.amountDue - fee.amountPaid,
                0,
              );

              return (
                <tr key={fee.id}>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {fee.studentName}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {fee.month}/{fee.year}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {formatCurrency(fee.amountDue)}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {formatCurrency(fee.amountPaid)}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {formatCurrency(outstanding)}
                  </td>

                  <td className="px-5 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">
                      {fee.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function FeeStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function FeeCount({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}
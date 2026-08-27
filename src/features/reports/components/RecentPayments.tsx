import Card from "../../../components/ui/Card";

import type { Student } from "../../students/types/student.types";
import type { FeePayment } from "../../fees/types/fee.types";

import { formatCurrency, formatDate } from "../../students/utils/formatters";

interface RecentPaymentsProps {
  payments: FeePayment[];
  students: Student[];
}

export default function RecentPayments({
  payments,
  students,
}: RecentPaymentsProps) {
  const studentMap = new Map(
    students.map((student) => [
      student.id,
      student.fullName,
    ]),
  );

  const recentPayments = [...payments]
    .sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() -
        new Date(a.paymentDate).getTime(),
    )
    .slice(0, 10);

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Payments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest recorded fee payments.
        </p>
      </div>

      {recentPayments.length === 0 ? (
        <div className="border-t border-slate-200 px-5 py-10 text-center">
          <p className="text-sm text-slate-500">
            No payments recorded yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-y border-slate-200 bg-slate-50">
                <th className="px-5 py-3 font-medium text-slate-600">
                  Date
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Student
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Amount
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Method
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-5 py-3 text-slate-600">
                    {formatDate(payment.paymentDate)}
                  </td>

                  <td className="px-5 py-3 font-medium text-slate-900">
                    {studentMap.get(payment.studentId) ??
                      "Unknown Student"}
                  </td>

                  <td className="px-5 py-3 text-slate-700">
                    {formatCurrency(payment.amount)}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {payment.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
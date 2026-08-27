import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import type { HostelAllocation } from "../types/hostel.types";

interface HostelTableProps {
  allocations: HostelAllocation[];
  onVacate: (id: string) => void;
}

export default function HostelTable({
  allocations,
  onVacate,
}: HostelTableProps) {
  if (allocations.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm text-slate-500">
          No hostel residents found.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">
                Student
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Batch
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Room
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Bed
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Allocation Date
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Status
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {allocation.studentName}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {allocation.batch}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {allocation.roomNumber}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {allocation.bedNumber}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {allocation.allocationDate}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      allocation.status ===
                      "occupied"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {allocation.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {allocation.status ===
                    "occupied" && (
                    <Button
                      variant="ghost"
                      className="min-h-9 px-2 py-1 text-red-600 hover:bg-red-50"
                      onClick={() =>
                        onVacate(
                          allocation.id,
                        )
                      }
                    >
                      Vacate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
import { Users, Home, UserMinus } from "lucide-react";

import Card from "../../../components/ui/Card";
import type { Student } from "../../students/types/student.types";
import type { StudentStats } from "../utils/report.utils";

interface StudentReportProps {
  students: Student[];
  stats: StudentStats;
}

export default function StudentReport({
  students,
  stats,
}: StudentReportProps) {
  return (
    <Card className="p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Student Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current student enrollment statistics.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat
          icon={Users}
          label="Total"
          value={stats.total}
        />

        <Stat
          icon={Users}
          label="Active"
          value={stats.active}
        />

        <Stat
          icon={UserMinus}
          label="Inactive"
          value={stats.inactive}
        />

        <Stat
          icon={UserMinus}
          label="Left"
          value={stats.left}
        />

        <Stat
          icon={Home}
          label="Hostel"
          value={stats.hostel}
        />

        <Stat
          icon={Home}
          label="Non-hostel"
          value={stats.nonHostel}
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          Students by Batch
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 font-medium text-slate-600">
                  Batch
                </th>
                <th className="px-4 py-3 font-medium text-slate-600">
                  Students
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {Object.entries(stats.byBatch).map(
                ([batch, count]) => (
                  <tr key={batch}>
                    <td className="px-4 py-3 text-slate-700">
                      {batch}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {count}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {students.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          No students available.
        </p>
      )}
    </Card>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <Icon className="h-4 w-4 text-slate-500" />

      <p className="mt-2 text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}
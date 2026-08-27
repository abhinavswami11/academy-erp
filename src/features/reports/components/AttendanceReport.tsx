import Card from "../../../components/ui/Card";

import type { AttendanceRecord } from "../../attendance/types/attendance.types";
import type { AttendanceStats } from "../utils/report.utils";

interface AttendanceReportProps {
  records: AttendanceRecord[];
  stats: AttendanceStats;
}

export default function AttendanceReport({
  records,
  stats,
}: AttendanceReportProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Attendance Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Today's attendance summary.
            </p>
          </div>

          <div className="rounded-lg bg-slate-100 px-4 py-2">
            <span className="text-sm text-slate-500">
              Attendance
            </span>

            <span className="ml-2 font-semibold text-slate-900">
              {stats.percentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pb-5 md:grid-cols-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Present" value={stats.present} />
        <Stat label="Absent" value={stats.absent} />
        <Stat label="Leave" value={stats.leave} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50">
              <th className="px-5 py-3 font-medium text-slate-600">
                Student
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Batch
              </th>
              <th className="px-5 py-3 font-medium text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-5 py-3 font-medium text-slate-900">
                  {record.studentName}
                </td>

                <td className="px-5 py-3 text-slate-600">
                  {record.batch}
                </td>

                <td className="px-5 py-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Stat({
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
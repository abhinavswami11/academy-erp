import Card from "../../../components/ui/Card";
import type {
  AttendanceRecord,
  AttendanceStatus,
} from "../types/attendance.types";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onStatusChange: (
    studentId: string,
    status: AttendanceStatus,
  ) => void;
}

const statusOptions: AttendanceStatus[] = [
  "present",
  "absent",
  "leave",
];

export default function AttendanceTable({
  records,
  onStatusChange,
}: AttendanceTableProps) {
  if (records.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm text-slate-500">
          No students found for this batch.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">
                Student
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Batch
              </th>

              <th className="px-4 py-3 font-medium text-slate-600">
                Attendance
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr key={record.studentId}>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {record.studentName}
                  </p>
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {record.batch}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          onStatusChange(
                            record.studentId,
                            status,
                          )
                        }
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                          record.status === status
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import type { Student, StudentStatus } from "../types/student.types";
import { formatCurrency } from "../utils/formatters";

interface StudentTableProps {
  students: Student[];
}

const statusStyles: Record<StudentStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-amber-100 text-amber-700",
  left: "bg-slate-100 text-slate-600",
};

export default function StudentTable({ students }: StudentTableProps) {
  const navigate = useNavigate();

  if (students.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm text-slate-500">No students match your filters.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">Student</th>
              <th className="px-4 py-3 font-medium text-slate-600">Batch</th>
              <th className="px-4 py-3 font-medium text-slate-600">Phone</th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Monthly Fee
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">Hostel</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => navigate(`/students/${student.id}`)}
                className="cursor-pointer transition-colors hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {student.fullName}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">{student.batch}</td>
                <td className="px-4 py-3 text-slate-600">{student.phone}</td>
                <td className="px-4 py-3 text-slate-600">
                  {formatCurrency(student.monthlyFee)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      student.hostelResident
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {student.hostelResident ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[student.status]}`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    className="min-h-9 px-2 py-1"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/students/${student.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    View
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

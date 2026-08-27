import Card from "../../../components/ui/Card";
import type { Student, StudentStatus } from "../types/student.types";
import { formatCurrency, formatDate } from "../utils/formatters";

interface StudentProfileProps {
  student: Student;
}

const statusStyles: Record<StudentStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-amber-100 text-amber-700",
  left: "bg-slate-100 text-slate-600",
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value || "—"}</dd>
    </div>
  );
}

function formatGender(gender: Student["gender"]): string {
  if (!gender) return "—";
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

export default function StudentProfile({ student }: StudentProfileProps) {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {student.fullName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{student.batch}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[student.status]}`}
          >
            {student.status}
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Batch" value={student.batch} />
          <DetailItem label="Joining Date" value={formatDate(student.joiningDate)} />
          <DetailItem label="Coach" value={student.coach} />
          <DetailItem
            label="Monthly Fee"
            value={formatCurrency(student.monthlyFee)}
          />
          <DetailItem
            label="Hostel Resident"
            value={student.hostelResident ? "Yes" : "No"}
          />
        </dl>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Personal Information
          </h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Date of Birth"
              value={formatDate(student.dateOfBirth)}
            />
            <DetailItem label="Gender" value={formatGender(student.gender)} />
            <DetailItem label="Phone" value={student.phone} />
            <DetailItem label="Address" value={student.address} />
          </dl>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Parent / Guardian Information
          </h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Name" value={student.parentName} />
            <DetailItem label="Phone" value={student.parentPhone} />
          </dl>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-base font-semibold text-slate-900">Attendance</h3>
          <p className="mt-2 text-sm text-slate-500">
            Attendance records will be connected in a later milestone.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold text-slate-900">
            Fee History
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Fee payment history will be connected in a later milestone.
          </p>
        </Card>
      </div>
    </div>
  );
}

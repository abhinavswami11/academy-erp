import { useMemo } from "react";
import PageHeader from "../../components/ui/PageHeader";

import ReportSummaryCards from "./components/ReportSummaryCards";
import StudentReport from "./components/StudentReport";
import FeeReport from "./components/FeeReport";
import AttendanceReport from "./components/AttendanceReport";
import RecentPayments from "./components/RecentPayments";

import { getStudents } from "../students/services/student.service";
import { getFees, getPayments } from "../fees/services/fee.service";
import { buildAttendanceForDate } from "../attendance/services/attendance.service";

import {
  calculateStudentStats,
  calculateFeeStats,
  calculateAttendanceStats,
} from "./utils/report.utils";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function ReportsPage() {
  const students = useMemo(() => getStudents(), []);
  const fees = useMemo(() => getFees(), []);
  const payments = useMemo(() => getPayments(), []);

  const attendance = useMemo(
    () => buildAttendanceForDate(getToday()),
    [],
  );

  const studentStats = useMemo(
    () => calculateStudentStats(students),
    [students],
  );

  const feeStats = useMemo(
    () => calculateFeeStats(fees),
    [fees],
  );

  const attendanceStats = useMemo(
    () => calculateAttendanceStats(attendance),
    [attendance],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="View student, fee, and attendance statistics."
      />

      <ReportSummaryCards
        totalStudents={studentStats.total}
        activeStudents={studentStats.active}
        feesDue={feeStats.due}
        feesCollected={feeStats.collected}
        outstandingFees={feeStats.outstanding}
      />

      <StudentReport students={students} stats={studentStats} />

      <FeeReport fees={fees} stats={feeStats} />

      <AttendanceReport records={attendance} stats={attendanceStats} />

      <RecentPayments payments={payments} students={students} />
    </div>
  );
}

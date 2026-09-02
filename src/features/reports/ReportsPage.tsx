import { useEffect, useState } from "react";

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

import type { Student } from "../students/types/student.types";
import type { FeeRecord, FeePayment } from "../fees/types/fee.types";
import type { AttendanceRecord } from "../attendance/types/attendance.types";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function ReportsPage() {
  const [students, setStudents] = useState<Student[]>(
    [],
  );

  const [fees, setFees] = useState<FeeRecord[]>([]);

  const [payments, setPayments] = useState<
    FeePayment[]
  >([]);

  const [attendance, setAttendance] = useState<
    AttendanceRecord[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        setIsLoading(true);

        const [
          studentsData,
          feesData,
          paymentsData,
          attendanceData,
        ] = await Promise.all([
          getStudents(),
          Promise.resolve(getFees()),
          Promise.resolve(getPayments()),
          buildAttendanceForDate(getToday()),
        ]);

        setStudents(studentsData);
        setFees(feesData);
        setPayments(paymentsData);
        setAttendance(attendanceData);
      } catch (err) {
        console.error(
          "Failed to load reports:",
          err,
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadReports();
  }, []);

  const studentStats =
    calculateStudentStats(students);

  const feeStats = calculateFeeStats(fees);

  const attendanceStats =
    calculateAttendanceStats(attendance);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Reports"
          description="View student, fee, and attendance statistics."
        />

        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading reports...
        </div>
      </div>
    );
  }

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

      <StudentReport
        students={students}
        stats={studentStats}
      />

      <FeeReport
        fees={fees}
        stats={feeStats}
      />

      <AttendanceReport
        records={attendance}
        stats={attendanceStats}
      />

      <RecentPayments
        payments={payments}
        students={students}
      />
    </div>
  );
}
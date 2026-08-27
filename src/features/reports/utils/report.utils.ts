import type { Student } from "../../students/types/student.types";
import type { FeeRecord } from "../../fees/types/fee.types";
import type { AttendanceRecord } from "../../attendance/types/attendance.types";

export interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  left: number;
  hostel: number;
  nonHostel: number;
  byBatch: Record<string, number>;
}

export interface FeeStats {
  due: number;
  collected: number;
  outstanding: number;
  paid: number;
  partial: number;
  pending: number;
  overdue: number;
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  leave: number;
  percentage: number;
}

export function calculateStudentStats(
  students: Student[],
): StudentStats {
  const byBatch: Record<string, number> = {};

  students.forEach((student) => {
    byBatch[student.batch] =
      (byBatch[student.batch] ?? 0) + 1;
  });

  return {
    total: students.length,
    active: students.filter(
      (student) => student.status === "active",
    ).length,
    inactive: students.filter(
      (student) => student.status === "inactive",
    ).length,
    left: students.filter(
      (student) => student.status === "left",
    ).length,
    hostel: students.filter(
      (student) => student.hostelResident,
    ).length,
    nonHostel: students.filter(
      (student) => !student.hostelResident,
    ).length,
    byBatch,
  };
}

export function calculateFeeStats(
  fees: FeeRecord[],
): FeeStats {
  const due = fees.reduce(
    (sum, fee) => sum + fee.amountDue,
    0,
  );

  const collected = fees.reduce(
    (sum, fee) => sum + fee.amountPaid,
    0,
  );

  return {
    due,
    collected,
    outstanding: Math.max(due - collected, 0),
    paid: fees.filter(
      (fee) => fee.status === "paid",
    ).length,
    partial: fees.filter(
      (fee) => fee.status === "partial",
    ).length,
    pending: fees.filter(
      (fee) => fee.status === "pending",
    ).length,
    overdue: fees.filter(
      (fee) => fee.status === "overdue",
    ).length,
  };
}

export function calculateAttendanceStats(
  records: AttendanceRecord[],
): AttendanceStats {
  const total = records.length;

  const present = records.filter(
    (record) => record.status === "present",
  ).length;

  const absent = records.filter(
    (record) => record.status === "absent",
  ).length;

  const leave = records.filter(
    (record) => record.status === "leave",
  ).length;

  return {
    total,
    present,
    absent,
    leave,
    percentage:
      total === 0
        ? 0
        : Math.round((present / total) * 100),
  };
}
import { getStudents } from "../../students/services/student.service";
import { mockAttendance } from "../data/mockAttendance";
import type {
  AttendanceRecord,
  AttendanceStatus,
} from "../types/attendance.types";

let attendanceRecords: AttendanceRecord[] = [...mockAttendance];

export function buildAttendanceForDate(
  date: string,
): AttendanceRecord[] {
  const savedRecords = getAttendance(date);

  return getStudents().map((student) => {
    const existing = savedRecords.find(
      (record) => record.studentId === student.id,
    );

    return (
      existing ?? {
        id: `${student.id}-${date}`,
        studentId: student.id,
        studentName: student.fullName,
        batch: student.batch,
        date,
        status: "present" as AttendanceStatus,
      }
    );
  });
}

export function getAttendance(
  date: string,
  batch?: string,
): AttendanceRecord[] {
  return attendanceRecords.filter(
    (record) =>
      record.date === date &&
      (!batch || record.batch === batch),
  );
}

export function saveAttendance(
  records: AttendanceRecord[],
): void {
  records.forEach((record) => {
    const existingIndex = attendanceRecords.findIndex(
      (item) =>
        item.studentId === record.studentId &&
        item.date === record.date,
    );

    if (existingIndex >= 0) {
      attendanceRecords[existingIndex] = record;
    } else {
      attendanceRecords.push(record);
    }
  });
}

export function getAttendanceStatus(
  studentId: string,
  date: string,
): AttendanceStatus | undefined {
  return attendanceRecords.find(
    (record) =>
      record.studentId === studentId &&
      record.date === date,
  )?.status;
}
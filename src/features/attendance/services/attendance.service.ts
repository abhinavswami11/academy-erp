import { getStudents } from "../../students/services/student.service";

import {
  getAttendance as getAttendanceRepository,
  getAttendanceStatus as getAttendanceStatusRepository,
  saveAttendance as saveAttendanceRepository,
} from "../../../repositories/attendance.repository";

import type {
  AttendanceRecord,
  AttendanceStatus,
} from "../types/attendance.types";

export async function buildAttendanceForDate(
  date: string,
): Promise<AttendanceRecord[]> {
  const [savedRecords, students] = await Promise.all([
    getAttendanceRepository(date),
    getStudents(),
  ]);

  return students.map((student) => {
    const existing = savedRecords.find(
      (record) => record.studentId === student.id,
    );

    return (
      existing ?? {
        id: `${student.id}_${date}`,
        studentId: student.id,
        studentName: student.fullName,
        batch: student.batch,
        date,
        status: "present" as AttendanceStatus,
      }
    );
  });
}

export async function getAttendance(
  date: string,
  batch?: string,
): Promise<AttendanceRecord[]> {
  return getAttendanceRepository(date, batch);
}

export async function saveAttendance(
  records: AttendanceRecord[],
): Promise<void> {
  await saveAttendanceRepository(records);
}

export async function getAttendanceStatus(
  studentId: string,
  date: string,
): Promise<AttendanceStatus | undefined> {
  return getAttendanceStatusRepository(studentId, date);
}
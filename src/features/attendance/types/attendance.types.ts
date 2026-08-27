export type AttendanceStatus = "present" | "absent" | "leave";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  batch: string;
  date: string;
  status: AttendanceStatus;
}

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  leave: number;
}
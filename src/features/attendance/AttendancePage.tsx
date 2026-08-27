import { useMemo, useState } from "react";
import { CheckCheck, Save } from "lucide-react";

import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";

import AttendanceFilters from "./components/AttendanceFilters";
import AttendanceSummaryCards from "./components/AttendanceSummaryCards";
import AttendanceTable from "./components/AttendanceTable";

import { getStudents } from "../students/services/student.service";

import {
  getAttendance,
  saveAttendance,
} from "./services/attendance.service";

import type {
  AttendanceRecord,
  AttendanceStatus,
} from "./types/attendance.types";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function AttendancePage() {
  const students = useMemo(() => getStudents(), []);

  const [date, setDate] = useState(getToday);
  const [batch, setBatch] = useState("");

  const [records, setRecords] = useState<
    AttendanceRecord[]
  >(() => {
    const today = getToday();

    return getStudents().map((student) => {
      const existing = getAttendance(
        today,
      ).find(
        (record) =>
          record.studentId === student.id,
      );

      return (
        existing ?? {
          id: `${student.id}-${today}`,
          studentId: student.id,
          studentName: student.fullName,
          batch: student.batch,
          date: today,
          status: "present",
        }
      );
    });
  });

  const filteredRecords = useMemo(() => {
    return records.filter(
      (record) =>
        !batch || record.batch === batch,
    );
  }, [records, batch]);

  const summary = useMemo(() => {
    return {
      total: filteredRecords.length,
      present: filteredRecords.filter(
        (record) => record.status === "present",
      ).length,
      absent: filteredRecords.filter(
        (record) => record.status === "absent",
      ).length,
      leave: filteredRecords.filter(
        (record) => record.status === "leave",
      ).length,
    };
  }, [filteredRecords]);

  function handleDateChange(
    newDate: string,
  ) {
    setDate(newDate);

    const savedRecords = getAttendance(
      newDate,
    );

    const newRecords = students.map(
      (student) => {
        const existing =
          savedRecords.find(
            (record) =>
              record.studentId ===
              student.id,
          );

        return (
          existing ?? {
            id: `${student.id}-${newDate}`,
            studentId: student.id,
            studentName: student.fullName,
            batch: student.batch,
            date: newDate,
            status: "present" as AttendanceStatus,
          }
        );
      },
    );

    setRecords(newRecords);
  }

  function handleStatusChange(
    studentId: string,
    status: AttendanceStatus,
  ) {
    setRecords((current) =>
      current.map((record) =>
        record.studentId === studentId
          ? { ...record, status }
          : record,
      ),
    );
  }

  function markAllPresent() {
    setRecords((current) =>
      current.map((record) =>
        !batch || record.batch === batch
          ? { ...record, status: "present" }
          : record,
      ),
    );
  }

  function handleSave() {
    saveAttendance(records);

    window.alert(
      "Attendance saved successfully.",
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Attendance"
          description="Record and manage daily student attendance."
        />

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={markAllPresent}
          >
            <CheckCheck className="h-4 w-4" />
            Mark All Present
          </Button>

          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <AttendanceFilters
          date={date}
          batch={batch}
          onDateChange={handleDateChange}
          onBatchChange={setBatch}
        />

        <AttendanceSummaryCards
          summary={summary}
        />

        <AttendanceTable
          records={filteredRecords}
          onStatusChange={
            handleStatusChange
          }
        />
      </div>
    </div>
  );
}
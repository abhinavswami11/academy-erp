import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";

import AttendanceFilters from "./components/AttendanceFilters";
import AttendanceSummaryCards from "./components/AttendanceSummaryCards";
import AttendanceTable from "./components/AttendanceTable";

import {
  buildAttendanceForDate,
  saveAttendance,
} from "./services/attendance.service";

import type {
  AttendanceRecord,
  AttendanceStatus,
  AttendanceSummary,
} from "./types/attendance.types";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [selectedBatch, setSelectedBatch] = useState("");

  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAttendance() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await buildAttendanceForDate(selectedDate);

        setRecords(data);
      } catch (err) {
        console.error("Failed to load attendance:", err);
        setError("Failed to load attendance.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadAttendance();
  }, [selectedDate]);

  const filteredRecords = useMemo(() => {
    if (!selectedBatch) {
      return records;
    }

    return records.filter(
      (record) => record.batch === selectedBatch,
    );
  }, [records, selectedBatch]);

  const summary: AttendanceSummary = useMemo(() => {
    const present = filteredRecords.filter(
      (record) => record.status === "present",
    ).length;

    const absent = filteredRecords.filter(
      (record) => record.status === "absent",
    ).length;

    const leave = filteredRecords.filter(
      (record) => record.status === "leave",
    ).length;

    return {
      total: filteredRecords.length,
      present,
      absent,
      leave,
    };
  }, [filteredRecords]);

  function handleStatusChange(
    studentId: string,
    status: AttendanceStatus,
  ) {
    setRecords((current) =>
      current.map((record) =>
        record.studentId === studentId
          ? {
              ...record,
              status,
            }
          : record,
      ),
    );
  }

  async function handleSave() {
    try {
      await saveAttendance(records);
      window.alert("Attendance saved successfully.");
    } catch (error) {
      console.error("Failed to save attendance:", error);
      window.alert("Failed to save attendance.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Mark and manage daily student attendance."
      />

      <AttendanceFilters
        date={selectedDate}
        batch={selectedBatch}
        onDateChange={setSelectedDate}
        onBatchChange={setSelectedBatch}
      />

      {isLoading && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading attendance...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <AttendanceSummaryCards summary={summary} />

          <AttendanceTable
            records={filteredRecords}
            onStatusChange={handleStatusChange}
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Save Attendance
            </button>
          </div>
        </>
      )}
    </div>
  );
}
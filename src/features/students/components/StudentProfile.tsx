import { useEffect, useState } from "react";

import Card from "../../../components/ui/Card";

import type { Student } from "../types/student.types";

import {
  formatCurrency,
  formatDate,
} from "../utils/formatters";

import type {
  FeePayment,
  FeeRecord,
} from "../../fees/types/fee.types";

import {
  getFeesByStudentId,
  getPaymentsByFeeId,
} from "../../fees/services/fee.service";

import {
  getAttendance,
  buildAttendanceForDate,
} from "../../attendance/services/attendance.service";

import type { AttendanceRecord } from "../../attendance/types/attendance.types";

interface StudentProfileProps {
  student: Student;
}

const statusStyles: Record<Student["status"], string> = {
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
      <dt className="text-xs font-medium text-slate-500">
        {label}
      </dt>

      <dd className="mt-1 text-sm text-slate-900">
        {value || "—"}
      </dd>
    </div>
  );
}

function formatGender(
  gender: Student["gender"],
): string {
  if (!gender) {
    return "—";
  }

  return (
    gender.charAt(0).toUpperCase() +
    gender.slice(1)
  );
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function StudentProfile({
  student,
}: StudentProfileProps) {
  const [todayAttendance, setTodayAttendance] =
    useState<AttendanceRecord | undefined>(
      undefined,
    );

  const [
    savedAttendanceCount,
    setSavedAttendanceCount,
  ] = useState(0);

  const [feeRecords, setFeeRecords] =
    useState<FeeRecord[]>([]);

  const [feePayments, setFeePayments] =
    useState<FeePayment[]>([]);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const today = getToday();

        const [
          attendanceRecords,
          savedAttendanceRecords,
          fees,
        ] = await Promise.all([
          buildAttendanceForDate(today),
          getAttendance(today),
          getFeesByStudentId(student.id),
        ]);

        const studentAttendance =
          attendanceRecords.find(
            (record) =>
              record.studentId === student.id,
          );

        setTodayAttendance(studentAttendance);

        const studentSavedRecords =
          savedAttendanceRecords.filter(
            (record) =>
              record.studentId === student.id,
          );

        setSavedAttendanceCount(
          studentSavedRecords.length,
        );

        setFeeRecords(fees);

        const paymentResults =
          await Promise.all(
            fees.map((fee) =>
              getPaymentsByFeeId(fee.id),
            ),
          );

        setFeePayments(
          paymentResults.flat(),
        );
      } catch (error) {
        console.error(
          "Failed to load student profile data:",
          error,
        );

        setTodayAttendance(undefined);
        setSavedAttendanceCount(0);
        setFeeRecords([]);
        setFeePayments([]);
      }
    }

    void loadStudentData();
  }, [student.id]);

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {student.fullName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {student.batch}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[student.status]}`}
          >
            {student.status}
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            label="Batch"
            value={student.batch}
          />

          <DetailItem
            label="Joining Date"
            value={formatDate(
              student.joiningDate,
            )}
          />

          <DetailItem
            label="Coach"
            value={student.coach}
          />

          <DetailItem
            label="Monthly Fee"
            value={formatCurrency(
              student.monthlyFee,
            )}
          />

          <DetailItem
            label="Hostel Resident"
            value={
              student.hostelResident
                ? "Yes"
                : "No"
            }
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
              value={formatDate(
                student.dateOfBirth,
              )}
            />

            <DetailItem
              label="Gender"
              value={formatGender(
                student.gender,
              )}
            />

            <DetailItem
              label="Phone"
              value={student.phone}
            />

            <DetailItem
              label="Address"
              value={student.address}
            />
          </dl>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Parent / Guardian Information
          </h3>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Name"
              value={student.parentName}
            />

            <DetailItem
              label="Phone"
              value={student.parentPhone}
            />
          </dl>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-base font-semibold text-slate-900">
            Attendance
          </h3>

          {todayAttendance ? (
            <dl className="mt-4 space-y-3">
              <DetailItem
                label="Today's Status"
                value={
                  todayAttendance.status
                    .charAt(0)
                    .toUpperCase() +
                  todayAttendance.status.slice(1)
                }
              />

              <DetailItem
                label="Saved Records"
                value={
                  savedAttendanceCount > 0
                    ? "Recorded for today"
                    : "Not yet saved for today"
                }
              />
            </dl>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No attendance record for today.
            </p>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold text-slate-900">
            Fee History
          </h3>

          {feeRecords.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">
              No fee records for this student.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {feeRecords.map((fee) => {
                const outstanding = Math.max(
                  fee.amountDue -
                    fee.amountPaid,
                  0,
                );

                return (
                  <div
                    key={fee.id}
                    className="rounded-lg border border-slate-200 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900">
                        {fee.month}/{fee.year}
                      </p>

                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-700">
                        {fee.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-600">
                      Due:{" "}
                      {formatCurrency(
                        fee.amountDue,
                      )}{" "}
                      · Paid:{" "}
                      {formatCurrency(
                        fee.amountPaid,
                      )}{" "}
                      · Outstanding:{" "}
                      {formatCurrency(
                        outstanding,
                      )}
                    </p>
                  </div>
                );
              })}

              {feePayments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    Recent Payments
                  </h4>

                  <ul className="mt-2 space-y-2">
                    {feePayments
                      .slice(0, 5)
                      .map((payment) => (
                        <li
                          key={payment.id}
                          className="text-sm text-slate-600"
                        >
                          {formatDate(
                            payment.paymentDate,
                          )}{" "}
                          —{" "}
                          {formatCurrency(
                            payment.amount,
                          )}{" "}
                          (
                          {
                            payment.paymentMethod
                          }
                          )
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
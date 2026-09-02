import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ClipboardCheck,
  MapPin,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";

import { buildAttendanceForDate } from "../attendance/services/attendance.service";
import { getFees, getPayments } from "../fees/services/fee.service";
import { getStudents } from "../students/services/student.service";
import { getBookings } from "../turf/services/turf.service";
import { formatCurrency } from "../students/utils/formatters";
import { calculateAttendanceStats } from "../reports/utils/report.utils";

import type { TurfBooking } from "../turf/types/turf.types";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
}

function getDuration(
  startTime: string,
  endTime: string,
): string {
  const [startHour] = startTime.split(":").map(Number);
  const [endHour] = endTime.split(":").map(Number);

  const hours = endHour - startHour;

  return hours === 1 ? "1 hr" : `${hours} hrs`;
}

const paymentStatusStyles: Record<
  TurfBooking["paymentStatus"],
  string
> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  partial: "bg-blue-100 text-blue-700",
};

interface DashboardStats {
  studentCount: number;
  batchCount: number;
  outstandingFees: number;
  studentsWithOutstanding: number;
  turfRevenue: number;
  todayBookingCount: number;
  todayBookings: TurfBooking[];
  attendancePercentage: number;
  presentCount: number;
  totalStudents: number;
  recentActivities: {
    id: string;
    text: string;
  }[];
}

const emptyStats: DashboardStats = {
  studentCount: 0,
  batchCount: 0,
  outstandingFees: 0,
  studentsWithOutstanding: 0,
  turfRevenue: 0,
  todayBookingCount: 0,
  todayBookings: [],
  attendancePercentage: 0,
  presentCount: 0,
  totalStudents: 0,
  recentActivities: [],
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const today = getToday();

  const [stats, setStats] =
    useState<DashboardStats>(emptyStats);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true);

        const [
          students,
          fees,
          bookings,
          attendance,
          payments,
        ] = await Promise.all([
          getStudents(),
          getFees(),
          getBookings(),
          buildAttendanceForDate(today),
          getPayments(),
        ]);

        const attendanceStats =
          calculateAttendanceStats(attendance);

        const batches = new Set(
          students
            .filter(
              (student) =>
                student.status === "active",
            )
            .map(
              (student) =>
                student.batch,
            ),
        );

        const outstandingFees =
          fees.reduce(
            (sum, fee) =>
              sum +
              Math.max(
                fee.amountDue -
                  fee.amountPaid,
                0,
              ),
            0,
          );

        const studentsWithOutstanding =
          fees.filter(
            (fee) =>
              fee.amountPaid <
              fee.amountDue,
          ).length;

        const todayBookings =
          bookings.filter(
            (booking) =>
              booking.date === today &&
              booking.status ===
                "confirmed",
          );

        const turfRevenue =
          todayBookings.reduce(
            (total, booking) =>
              total +
              (booking.paymentStatus ===
              "paid"
                ? booking.amount
                : booking.paymentStatus ===
                    "partial"
                  ? Math.round(
                      booking.amount / 2,
                    )
                  : 0),
            0,
          );

        const recentActivities = [
          ...payments
            .slice(0, 2)
            .map((payment) => {
              const fee = fees.find(
                (item) =>
                  item.id ===
                  payment.feeId,
              );

              return {
                id: payment.id,
                text: `Fee collected from ${
                  fee?.studentName ??
                  "student"
                } — ${formatCurrency(
                  payment.amount,
                )}`,
              };
            }),

          ...todayBookings
            .slice(0, 2)
            .map((booking) => ({
              id: booking.id,
              text: `Turf booking — ${booking.customerName}`,
            })),
        ].slice(0, 4);

        setStats({
          studentCount:
            students.length,

          batchCount:
            batches.size,

          outstandingFees,

          studentsWithOutstanding,

          turfRevenue,

          todayBookingCount:
            todayBookings.length,

          todayBookings:
            todayBookings.slice(0, 4),

          attendancePercentage:
            attendanceStats.percentage,

          presentCount:
            attendanceStats.present,

          totalStudents:
            attendanceStats.total,

          recentActivities,
        });
      } catch (err) {
        console.error(
          "Failed to load dashboard:",
          err,
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDashboard();
  }, [today]);

  return (
    <div>
      <PageHeader
        title="Good morning, Owner"
        description="Here's what's happening at your academy today."
      />

      {isLoading ? (
        <div className="py-10 text-center text-sm text-slate-500">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Students"
              value={stats.studentCount.toString()}
              subtitle={`${stats.batchCount} active batches`}
              icon={Users}
            />

            <StatCard
              title="Pending Fees"
              value={formatCurrency(
                stats.outstandingFees,
              )}
              subtitle={`${stats.studentsWithOutstanding} students`}
              icon={Wallet}
            />

            <StatCard
              title="Today's Turf Revenue"
              value={formatCurrency(
                stats.turfRevenue,
              )}
              subtitle={`${stats.todayBookingCount} bookings`}
              icon={MapPin}
            />

            <StatCard
              title="Today's Attendance"
              value={`${stats.attendancePercentage}%`}
              subtitle={`${stats.presentCount} of ${stats.totalStudents} students`}
              icon={ClipboardCheck}
            />
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900">
                Today&apos;s Turf Bookings
              </h3>

              {stats.todayBookings
                .length === 0 ? (
                <p className="text-sm text-slate-500">
                  No turf bookings scheduled
                  for today.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {stats.todayBookings.map(
                    (booking) => (
                      <li
                        key={booking.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {formatTime(
                              booking.startTime,
                            )}{" "}
                            —{" "}
                            {
                              booking.customerName
                            }
                          </p>

                          <p className="text-xs text-slate-500">
                            {getDuration(
                              booking.startTime,
                              booking.endTime,
                            )}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${paymentStatusStyles[booking.paymentStatus]}`}
                        >
                          {
                            booking.paymentStatus
                          }
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </Card>

            <Card className="p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900">
                Recent Activity
              </h3>

              {stats.recentActivities
                .length === 0 ? (
                <p className="text-sm text-slate-500">
                  No recent activity to
                  show.
                </p>
              ) : (
                <ul className="space-y-3">
                  {stats.recentActivities.map(
                    (activity) => (
                      <li
                        key={activity.id}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />

                        {activity.text}
                      </li>
                    ),
                  )}
                </ul>
              )}
            </Card>
          </div>

          <Card className="p-5">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              Quick Actions
            </h3>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  navigate("/students")
                }
              >
                <UserPlus className="h-4 w-4" />
                Add Student
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  navigate("/fees")
                }
              >
                <Wallet className="h-4 w-4" />
                Collect Fee
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  navigate("/turf")
                }
              >
                <MapPin className="h-4 w-4" />
                New Turf Booking
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  navigate("/attendance")
                }
              >
                <ClipboardCheck className="h-4 w-4" />
                Mark Attendance
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
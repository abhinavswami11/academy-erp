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

type PaymentStatus = "Paid" | "Pending" | "Partial";

interface TurfBooking {
  time: string;
  customer: string;
  duration: string;
  status: PaymentStatus;
}

interface RecentActivity {
  id: string;
  text: string;
}

const turfBookings: TurfBooking[] = [
  { time: "06:00 AM", customer: "Royal XI", duration: "2 hrs", status: "Paid" },
  {
    time: "08:00 AM",
    customer: "Friends Cricket Club",
    duration: "1 hr",
    status: "Pending",
  },
  { time: "05:00 PM", customer: "Titans", duration: "2 hrs", status: "Paid" },
  {
    time: "07:00 PM",
    customer: "Warriors",
    duration: "2 hrs",
    status: "Partial",
  },
];

const recentActivities: RecentActivity[] = [
  { id: "1", text: "Fee collected from Rahul Sharma — ₹2,500" },
  { id: "2", text: "Turf booking added — Royal XI" },
  { id: "3", text: "Attendance marked — Morning Batch" },
  { id: "4", text: "New student added — Arjun Singh" },
];

const statusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Partial: "bg-blue-100 text-blue-700",
};

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Good morning, Owner"
        description="Here's what's happening at your academy today."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Students"
          value="68"
          subtitle="3 active batches"
          icon={Users}
        />
        <StatCard
          title="Pending Fees"
          value="₹42,500"
          subtitle="12 students"
          icon={Wallet}
        />
        <StatCard
          title="Today's Turf Revenue"
          value="₹6,400"
          subtitle="8 bookings"
          icon={MapPin}
        />
        <StatCard
          title="Today's Attendance"
          value="82%"
          subtitle="56 of 68 students"
          icon={ClipboardCheck}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Today&apos;s Turf Bookings
          </h3>
          <ul className="divide-y divide-slate-100">
            {turfBookings.map((booking) => (
              <li
                key={`${booking.time}-${booking.customer}`}
                className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {booking.time} — {booking.customer}
                  </p>
                  <p className="text-xs text-slate-500">{booking.duration}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[booking.status]}`}
                >
                  {booking.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Recent Activity
          </h3>
          <ul className="space-y-3">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-3 text-sm text-slate-600"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {activity.text}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => navigate("/students")}>
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
          <Button variant="secondary" onClick={() => navigate("/fees")}>
            <Wallet className="h-4 w-4" />
            Collect Fee
          </Button>
          <Button variant="secondary" onClick={() => navigate("/turf")}>
            <MapPin className="h-4 w-4" />
            New Turf Booking
          </Button>
          <Button variant="secondary" onClick={() => navigate("/attendance")}>
            <ClipboardCheck className="h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </Card>
    </div>
  );
}

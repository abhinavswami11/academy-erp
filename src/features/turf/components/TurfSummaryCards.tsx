import Card from "../../../components/ui/Card";
import type { TurfBooking } from "../types/turf.types";

interface TurfSummaryCardsProps {
  bookings: TurfBooking[];
  date: string;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function TurfSummaryCards({
  bookings,
  date,
}: TurfSummaryCardsProps) {
  const todayBookings = bookings.filter(
    (booking) =>
      booking.date === date &&
      booking.status === "confirmed",
  );

  const revenue = todayBookings.reduce(
    (total, booking) =>
      total +
      (booking.paymentStatus === "paid"
        ? booking.amount
        : booking.paymentStatus === "partial"
          ? booking.amount / 2
          : 0),
    0,
  );

  const pending = todayBookings.filter(
    (booking) => booking.paymentStatus !== "paid",
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-5">
        <p className="text-sm text-slate-500">
          Today's Bookings
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {todayBookings.length}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-slate-500">
          Today's Revenue
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {formatCurrency(revenue)}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-slate-500">
          Available Slots
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {9 - todayBookings.length}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-slate-500">
          Pending Payments
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {pending}
        </p>
      </Card>
    </div>
  );
}
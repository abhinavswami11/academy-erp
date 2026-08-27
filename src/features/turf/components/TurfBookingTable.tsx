import { CalendarX } from "lucide-react";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import type { TurfBooking } from "../types/turf.types";

interface TurfBookingTableProps {
  bookings: TurfBooking[];
  onCancel: (bookingId: string) => void;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatTime(time: string): string {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

const paymentStyles = {
  paid: "bg-emerald-100 text-emerald-700",
  partial: "bg-amber-100 text-amber-700",
  pending: "bg-red-100 text-red-700",
};

export default function TurfBookingTable({
  bookings,
  onCancel,
}: TurfBookingTableProps) {
  if (bookings.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm text-slate-500">
          No turf bookings found.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">
                Customer
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Time
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Phone
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Amount
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Payment
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Status
              </th>
              <th className="px-4 py-3 font-medium text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {booking.customerName}
                  </p>
                  {booking.notes && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {booking.notes}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {formatTime(booking.startTime)} -{" "}
                  {formatTime(booking.endTime)}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {booking.phone}
                </td>

                <td className="px-4 py-3 font-medium text-slate-900">
                  {formatCurrency(booking.amount)}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${paymentStyles[booking.paymentStatus]}`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {booking.status === "confirmed" && (
                    <Button
                      variant="ghost"
                      className="min-h-9 px-2 py-1 text-red-600"
                      onClick={() => onCancel(booking.id)}
                    >
                      <CalendarX className="h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
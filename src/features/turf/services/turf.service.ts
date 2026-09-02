import { createTransaction } from "../../accounts/services/accounts.service";
import { mockBookings } from "../data/mockBookings";
import type {
  CreateBookingInput,
  TurfBooking,
} from "../types/turf.types";

let bookings: TurfBooking[] = [...mockBookings];

export function getBookings(): TurfBooking[] {
  return [...bookings];
}

export function getBookingsByDate(date: string): TurfBooking[] {
  return bookings.filter(
    (booking) =>
      booking.date === date &&
      booking.status === "confirmed",
  );
}

export function isSlotAvailable(
  date: string,
  startTime: string,
  endTime: string,
): boolean {
  return !bookings.some(
    (booking) =>
      booking.date === date &&
      booking.status === "confirmed" &&
      booking.startTime === startTime &&
      booking.endTime === endTime,
  );
}

export function createBooking(
  input: CreateBookingInput,
): TurfBooking | null {
  if (
    !isSlotAvailable(
      input.date,
      input.startTime,
      input.endTime,
    )
  ) {
    return null;
  }

  const booking: TurfBooking = {
    ...input,
    id: `BOOK-${Date.now()}`,
    status: "confirmed",
  };

  bookings = [booking, ...bookings];

  if (
    input.paymentStatus === "paid" ||
    input.paymentStatus === "partial"
  ) {
    const amount =
      input.paymentStatus === "paid"
        ? input.amount
        : Math.round(input.amount / 2);

    createTransaction({
      type: "income",
      category: "Turf",
      description: `Turf booking — ${input.customerName}`,
      amount,
      date: input.date,
      paymentMethod: input.paymentMethod,
      notes: input.notes,
    });
  }

  return booking;
}

export function cancelBooking(
  bookingId: string,
): boolean {
  const booking = bookings.find(
    (item) => item.id === bookingId,
  );

  if (!booking) {
    return false;
  }

  booking.status = "cancelled";

  return true;
}
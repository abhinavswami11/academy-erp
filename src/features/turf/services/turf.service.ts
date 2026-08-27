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
import { createTransaction } from "../../accounts/services/accounts.service";

import {
  cancelBooking as cancelBookingRepository,
  createBooking as createBookingRepository,
  getBookingById as getBookingByIdRepository,
  getBookings as getBookingsRepository,
  getBookingsByDate as getBookingsByDateRepository,
  isSlotAvailable as isSlotAvailableRepository,
} from "../../../repositories/turf.repository";

import type {
  CreateBookingInput,
  TurfBooking,
} from "../types/turf.types";

export async function getBookings(): Promise<
  TurfBooking[]
> {
  return getBookingsRepository();
}

export async function getBookingsByDate(
  date: string,
): Promise<TurfBooking[]> {
  return getBookingsByDateRepository(
    date,
  );
}

export async function getBookingById(
  bookingId: string,
): Promise<TurfBooking | undefined> {
  return getBookingByIdRepository(
    bookingId,
  );
}

export async function isSlotAvailable(
  date: string,
  startTime: string,
  endTime: string,
): Promise<boolean> {
  return isSlotAvailableRepository(
    date,
    startTime,
    endTime,
  );
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<TurfBooking | null> {
  const booking =
    await createBookingRepository(
      input,
    );

  if (!booking) {
    return null;
  }

  if (
    input.paymentStatus === "paid" ||
    input.paymentStatus === "partial"
  ) {
    const amount =
      input.paymentStatus === "paid"
        ? input.amount
        : Math.round(
            input.amount / 2,
          );

    createTransaction({
      type: "income",
      category: "Turf",
      description: `Turf booking — ${input.customerName}`,
      amount,
      date: input.date,
      paymentMethod:
        input.paymentMethod,
      notes: input.notes,
    });
  }

  return booking;
}

export async function cancelBooking(
  bookingId: string,
): Promise<boolean> {
  return cancelBookingRepository(
    bookingId,
  );
}
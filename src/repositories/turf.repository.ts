import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firestore";
  
  import type {
    CreateBookingInput,
    TurfBooking,
  } from "../features/turf/types/turf.types";
  
  const turfCollection = collection(
    db,
    "turfBookings",
  );
  
  export async function getBookings(): Promise<
    TurfBooking[]
  > {
    const snapshot =
      await getDocs(turfCollection);
  
    return snapshot.docs
      .map(
        (bookingDoc) =>
          ({
            id: bookingDoc.id,
            ...bookingDoc.data(),
          }) as TurfBooking,
      )
      .sort((a, b) => {
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date);
        }
  
        return a.startTime.localeCompare(
          b.startTime,
        );
      });
  }
  
  export async function getBookingsByDate(
    date: string,
  ): Promise<TurfBooking[]> {
    const bookings =
      await getBookings();
  
    return bookings.filter(
      (booking) =>
        booking.date === date &&
        booking.status === "confirmed",
    );
  }
  
  export async function getBookingById(
    bookingId: string,
  ): Promise<TurfBooking | undefined> {
    const bookingRef = doc(
      db,
      "turfBookings",
      bookingId,
    );
  
    const snapshot =
      await getDoc(bookingRef);
  
    if (!snapshot.exists()) {
      return undefined;
    }
  
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as TurfBooking;
  }
  
  export async function isSlotAvailable(
    date: string,
    startTime: string,
    endTime: string,
  ): Promise<boolean> {
    const bookings =
      await getBookingsByDate(date);
  
    return !bookings.some(
      (booking) =>
        booking.startTime === startTime &&
        booking.endTime === endTime,
    );
  }
  
  export async function createBooking(
    input: CreateBookingInput,
  ): Promise<TurfBooking | null> {
    const available =
      await isSlotAvailable(
        input.date,
        input.startTime,
        input.endTime,
      );
  
    if (!available) {
      return null;
    }
  
    const bookingRef = doc(
      turfCollection,
    );
  
    // Build the Firestore object without
    // undefined optional values.
    const bookingData: Omit<
      TurfBooking,
      "id"
    > = input.studentId
      ? {
          ...input,
          studentId: input.studentId,
          status: "confirmed",
        }
      : {
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
          customerName: input.customerName,
          phone: input.phone,
          amount: input.amount,
          paymentStatus: input.paymentStatus,
          paymentMethod: input.paymentMethod,
          status: "confirmed",
          notes: input.notes,
        };
  
    await setDoc(
      bookingRef,
      bookingData,
    );
  
    return {
      id: bookingRef.id,
      ...bookingData,
    };
  }
  
  export async function cancelBooking(
    bookingId: string,
  ): Promise<boolean> {
    const booking =
      await getBookingById(bookingId);
  
    if (!booking) {
      return false;
    }
  
    const bookingRef = doc(
      db,
      "turfBookings",
      bookingId,
    );
  
    await updateDoc(
      bookingRef,
      {
        status: "cancelled",
      },
    );
  
    return true;
  }
  
  export async function deleteBooking(
    bookingId: string,
  ): Promise<void> {
    const bookingRef = doc(
      db,
      "turfBookings",
      bookingId,
    );
  
    await deleteDoc(bookingRef);
  }
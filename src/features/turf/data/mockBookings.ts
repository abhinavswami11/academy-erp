import type { TurfBooking } from "../types/turf.types";

export const timeSlots = [
  {
    startTime: "06:00",
    endTime: "07:00",
    label: "6:00 AM - 7:00 AM",
  },
  {
    startTime: "07:00",
    endTime: "08:00",
    label: "7:00 AM - 8:00 AM",
  },
  {
    startTime: "08:00",
    endTime: "09:00",
    label: "8:00 AM - 9:00 AM",
  },
  {
    startTime: "09:00",
    endTime: "10:00",
    label: "9:00 AM - 10:00 AM",
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    label: "4:00 PM - 5:00 PM",
  },
  {
    startTime: "17:00",
    endTime: "18:00",
    label: "5:00 PM - 6:00 PM",
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    label: "6:00 PM - 7:00 PM",
  },
  {
    startTime: "19:00",
    endTime: "20:00",
    label: "7:00 PM - 8:00 PM",
  },
  {
    startTime: "20:00",
    endTime: "21:00",
    label: "8:00 PM - 9:00 PM",
  },
];

export const mockBookings: TurfBooking[] = [
  {
    id: "BOOK-001",
    date: "2026-08-27",
    startTime: "17:00",
    endTime: "18:00",
    customerName: "Arjun Singh",
    phone: "9876543210",
    studentId: "STU-001",
    amount: 500,
    paymentStatus: "paid",
    paymentMethod: "UPI",
    status: "confirmed",
    notes: "",
  },
  {
    id: "BOOK-002",
    date: "2026-08-27",
    startTime: "19:00",
    endTime: "20:00",
    customerName: "Rohan Kumar",
    phone: "9876543211",
    amount: 500,
    paymentStatus: "pending",
    paymentMethod: "Cash",
    status: "confirmed",
    notes: "Evening practice",
  },
  {
    id: "BOOK-003",
    date: "2026-08-28",
    startTime: "07:00",
    endTime: "08:00",
    customerName: "Priya Sharma",
    phone: "9876543212",
    studentId: "STU-002",
    amount: 500,
    paymentStatus: "paid",
    paymentMethod: "UPI",
    status: "confirmed",
    notes: "",
  },
];
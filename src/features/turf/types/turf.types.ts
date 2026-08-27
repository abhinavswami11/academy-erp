export type BookingStatus = "confirmed" | "cancelled";

export type PaymentStatus = "paid" | "pending" | "partial";

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Bank Transfer"
  | "Other";

export interface TurfBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  phone: string;
  studentId?: string;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  notes: string;
}

export interface CreateBookingInput {
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  phone: string;
  studentId?: string;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes: string;
}
export type FeeStatus =
  | "paid"
  | "partial"
  | "pending"
  | "overdue";

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Bank Transfer"
  | "Other";

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  month: number;
  year: number;
  amountDue: number;
  amountPaid: number;
  status: FeeStatus;
}

export interface FeePayment {
  id: string;
  feeId: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  notes: string;
}
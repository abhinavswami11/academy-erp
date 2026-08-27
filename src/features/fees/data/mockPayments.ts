import type { FeePayment } from "../types/fee.types";

export const mockPayments: FeePayment[] = [
  {
    id: "PAY-001",
    feeId: "FEE-001",
    studentId: "STU-001",
    amount: 5000,
    paymentDate: "2026-08-05",
    paymentMethod: "UPI",
    notes: "Monthly academy fee",
  },
  {
    id: "PAY-002",
    feeId: "FEE-002",
    studentId: "STU-002",
    amount: 3000,
    paymentDate: "2026-08-07",
    paymentMethod: "Cash",
    notes: "Partial payment",
  },
];
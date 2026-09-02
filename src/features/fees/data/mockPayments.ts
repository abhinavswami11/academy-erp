import type { FeePayment } from "../types/fee.types";

export const mockPayments: FeePayment[] = [
  {
    id: "PAY-001",
    feeId: "FEE-001",
    studentId: "stu-001",
    amount: 3500,
    paymentDate: "2026-08-05",
    paymentMethod: "UPI",
    notes: "Monthly academy fee",
  },
  {
    id: "PAY-002",
    feeId: "FEE-002",
    studentId: "stu-002",
    amount: 1500,
    paymentDate: "2026-08-07",
    paymentMethod: "Cash",
    notes: "Partial payment",
  },
];

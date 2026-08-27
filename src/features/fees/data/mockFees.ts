import type { FeeRecord } from "../types/fee.types";

export const mockFees: FeeRecord[] = [
  {
    id: "FEE-001",
    studentId: "STU-001",
    studentName: "Aarav Sharma",
    month: 8,
    year: 2026,
    amountDue: 5000,
    amountPaid: 5000,
    status: "paid",
  },
  {
    id: "FEE-002",
    studentId: "STU-002",
    studentName: "Rohan Kumar",
    month: 8,
    year: 2026,
    amountDue: 5000,
    amountPaid: 3000,
    status: "partial",
  },
  {
    id: "FEE-003",
    studentId: "STU-003",
    studentName: "Arjun Singh",
    month: 8,
    year: 2026,
    amountDue: 5000,
    amountPaid: 0,
    status: "pending",
  },
  {
    id: "FEE-004",
    studentId: "STU-004",
    studentName: "Vivek Meena",
    month: 8,
    year: 2026,
    amountDue: 5000,
    amountPaid: 0,
    status: "overdue",
  },
];
import type { FeeRecord } from "../types/fee.types";

export const mockFees: FeeRecord[] = [
  {
    id: "FEE-001",
    studentId: "stu-001",
    studentName: "Arjun Singh",
    month: 8,
    year: 2026,
    amountDue: 3500,
    amountPaid: 3500,
    status: "paid",
  },
  {
    id: "FEE-002",
    studentId: "stu-002",
    studentName: "Priya Sharma",
    month: 8,
    year: 2026,
    amountDue: 3000,
    amountPaid: 1500,
    status: "partial",
  },
  {
    id: "FEE-003",
    studentId: "stu-003",
    studentName: "Rahul Verma",
    month: 8,
    year: 2026,
    amountDue: 3500,
    amountPaid: 0,
    status: "pending",
  },
  {
    id: "FEE-004",
    studentId: "stu-004",
    studentName: "Ananya Patel",
    month: 8,
    year: 2026,
    amountDue: 2500,
    amountPaid: 0,
    status: "overdue",
  },
];

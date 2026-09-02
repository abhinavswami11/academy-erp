import { createTransaction } from "../../accounts/services/accounts.service";
import { mockFees } from "../data/mockFees";
import { mockPayments } from "../data/mockPayments";
import type { FeePayment, FeeRecord } from "../types/fee.types";

let fees: FeeRecord[] = [...mockFees];
let payments: FeePayment[] = [...mockPayments];

export function getFees(): FeeRecord[] {
  return [...fees];
}

export function getPayments(): FeePayment[] {
  return [...payments];
}

export function getFeesByStudentId(studentId: string): FeeRecord[] {
  return fees.filter((fee) => fee.studentId === studentId);
}

export function getPaymentsByFeeId(feeId: string): FeePayment[] {
  return payments.filter((payment) => payment.feeId === feeId);
}

export function calculateFeeStatus(
  amountDue: number,
  amountPaid: number,
): FeeRecord["status"] {
  if (amountPaid >= amountDue) {
    return "paid";
  }

  if (amountPaid > 0) {
    return "partial";
  }

  return "pending";
}

export function createFeeForStudent(
  studentId: string,
  studentName: string,
  monthlyFee: number,
): FeeRecord {
  const now = new Date();

  const fee: FeeRecord = {
    id: `FEE-${Date.now()}`,
    studentId,
    studentName,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    amountDue: monthlyFee,
    amountPaid: 0,
    status: "pending",
  };

  fees = [fee, ...fees];

  return fee;
}

export function recordPayment(payment: FeePayment): FeeRecord | null {
  if (payment.amount <= 0) {
    return null;
  }

  const feeIndex = fees.findIndex((item) => item.id === payment.feeId);

  if (feeIndex < 0) {
    return null;
  }

  const fee = fees[feeIndex];
  const newAmountPaid = fee.amountPaid + payment.amount;

  if (newAmountPaid > fee.amountDue) {
    return null;
  }

  const updatedFee: FeeRecord = {
    ...fee,
    amountPaid: newAmountPaid,
    status: calculateFeeStatus(fee.amountDue, newAmountPaid),
  };

  fees = fees.map((item) =>
    item.id === updatedFee.id ? updatedFee : item,
  );

  payments = [...payments, payment];

  createTransaction({
    type: "income",
    category: "Student Fees",
    description: `Fee payment — ${fee.studentName}`,
    amount: payment.amount,
    date: payment.paymentDate,
    paymentMethod: payment.paymentMethod,
    notes: payment.notes,
  });

  return updatedFee;
}

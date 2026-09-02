import {
  createFee as createFeeRepository,
  createMonthlyFee as createMonthlyFeeRepository,
  createPayment as createPaymentRepository,
  getFeeById as getFeeByIdRepository,
  getFees as getFeesRepository,
  getFeesByStudentId as getFeesByStudentIdRepository,
  getPayments as getPaymentsRepository,
  getPaymentsByFeeId as getPaymentsByFeeIdRepository,
  updateFee as updateFeeRepository,
} from "../../../repositories/fee.repository";
import type {
  FeePayment,
  FeeRecord,
} from "../types/fee.types";

export async function getFees(): Promise<
  FeeRecord[]
> {
  return getFeesRepository();
}

export async function getFeesByStudentId(
  studentId: string,
): Promise<FeeRecord[]> {
  return getFeesByStudentIdRepository(
    studentId,
  );
}

export async function getFeeById(
  feeId: string,
): Promise<FeeRecord | undefined> {
  return getFeeByIdRepository(feeId);
}

export async function getPaymentsByFeeId(
  feeId: string,
): Promise<FeePayment[]> {
  return getPaymentsByFeeIdRepository(
    feeId,
  );
}

export async function getPayments(): Promise<
  FeePayment[]
> {
  return getPaymentsRepository();
}

export async function createFee(
  fee: Omit<FeeRecord, "id">,
): Promise<FeeRecord> {
  return createFeeRepository(fee);
}

export async function createMonthlyFee(
  studentId: string,
  studentName: string,
  monthlyFee: number,
  month: number,
  year: number,
): Promise<FeeRecord> {
  return createMonthlyFeeRepository(
    studentId,
    studentName,
    monthlyFee,
    month,
    year,
  );
}

export async function updateFee(
  feeId: string,
  data: Partial<
    Omit<FeeRecord, "id">
  >,
): Promise<void> {
  return updateFeeRepository(
    feeId,
    data,
  );
}

export async function recordPayment(
  fee: FeeRecord,
  amount: number,
  paymentDate: string,
  paymentMethod: FeePayment["paymentMethod"],
  notes: string,
): Promise<FeePayment> {
  const newAmountPaid =
    fee.amountPaid + amount;

  let status: FeeRecord["status"];

  if (
    newAmountPaid >= fee.amountDue
  ) {
    status = "paid";
  } else if (newAmountPaid > 0) {
    status = "partial";
  } else {
    status = "pending";
  }

  const payment =
    await createPaymentRepository({
      feeId: fee.id,
      studentId: fee.studentId,
      amount,
      paymentDate,
      paymentMethod,
      notes,
    });

  await updateFeeRepository(
    fee.id,
    {
      amountPaid: newAmountPaid,
      status,
    },
  );

  return payment;
}

export async function ensureCurrentMonthFees(
  students: Array<{
    id: string;
    fullName: string;
    monthlyFee: number;
    status: string;
  }>,
): Promise<FeeRecord[]> {
  const today = new Date();

  const month =
    today.getMonth() + 1;

  const year =
    today.getFullYear();

  const existingFees =
    await getFeesRepository();

  const currentMonthFees =
    existingFees.filter(
      (fee) =>
        fee.month === month &&
        fee.year === year,
    );

  const existingStudentIds =
    new Set(
      currentMonthFees.map(
        (fee) => fee.studentId,
      ),
    );

  const activeStudents =
    students.filter(
      (student) =>
        student.status === "active",
    );

  const missingStudents =
    activeStudents.filter(
      (student) =>
        !existingStudentIds.has(
          student.id,
        ),
    );

  if (
    missingStudents.length === 0
  ) {
    return currentMonthFees;
  }

  const newFees =
    await Promise.all(
      missingStudents.map(
        (student) =>
          createMonthlyFeeRepository(
            student.id,
            student.fullName,
            student.monthlyFee,
            month,
            year,
          ),
      ),
    );

  return [
    ...currentMonthFees,
    ...newFees,
  ];
}
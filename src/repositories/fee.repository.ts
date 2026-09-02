import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firestore";
  
  import type {
    FeePayment,
    FeeRecord,
  } from "../features/fees/types/fee.types";
  
  const feesCollection = collection(db, "fees");
  
  const paymentsCollection = collection(
    db,
    "feePayments",
  );
  
  export function getMonthlyFeeId(
    studentId: string,
    month: number,
    year: number,
  ): string {
    return `${studentId}_${year}_${String(month).padStart(
      2,
      "0",
    )}`;
  }
  
  export async function getFees(): Promise<
    FeeRecord[]
  > {
    const snapshot = await getDocs(
      feesCollection,
    );
  
    return snapshot.docs.map((feeDoc) => ({
      id: feeDoc.id,
      ...feeDoc.data(),
    })) as FeeRecord[];
  }
  
  export async function getFeesByStudentId(
    studentId: string,
  ): Promise<FeeRecord[]> {
    const feesQuery = query(
      feesCollection,
      where("studentId", "==", studentId),
    );
  
    const snapshot = await getDocs(
      feesQuery,
    );
  
    return snapshot.docs.map((feeDoc) => ({
      id: feeDoc.id,
      ...feeDoc.data(),
    })) as FeeRecord[];
  }
  
  export async function getFeeById(
    feeId: string,
  ): Promise<FeeRecord | undefined> {
    const feeRef = doc(
      db,
      "fees",
      feeId,
    );
  
    const snapshot = await getDoc(
      feeRef,
    );
  
    if (!snapshot.exists()) {
      return undefined;
    }
  
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as FeeRecord;
  }
  
  export async function createFee(
    fee: Omit<FeeRecord, "id">,
  ): Promise<FeeRecord> {
    const feeId = getMonthlyFeeId(
      fee.studentId,
      fee.month,
      fee.year,
    );
  
    const feeRef = doc(
      db,
      "fees",
      feeId,
    );
  
    await setDoc(feeRef, fee);
  
    return {
      id: feeId,
      ...fee,
    };
  }
  
  export async function createMonthlyFee(
    studentId: string,
    studentName: string,
    monthlyFee: number,
    month: number,
    year: number,
  ): Promise<FeeRecord> {
    const feeId = getMonthlyFeeId(
      studentId,
      month,
      year,
    );
  
    const feeRef = doc(
      db,
      "fees",
      feeId,
    );
  
    const existingFee =
      await getDoc(feeRef);
  
    if (existingFee.exists()) {
      return {
        id: existingFee.id,
        ...existingFee.data(),
      } as FeeRecord;
    }
  
    const fee: Omit<FeeRecord, "id"> = {
      studentId,
      studentName,
      month,
      year,
      amountDue: monthlyFee,
      amountPaid: 0,
      status: "pending",
    };
  
    await setDoc(feeRef, fee);
  
    return {
      id: feeId,
      ...fee,
    };
  }
  
  export async function updateFee(
    feeId: string,
    data: Partial<
      Omit<FeeRecord, "id">
    >,
  ): Promise<void> {
    const feeRef = doc(
      db,
      "fees",
      feeId,
    );
  
    await updateDoc(
      feeRef,
      data,
    );
  }
  
  export async function getPaymentsByFeeId(
    feeId: string,
  ): Promise<FeePayment[]> {
    const paymentsQuery = query(
      paymentsCollection,
      where("feeId", "==", feeId),
    );
  
    const snapshot = await getDocs(
      paymentsQuery,
    );
  
    return snapshot.docs.map(
      (paymentDoc) => ({
        id: paymentDoc.id,
        ...paymentDoc.data(),
      }),
    ) as FeePayment[];
  }
  
  export async function createPayment(
    payment: Omit<FeePayment, "id">,
  ): Promise<FeePayment> {
    const paymentRef =
      await addDoc(
        paymentsCollection,
        payment,
      );
  
    return {
      id: paymentRef.id,
      ...payment,
    };
  }
  
  export async function getPayments(): Promise<
    FeePayment[]
  > {
    const snapshot = await getDocs(
      paymentsCollection,
    );
  
    return snapshot.docs.map(
      (paymentDoc) => ({
        id: paymentDoc.id,
        ...paymentDoc.data(),
      }),
    ) as FeePayment[];
  }
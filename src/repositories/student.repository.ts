import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    writeBatch,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firestore";
  
  import type {
    CreateStudentInput,
    Student,
  } from "../features/students/types/student.types";
  
  import {
    getMonthlyFeeId,
  } from "./fee.repository";
  
  const studentsCollection =
    collection(db, "students");
  
  const feesCollection =
    collection(db, "fees");
  
  export async function getStudents(): Promise<
    Student[]
  > {
    const studentsQuery = query(
      studentsCollection,
      orderBy("fullName"),
    );
  
    const snapshot =
      await getDocs(studentsQuery);
  
    return snapshot.docs.map(
      (studentDoc) => ({
        id: studentDoc.id,
        ...studentDoc.data(),
      }),
    ) as Student[];
  }
  
  export async function getStudentById(
    id: string,
  ): Promise<Student | undefined> {
    const studentRef = doc(
      db,
      "students",
      id,
    );
  
    const snapshot =
      await getDoc(studentRef);
  
    if (!snapshot.exists()) {
      return undefined;
    }
  
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Student;
  }
  
  export async function createStudent(
    input: CreateStudentInput,
  ): Promise<Student> {
    const studentRef = doc(
      studentsCollection,
    );
  
    const studentData: Omit<
      Student,
      "id"
    > = {
      ...input,
      status: "active",
    };
  
    const today = new Date();
  
    const month =
      today.getMonth() + 1;
  
    const year =
      today.getFullYear();
  
    const feeId =
      getMonthlyFeeId(
        studentRef.id,
        month,
        year,
      );
  
    const feeRef = doc(
      feesCollection,
      feeId,
    );
  
    const feeData = {
      studentId: studentRef.id,
      studentName: input.fullName,
      month,
      year,
      amountDue: input.monthlyFee,
      amountPaid: 0,
      status: "pending" as const,
    };
  
    const batch =
      writeBatch(db);
  
    batch.set(
      studentRef,
      studentData,
    );
  
    batch.set(
      feeRef,
      feeData,
    );
  
    await batch.commit();
  
    return {
      id: studentRef.id,
      ...studentData,
    };
  }
  
  export async function updateStudent(
    id: string,
    data: Partial<CreateStudentInput>,
  ): Promise<void> {
    const studentRef = doc(
      db,
      "students",
      id,
    );
  
    await updateDoc(
      studentRef,
      data,
    );
  }
  
  export async function deleteStudent(
    id: string,
  ): Promise<void> {
    const studentRef = doc(
      db,
      "students",
      id,
    );
  
    await deleteDoc(
      studentRef,
    );
  }
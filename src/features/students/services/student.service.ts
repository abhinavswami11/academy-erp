import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firestore";

import type {
  CreateStudentInput,
  Student,
} from "../../students/types/student.types";

const studentsCollection = collection(db, "students");

export async function getStudents(): Promise<Student[]> {
  const studentsQuery = query(
    studentsCollection,
    orderBy("fullName"),
  );

  const snapshot = await getDocs(studentsQuery);

  return snapshot.docs.map((studentDoc) => ({
    id: studentDoc.id,
    ...studentDoc.data(),
  })) as Student[];
}

export async function getStudentById(
  id: string,
): Promise<Student | undefined> {
  const studentRef = doc(db, "students", id);
  const snapshot = await getDoc(studentRef);

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
  const studentData: Omit<Student, "id"> = {
    ...input,
    status: "active",
  };

  const studentRef = await addDoc(
    studentsCollection,
    studentData,
  );

  return {
    id: studentRef.id,
    ...studentData,
  };
}

export async function updateStudent(
  id: string,
  data: Partial<CreateStudentInput>,
): Promise<void> {
  const studentRef = doc(db, "students", id);

  await updateDoc(studentRef, data);
}

export async function deleteStudent(
  id: string,
): Promise<void> {
  const studentRef = doc(db, "students", id);

  await deleteDoc(studentRef);
}
import { mockStudents } from "../data/mockStudents";
import type { CreateStudentInput, Student } from "../types/student.types";

let students: Student[] = [...mockStudents];

export function getStudents(): Student[] {
  return [...students];
}

export function getStudentById(id: string): Student | undefined {
  return students.find((student) => student.id === id);
}

export function createStudent(input: CreateStudentInput): Student {
  const student: Student = {
    ...input,
    id: crypto.randomUUID(),
    status: "active",
  };
  students = [student, ...students];
  return student;
}

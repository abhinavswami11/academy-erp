export type StudentStatus = "active" | "inactive" | "left";

export type StudentGender = "male" | "female" | "other";

export interface Student {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: StudentGender | "";
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  joiningDate: string;
  batch: string;
  coach: string;
  status: StudentStatus;
  hostelResident: boolean;
  monthlyFee: number;
}

export interface CreateStudentInput {
  fullName: string;
  dateOfBirth: string;
  gender: StudentGender | "";
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  joiningDate: string;
  batch: string;
  coach: string;
  hostelResident: boolean;
  monthlyFee: number;
}

export type StatusFilter = "all" | StudentStatus;

export type HostelFilter = "all" | "hostel" | "non-hostel";

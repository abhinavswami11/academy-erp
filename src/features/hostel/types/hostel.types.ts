export type HostelStatus = "occupied" | "vacated";

export interface HostelAllocation {
  id: string;
  studentId: string;
  studentName: string;
  batch: string;
  roomNumber: string;
  bedNumber: string;
  allocationDate: string;
  status: HostelStatus;
}

export interface HostelBed {
  roomNumber: string;
  bedNumber: string;
  occupied: boolean;
  studentId?: string;
}
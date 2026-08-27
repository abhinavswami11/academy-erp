import { mockHostelAllocations } from "../data/mockHostel";
import type { HostelAllocation } from "../types/hostel.types";

let allocations: HostelAllocation[] = [
  ...mockHostelAllocations,
];

export const TOTAL_BEDS = 40;

export function getAllocations(): HostelAllocation[] {
  return [...allocations];
}
export function allocateStudent(
  allocation: HostelAllocation,
): HostelAllocation {
  allocations = [
    allocation,
    ...allocations.filter(
      (item) => item.studentId !== allocation.studentId,
    ),
  ];

  return allocation;
}

export function vacateStudent(
  allocationId: string,
): void {
  allocations = allocations.map((allocation) =>
    allocation.id === allocationId
      ? {
          ...allocation,
          status: "vacated",
        }
      : allocation,
  );
}

// export function getOccupiedBeds(): number {
//   return allocations.filter(
//     (allocation) => allocation.status === "occupied",
//   ).length;
// }
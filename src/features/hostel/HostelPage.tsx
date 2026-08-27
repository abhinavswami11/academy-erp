import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";

import HostelSummaryCards from "./components/HostelSummaryCards";
import HostelAllocationForm from "./components/HostelAllocationForm";
import HostelTable from "./components/HostelTable";

import {
  allocateStudent,
  getAllocations,
  TOTAL_BEDS,
  vacateStudent,
} from "./services/hostel.service";

import type { HostelAllocation } from "./types/hostel.types";

export default function HostelPage() {
  const [allocations, setAllocations] =
    useState<HostelAllocation[]>(
      () => getAllocations(),
    );

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const occupiedBeds = useMemo(
    () =>
      allocations.filter(
        (allocation) =>
          allocation.status === "occupied",
      ).length,
    [allocations],
  );

  const filteredAllocations = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return allocations.filter(
      (allocation) =>
        allocation.status === "occupied" &&
        (query.length === 0 ||
          allocation.studentName
            .toLowerCase()
            .includes(query) ||
          allocation.batch
            .toLowerCase()
            .includes(query) ||
          allocation.roomNumber
            .toLowerCase()
            .includes(query)),
    );
  }, [allocations, search]);

  function handleAllocate(
    allocation: HostelAllocation,
  ) {
    const occupied = allocations.some(
      (item) =>
        item.status === "occupied" &&
        item.roomNumber ===
          allocation.roomNumber &&
        item.bedNumber ===
          allocation.bedNumber,
    );

    if (occupied) {
      window.alert(
        "This bed is already occupied.",
      );
      return;
    }

    allocateStudent(allocation);

    setAllocations(getAllocations());
    setShowForm(false);
  }

  function handleVacate(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to vacate this bed?",
    );

    if (!confirmed) {
      return;
    }

    vacateStudent(id);
    setAllocations(getAllocations());
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Hostel"
          description="Manage hostel residents, rooms, and bed allocations."
        />

        <Button
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4" />
          Allocate Bed
        </Button>
      </div>

      <div className="space-y-6">
        <HostelSummaryCards
          totalBeds={TOTAL_BEDS}
          occupiedBeds={occupiedBeds}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search student, batch or room..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary sm:max-w-md"
          />
        </div>

        <HostelTable
          allocations={filteredAllocations}
          onVacate={handleVacate}
        />
      </div>

      {showForm && (
        <HostelAllocationForm
          onSubmit={handleAllocate}
          onClose={() =>
            setShowForm(false)
          }
        />
      )}
    </div>
  );
}
import type { FeeStatus } from "../types/fee.types";

interface FeeFiltersProps {
  search: string;
  status: FeeStatus | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: FeeStatus | "all") => void;
}

export default function FeeFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FeeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search student..."
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 sm:max-w-sm"
      />

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target.value as FeeStatus | "all"
          )
        }
        className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
      >
        <option value="all">All Status</option>
        <option value="paid">Paid</option>
        <option value="partial">Partial</option>
        <option value="pending">Pending</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  );
}
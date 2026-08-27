import { Search } from "lucide-react";
import type { HostelFilter, StatusFilter } from "../types/student.types";

interface StudentFiltersProps {
  search: string;
  statusFilter: StatusFilter;
  hostelFilter: HostelFilter;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onHostelFilterChange: (value: HostelFilter) => void;
}

const selectClassName =
  "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default function StudentFilters({
  search,
  statusFilter,
  hostelFilter,
  onSearchChange,
  onStatusFilterChange,
  onHostelFilterChange,
}: StudentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative min-w-0 flex-1 sm:max-w-xs">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search students..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value as StatusFilter)
        }
        className={selectClassName}
        aria-label="Filter by status"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="left">Left</option>
      </select>

      <select
        value={hostelFilter}
        onChange={(event) =>
          onHostelFilterChange(event.target.value as HostelFilter)
        }
        className={selectClassName}
        aria-label="Filter by hostel"
      >
        <option value="all">All Students</option>
        <option value="hostel">Hostel</option>
        <option value="non-hostel">Non-hostel</option>
      </select>
    </div>
  );
}

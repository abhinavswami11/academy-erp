interface TurfFiltersProps {
    date: string;
    search: string;
    onDateChange: (date: string) => void;
    onSearchChange: (search: string) => void;
  }
  
  export default function TurfFilters({
    date,
    search,
    onDateChange,
    onSearchChange,
  }: TurfFiltersProps) {
    return (
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="turf-date"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Date
          </label>
  
          <input
            id="turf-date"
            type="date"
            value={date}
            onChange={(event) =>
              onDateChange(event.target.value)
            }
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
  
        <div>
          <label
            htmlFor="turf-search"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Search
          </label>
  
          <input
            id="turf-search"
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search customer or phone..."
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    );
  }
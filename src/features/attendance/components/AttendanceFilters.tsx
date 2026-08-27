import { batchOptions } from "../../students/data/mockStudents";

interface AttendanceFiltersProps {
  date: string;
  batch: string;
  onDateChange: (date: string) => void;
  onBatchChange: (batch: string) => void;
}

export default function AttendanceFilters({
  date,
  batch,
  onDateChange,
  onBatchChange,
}: AttendanceFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="attendance-date"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Date
        </label>

        <input
          id="attendance-date"
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label
          htmlFor="attendance-batch"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Batch
        </label>

        <select
          id="attendance-batch"
          value={batch}
          onChange={(event) => onBatchChange(event.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">All Batches</option>

          {batchOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
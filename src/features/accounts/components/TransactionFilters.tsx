import type {
    TransactionCategory,
    TransactionType,
  } from "../types/accounts.types";
  
  interface TransactionFiltersProps {
    search: string;
    type: TransactionType | "all";
    category: TransactionCategory | "all";
    onSearchChange: (value: string) => void;
    onTypeChange: (value: TransactionType | "all") => void;
    onCategoryChange: (
      value: TransactionCategory | "all",
    ) => void;
  }
  
  const categories: TransactionCategory[] = [
    "Student Fees",
    "Turf",
    "Salary",
    "Hostel",
    "Equipment",
    "Maintenance",
    "Food",
    "Utilities",
    "Other",
  ];
  
  export default function TransactionFilters({
    search,
    type,
    category,
    onSearchChange,
    onTypeChange,
    onCategoryChange,
  }: TransactionFiltersProps) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
        />
  
        <select
          value={type}
          onChange={(event) =>
            onTypeChange(
              event.target.value as TransactionType | "all",
            )
          }
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
  
        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value as TransactionCategory | "all",
            )
          }
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
        >
          <option value="all">All Categories</option>
  
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
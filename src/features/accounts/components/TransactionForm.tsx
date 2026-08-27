import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

import Button from "../../../components/ui/Button";

import type {
  CreateTransactionInput,
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "../types/accounts.types";

interface TransactionFormProps {
  onSubmit: (input: CreateTransactionInput) => void;
  onClose: () => void;
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

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function TransactionForm({
  onSubmit,
  onClose,
}: TransactionFormProps) {
  const [type, setType] =
    useState<TransactionType>("income");

  const [category, setCategory] =
    useState<TransactionCategory>("Student Fees");

  const [description, setDescription] = useState("");

  const [amount, setAmount] = useState("");

  const [date, setDate] = useState(getToday);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Cash");

  const [notes, setNotes] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!description.trim()) {
      window.alert("Description is required.");
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      window.alert("Enter a valid amount.");
      return;
    }

    onSubmit({
      type,
      category,
      description: description.trim(),
      amount: numericAmount,
      date,
      paymentMethod,
      notes: notes.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Add Transaction
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-5"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Transaction Type *
            </label>

            <select
              value={type}
              onChange={(event) =>
                setType(
                  event.target.value as TransactionType,
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Category *
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value as TransactionCategory,
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description *
            </label>

            <input
              type="text"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="e.g. Monthly fee - Rahul"
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Amount *
              </label>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                placeholder="0"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date *
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Payment Method *
            </label>

            <select
              value={paymentMethod}
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value as PaymentMethod,
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">
                Bank Transfer
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              rows={3}
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              placeholder="Optional notes..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
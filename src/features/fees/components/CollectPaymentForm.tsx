import { useState } from "react";

import type {
  FeePayment,
  FeeRecord,
  PaymentMethod,
} from "../types/fee.types";

interface CollectPaymentFormProps {
  fees: FeeRecord[];
  selectedFee: FeeRecord | null;
  onFeeChange: (fee: FeeRecord) => void;
  onSubmit: (payment: FeePayment) => void;
  onCancel: () => void;
}

export default function CollectPaymentForm({
  fees,
  selectedFee,
  onFeeChange,
  onSubmit,
  onCancel,
}: CollectPaymentFormProps) {
  const balance = selectedFee
    ? Math.max(
        selectedFee.amountDue - selectedFee.amountPaid,
        0
      )
    : 0;

  const [amount, setAmount] = useState(balance);
  const [method, setMethod] =
    useState<PaymentMethod>("Cash");
  const [notes, setNotes] = useState("");

  const handleFeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const fee = fees.find(
      (item) => item.id === event.target.value
    );

    if (fee) {
      onFeeChange(fee);
      setAmount(
        Math.max(fee.amountDue - fee.amountPaid, 0)
      );
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFee) {
      window.alert("Please select a student.");
      return;
    }

    if (amount <= 0 || amount > balance) {
      window.alert(
        `Enter an amount between ₹1 and ₹${balance}.`
      );
      return;
    }

    const payment: FeePayment = {
      id: `PAY-${Date.now()}`,
      feeId: selectedFee.id,
      studentId: selectedFee.studentId,
      amount,
      paymentDate: new Date()
        .toISOString()
        .split("T")[0],
      paymentMethod: method,
      notes,
    };

    onSubmit(payment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Collect Payment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Record a payment for a student's outstanding fee.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Student */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Student
            </label>

            <select
              value={selectedFee?.id ?? ""}
              onChange={handleFeeChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-slate-400"
            >
              <option value="" disabled>
                Select student
              </option>

              {fees.map((fee) => {
                const outstanding =
                  fee.amountDue - fee.amountPaid;

                return (
                  <option key={fee.id} value={fee.id}>
                    {fee.studentName} — ₹
                    {Math.max(
                      outstanding,
                      0
                    ).toLocaleString("en-IN")}{" "}
                    outstanding
                  </option>
                );
              })}
            </select>
          </div>

          {/* Outstanding */}
          {selectedFee && (
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-sm text-slate-600">
                Outstanding
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                ₹{balance.toLocaleString("en-IN")}
              </p>
            </div>
          )}

          {/* Amount */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Amount
            </label>

            <input
              type="number"
              min="1"
              max={balance}
              value={amount}
              disabled={!selectedFee}
              onChange={(event) =>
                setAmount(Number(event.target.value))
              }
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-slate-400 disabled:bg-slate-50"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Payment Method
            </label>

            <select
              value={method}
              onChange={(event) =>
                setMethod(
                  event.target.value as PaymentMethod
                )
              }
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-slate-400"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">
                Bank Transfer
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows={3}
              placeholder="Optional notes..."
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-slate-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedFee}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
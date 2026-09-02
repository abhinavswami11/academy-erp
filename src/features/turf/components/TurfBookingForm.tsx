import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

import Button from "../../../components/ui/Button";
import { getStudents } from "../../students/services/student.service";
import { timeSlots } from "../data/mockBookings";

import type {
  CreateBookingInput,
  PaymentMethod,
  PaymentStatus,
} from "../types/turf.types";

interface TurfBookingFormProps {
  date: string;
  onSubmit: (input: CreateBookingInput) => void;
  onClose: () => void;
}

export default function TurfBookingForm({
  date,
  onSubmit,
  onClose,
}: TurfBookingFormProps) {
  const students = getStudents();

  const [studentId, setStudentId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState(timeSlots[0]);
  const [amount, setAmount] = useState("500");
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("pending");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Cash");
  const [notes, setNotes] = useState("");

  function handleStudentChange(id: string) {
    setStudentId(id);

    const student = students.find(
      (item) => item.id === id,
    );

    if (student) {
      setCustomerName(student.fullName);
      setPhone(student.phone);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!customerName.trim()) {
      window.alert("Customer name is required.");
      return;
    }

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      window.alert("Enter a valid booking amount.");
      return;
    }

    const booking: CreateBookingInput = {
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      customerName: customerName.trim(),
      phone: phone.trim(),
      studentId: studentId || undefined,
      amount: numericAmount,
      paymentStatus,
      paymentMethod,
      notes: notes.trim(),
    };

    onSubmit(booking);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              New Turf Booking
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Booking for {date}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-6 py-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Student
            </label>

            <select
              value={studentId}
              onChange={(event) =>
                handleStudentChange(event.target.value)
              }
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
            >
              <option value="">
                External customer / select later
              </option>

              {students
                .filter(
                  (student) =>
                    student.status === "active",
                )
                .map((student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.fullName}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Customer Name *
              </label>

              <input
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                placeholder="Customer name"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Phone
              </label>

              <input
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Time Slot
            </label>

            <select
              value={`${slot.startTime}-${slot.endTime}`}
              onChange={(event) => {
                const selected = timeSlots.find(
                  (item) =>
                    `${item.startTime}-${item.endTime}` ===
                    event.target.value,
                );

                if (selected) {
                  setSlot(selected);
                }
              }}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
            >
              {timeSlots.map((item) => (
                <option
                  key={`${item.startTime}-${item.endTime}`}
                  value={`${item.startTime}-${item.endTime}`}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Amount
              </label>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Payment Status
              </label>

              <select
                value={paymentStatus}
                onChange={(event) =>
                  setPaymentStatus(
                    event.target.value as PaymentStatus,
                  )
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value as PaymentMethod,
                )
              }
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
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
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              rows={3}
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              placeholder="Optional notes..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Create Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
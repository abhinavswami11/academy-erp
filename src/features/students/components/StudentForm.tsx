import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import { batchOptions } from "../data/mockStudents";
import type { CreateStudentInput, StudentGender } from "../types/student.types";

interface StudentFormProps {
  onSubmit: (input: CreateStudentInput) => void;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  dateOfBirth: string;
  gender: StudentGender | "";
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  joiningDate: string;
  batch: string;
  coach: string;
  monthlyFee: string;
  hostelResident: boolean;
}

interface FormErrors {
  fullName?: string;
  parentName?: string;
  parentPhone?: string;
  joiningDate?: string;
  batch?: string;
  monthlyFee?: string;
}

const initialFormState: FormState = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  parentName: "",
  parentPhone: "",
  address: "",
  joiningDate: "",
  batch: "",
  coach: "",
  monthlyFee: "",
  hostelResident: false,
};

const inputClassName =
  "h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const labelClassName = "mb-1 block text-sm font-medium text-slate-700";

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required";
  }
  if (!form.parentName.trim()) {
    errors.parentName = "Parent / guardian name is required";
  }
  if (!form.parentPhone.trim()) {
    errors.parentPhone = "Parent / guardian phone is required";
  }
  if (!form.joiningDate) {
    errors.joiningDate = "Joining date is required";
  }
  if (!form.batch) {
    errors.batch = "Batch is required";
  }
  if (!form.monthlyFee.trim()) {
    errors.monthlyFee = "Monthly fee is required";
  } else {
    const fee = Number(form.monthlyFee);
    if (Number.isNaN(fee) || fee < 0) {
      errors.monthlyFee = "Enter a valid non-negative number";
    }
  }

  return errors;
}

export default function StudentForm({ onSubmit, onClose }: StudentFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      fullName: form.fullName.trim(),
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      phone: form.phone.trim(),
      parentName: form.parentName.trim(),
      parentPhone: form.parentPhone.trim(),
      address: form.address.trim(),
      joiningDate: form.joiningDate,
      batch: form.batch,
      coach: form.coach.trim(),
      hostelResident: form.hostelResident,
      monthlyFee: Number(form.monthlyFee),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Add Student</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className={labelClassName}>
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                className={`${inputClassName} ${errors.fullName ? "border-red-300" : ""}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className={labelClassName}>
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={(event) =>
                  updateField("dateOfBirth", event.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="gender" className={labelClassName}>
                Gender
              </label>
              <select
                id="gender"
                value={form.gender}
                onChange={(event) =>
                  updateField("gender", event.target.value as StudentGender | "")
                }
                className={inputClassName}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone" className={labelClassName}>
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="parentName" className={labelClassName}>
                Parent / Guardian Name *
              </label>
              <input
                id="parentName"
                type="text"
                value={form.parentName}
                onChange={(event) =>
                  updateField("parentName", event.target.value)
                }
                className={`${inputClassName} ${errors.parentName ? "border-red-300" : ""}`}
              />
              {errors.parentName && (
                <p className="mt-1 text-xs text-red-600">{errors.parentName}</p>
              )}
            </div>

            <div>
              <label htmlFor="parentPhone" className={labelClassName}>
                Parent / Guardian Phone *
              </label>
              <input
                id="parentPhone"
                type="tel"
                value={form.parentPhone}
                onChange={(event) =>
                  updateField("parentPhone", event.target.value)
                }
                className={`${inputClassName} ${errors.parentPhone ? "border-red-300" : ""}`}
              />
              {errors.parentPhone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.parentPhone}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className={labelClassName}>
                Address
              </label>
              <textarea
                id="address"
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="joiningDate" className={labelClassName}>
                Joining Date *
              </label>
              <input
                id="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={(event) =>
                  updateField("joiningDate", event.target.value)
                }
                className={`${inputClassName} ${errors.joiningDate ? "border-red-300" : ""}`}
              />
              {errors.joiningDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.joiningDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="batch" className={labelClassName}>
                Batch *
              </label>
              <select
                id="batch"
                value={form.batch}
                onChange={(event) => updateField("batch", event.target.value)}
                className={`${inputClassName} ${errors.batch ? "border-red-300" : ""}`}
              >
                <option value="">Select batch</option>
                {batchOptions.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
              {errors.batch && (
                <p className="mt-1 text-xs text-red-600">{errors.batch}</p>
              )}
            </div>

            <div>
              <label htmlFor="coach" className={labelClassName}>
                Coach
              </label>
              <input
                id="coach"
                type="text"
                value={form.coach}
                onChange={(event) => updateField("coach", event.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="monthlyFee" className={labelClassName}>
                Monthly Fee *
              </label>
              <input
                id="monthlyFee"
                type="number"
                min="0"
                step="100"
                value={form.monthlyFee}
                onChange={(event) =>
                  updateField("monthlyFee", event.target.value)
                }
                className={`${inputClassName} ${errors.monthlyFee ? "border-red-300" : ""}`}
              />
              {errors.monthlyFee && (
                <p className="mt-1 text-xs text-red-600">{errors.monthlyFee}</p>
              )}
            </div>

            <div className="flex items-center sm:col-span-2">
              <input
                id="hostelResident"
                type="checkbox"
                checked={form.hostelResident}
                onChange={(event) =>
                  updateField("hostelResident", event.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="hostelResident"
                className="ml-2 text-sm text-slate-700"
              >
                Lives in Hostel
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

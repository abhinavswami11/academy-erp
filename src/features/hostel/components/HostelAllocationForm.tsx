import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

import Button from "../../../components/ui/Button";

import { getStudents } from "../../students/services/student.service";

import type { HostelAllocation } from "../types/hostel.types";

interface HostelAllocationFormProps {
  onSubmit: (allocation: HostelAllocation) => void;
  onClose: () => void;
}

const rooms = ["101", "102", "103", "104", "105"];

const beds = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function HostelAllocationForm({
  onSubmit,
  onClose,
}: HostelAllocationFormProps) {
  const students = getStudents();

  const [studentId, setStudentId] =
    useState("");

  const [roomNumber, setRoomNumber] =
    useState("");

  const [bedNumber, setBedNumber] =
    useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const student = students.find(
      (item) => item.id === studentId,
    );

    if (!student) {
      window.alert("Please select a student.");
      return;
    }

    if (!roomNumber || !bedNumber) {
      window.alert(
        "Please select a room and bed.",
      );
      return;
    }

    const allocation: HostelAllocation = {
      id: crypto.randomUUID(),
      studentId: student.id,
      studentName: student.fullName,
      batch: student.batch,
      roomNumber,
      bedNumber,
      allocationDate: new Date()
        .toISOString()
        .split("T")[0],
      status: "occupied",
    };

    onSubmit(allocation);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Allocate Hostel Bed
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="hostel-student"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Student
            </label>

            <select
              id="hostel-student"
              value={studentId}
              onChange={(event) =>
                setStudentId(event.target.value)
              }
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
            >
              <option value="">
                Select student
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
                    {student.fullName} —{" "}
                    {student.batch}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="hostel-room"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Room
              </label>

              <select
                id="hostel-room"
                value={roomNumber}
                onChange={(event) =>
                  setRoomNumber(
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
              >
                <option value="">
                  Select room
                </option>

                {rooms.map((room) => (
                  <option key={room} value={room}>
                    Room {room}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="hostel-bed"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Bed
              </label>

              <select
                id="hostel-bed"
                value={bedNumber}
                onChange={(event) =>
                  setBedNumber(
                    event.target.value,
                  )
                }
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
              >
                <option value="">
                  Select bed
                </option>

                {beds.map((bed) => (
                  <option key={bed} value={bed}>
                    Bed {bed}
                  </option>
                ))}
              </select>
            </div>
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
              Allocate Bed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
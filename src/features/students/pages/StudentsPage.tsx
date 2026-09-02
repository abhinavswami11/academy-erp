import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import StudentFilters from "../components/StudentFilters";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { createStudent, getStudents } from "../services/student.service";

import type {
  CreateStudentInput,
  HostelFilter,
  StatusFilter,
  Student,
} from "../types/student.types";

function filterStudents(
  students: Student[],
  search: string,
  statusFilter: StatusFilter,
  hostelFilter: HostelFilter,
): Student[] {
  const query = search.trim().toLowerCase();

  return students.filter((student) => {
    const matchesSearch =
      query.length === 0 ||
      student.fullName.toLowerCase().includes(query) ||
      student.batch.toLowerCase().includes(query) ||
      student.phone.includes(query) ||
      student.parentName.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    const matchesHostel =
      hostelFilter === "all" ||
      (hostelFilter === "hostel" && student.hostelResident) ||
      (hostelFilter === "non-hostel" && !student.hostelResident);

    return matchesSearch && matchesStatus && matchesHostel;
  });
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");
  const [hostelFilter, setHostelFilter] =
    useState<HostelFilter>("all");

  const [showForm, setShowForm] = useState(false);

  const filteredStudents = useMemo(
    () =>
      filterStudents(
        students,
        search,
        statusFilter,
        hostelFilter,
      ),
    [students, search, statusFilter, hostelFilter],
  );

  useEffect(() => {
    async function loadStudents() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getStudents();

        setStudents(data);
      } catch (err) {
        console.error("Failed to load students:", err);
        setError("Failed to load students.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadStudents();
  }, []);

  const handleCreateStudent = async (
    input: CreateStudentInput,
  ) => {
    try {
      const student = await createStudent(input);

      setStudents((current) => [student, ...current]);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create student:", err);
      window.alert("Failed to create student.");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Students"
          description="Manage student profiles, batches, and enrollment records."
        />

        <Button
          onClick={() => setShowForm(true)}
          className="shrink-0 self-start"
        >
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {isLoading && (
        <div className="mb-4 rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading students...
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {filteredStudents.length} of {students.length} students
          </p>

          <div className="mb-4">
            <StudentFilters
              search={search}
              statusFilter={statusFilter}
              hostelFilter={hostelFilter}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
              onHostelFilterChange={setHostelFilter}
            />
          </div>

          <StudentTable students={filteredStudents} />
        </>
      )}

      {showForm && (
        <StudentForm
          onSubmit={handleCreateStudent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
import { useMemo, useState } from "react";
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
  const [students, setStudents] = useState<Student[]>(() => getStudents());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [hostelFilter, setHostelFilter] = useState<HostelFilter>("all");
  const [showForm, setShowForm] = useState(false);

  const filteredStudents = useMemo(
    () => filterStudents(students, search, statusFilter, hostelFilter),
    [students, search, statusFilter, hostelFilter],
  );

  function handleCreateStudent(input: CreateStudentInput) {
    const newStudent = createStudent(input);
    setStudents((prev) => [newStudent, ...prev]);
    setShowForm(false);
  }

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

      {showForm && (
        <StudentForm
          onSubmit={handleCreateStudent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

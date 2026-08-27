import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import StudentProfile from "../components/StudentProfile";
import { getStudentById } from "../services/student.service";

export default function StudentProfilePage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const student = useMemo(
    () => (studentId ? getStudentById(studentId) : undefined),
    [studentId],
  );

  if (!student) {
    return (
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/students")}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </Button>
        <Card className="px-6 py-12 text-center">
          <p className="text-sm text-slate-500">Student not found.</p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => navigate("/students")}
        className="mb-4 -ml-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Students
      </Button>

      <PageHeader title={student.fullName} description="Student profile" />

      <StudentProfile student={student} />
    </div>
  );
}

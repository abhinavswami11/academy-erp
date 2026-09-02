import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import StudentProfile from "../components/StudentProfile";
import { getStudentById } from "../services/student.service";

import type { Student } from "../types/student.types";

export default function StudentProfilePage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      if (!studentId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const data = await getStudentById(studentId);

        setStudent(data);
      } catch (err) {
        console.error("Failed to load student:", err);
        setStudent(undefined);
      } finally {
        setIsLoading(false);
      }
    }

    void loadStudent();
  }, [studentId]);

  if (isLoading) {
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
          <p className="text-sm text-slate-500">
            Loading student...
          </p>
        </Card>
      </div>
    );
  }

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
          <p className="text-sm text-slate-500">
            Student not found.
          </p>
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

      <PageHeader
        title={student.fullName}
        description="Student profile"
      />

      <StudentProfile student={student} />
    </div>
  );
}
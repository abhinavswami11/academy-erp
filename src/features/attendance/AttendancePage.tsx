import { ClipboardCheck } from "lucide-react";
import FeaturePlaceholderPage from "../../components/common/FeaturePlaceholderPage";

export default function AttendancePage() {
  return (
    <FeaturePlaceholderPage
      title="Attendance"
      description="Track daily attendance for batches and individual students."
      icon={ClipboardCheck}
      actionLabel="Mark Attendance"
      actionPath="/attendance"
    />
  );
}

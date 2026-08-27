import { Building2 } from "lucide-react";
import FeaturePlaceholderPage from "../../components/common/FeaturePlaceholderPage";

export default function HostelPage() {
  return (
    <FeaturePlaceholderPage
      title="Hostel"
      description="Manage hostel rooms, allocations, and resident records."
      icon={Building2}
      actionLabel="Add Resident"
      actionPath="/hostel"
    />
  );
}

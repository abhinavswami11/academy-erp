import { Settings } from "lucide-react";
import FeaturePlaceholderPage from "../../components/common/FeaturePlaceholderPage";

export default function SettingsPage() {
  return (
    <FeaturePlaceholderPage
      title="Settings"
      description="Configure academy details, user roles, and system preferences."
      icon={Settings}
      actionLabel="Manage Settings"
      actionPath="/settings"
    />
  );
}

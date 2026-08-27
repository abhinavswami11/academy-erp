import { BookOpen } from "lucide-react";
import FeaturePlaceholderPage from "../../components/common/FeaturePlaceholderPage";

export default function AccountsPage() {
  return (
    <FeaturePlaceholderPage
      title="Accounts"
      description="Monitor income, expenses, and financial transactions."
      icon={BookOpen}
      actionLabel="Add Transaction"
      actionPath="/accounts"
    />
  );
}

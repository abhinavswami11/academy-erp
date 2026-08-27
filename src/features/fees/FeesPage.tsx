import { Wallet } from "lucide-react";
import FeaturePlaceholderPage from "../../components/common/FeaturePlaceholderPage";

export default function FeesPage() {
  return (
    <FeaturePlaceholderPage
      title="Fees"
      description="Collect fees, track payments, and manage outstanding balances."
      icon={Wallet}
      actionLabel="Collect Fee"
      actionPath="/fees"
    />
  );
}

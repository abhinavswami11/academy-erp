import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import PageHeader from "../ui/PageHeader";

interface FeaturePlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  actionPath?: string;
}

export default function FeaturePlaceholderPage({
  title,
  description,
  icon,
  actionLabel,
  actionPath,
}: FeaturePlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={icon}
        title={`No ${title.toLowerCase()} yet`}
        description={`This module will help you manage ${title.toLowerCase()} for your academy. Get started by adding your first entry.`}
        action={
          actionLabel && actionPath ? (
            <Button onClick={() => navigate(actionPath)}>
              {actionLabel}
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}

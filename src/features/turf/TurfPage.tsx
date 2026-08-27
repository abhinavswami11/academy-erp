import { MapPin } from "lucide-react";
import FeaturePlaceholderPage from "../../components/common/FeaturePlaceholderPage";

export default function TurfPage() {
  return (
    <FeaturePlaceholderPage
      title="Turf"
      description="Schedule turf bookings, manage slots, and track revenue."
      icon={MapPin}
      actionLabel="New Booking"
      actionPath="/turf"
    />
  );
}

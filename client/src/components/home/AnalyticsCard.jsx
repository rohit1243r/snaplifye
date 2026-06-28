import { BarChart3 } from "lucide-react";
import FloatingCard from "./FloatingCard";

function AnalyticsCard() {
  return (
    <FloatingCard
      icon={<BarChart3 size={20} />}
      title="120+ Projects"
      subtitle="Successfully Delivered"
      className="-left-10 top-12"
    />
  );
}

export default AnalyticsCard;
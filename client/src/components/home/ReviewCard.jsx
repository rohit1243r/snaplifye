import { Star } from "lucide-react";
import FloatingCard from "./FloatingCard";

function ReviewCard() {
  return (
    <FloatingCard
      icon={<Star size={20} />}
      title="4.9/5 Rating"
      subtitle="100+ Happy Clients"
      className="-right-10 bottom-12"
    />
  );
}

export default ReviewCard;
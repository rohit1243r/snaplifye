import { useState } from "react";
import { updateQuoteStatus } from "@/services/quote.service";
import { toast } from "sonner";

function StatusSelect({ quote, onUpdated }) {
  const [status, setStatus] = useState(quote.status);

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    try {
      await updateQuoteStatus(quote._id, newStatus);

      setStatus(newStatus);

      toast.success("Status updated successfully");

      if (onUpdated) {
        onUpdated();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
    >
      <option>New</option>
      <option>Contacted</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>
  );
}

export default StatusSelect;
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

import StatusSelect from "./StatusSelect";
import { deleteQuote } from "@/services/quote.service";

function LeadsTable({
  quotes,
  refreshQuotes,
  onView,
}) {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteQuote(id);

      toast.success("Lead deleted successfully");

      refreshQuotes();
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  };

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {quotes.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-slate-400"
                >
                  No leads found.
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr
                  key={quote._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 text-white">
                    {quote.name}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {quote.email}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {quote.phone}
                  </td>

                  <td className="px-6 py-4">
                    <StatusSelect
                      quote={quote}
                      onUpdated={refreshQuotes}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => onView(quote)}
                        className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 transition hover:bg-cyan-500/20"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(quote._id)}
                        className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default LeadsTable;


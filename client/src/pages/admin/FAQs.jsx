import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/layouts/AdminLayout";
import FAQDialog from "@/components/faqs/FAQDialog";
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from "@/services/faq.service";
import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const res = await getAllFAQs(search);
      setFaqs(res.data);
    } catch (error) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [search]);

  const handleSubmit = async (data) => {
    try {
      if (editingFAQ) {
        await updateFAQ(editingFAQ._id, data);
        toast.success("FAQ updated successfully");
      } else {
        await createFAQ(data);
        toast.success("FAQ created successfully");
      }
      setDialogOpen(false);
      setEditingFAQ(null);
      fetchFAQs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFAQ(id);
      toast.success("FAQ deleted successfully");
      setDeleteId(null);
      fetchFAQs();
    } catch (error) {
      toast.error("Failed to delete FAQ");
    }
  };

  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const paginatedFAQs = faqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">FAQs</h1>
            <p className="mt-2 text-slate-400">Manage frequently asked questions.</p>
          </div>
          <button
            onClick={() => { setEditingFAQ(null); setDialogOpen(true); }}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600 transition"
          >
            <Plus size={18} />
            Add FAQ
          </button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-cyan-500" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <p className="text-lg text-slate-500">No FAQs found.</p>
            <p className="mt-1 text-sm text-slate-600">
              {search ? "Try a different search term." : "Click 'Add FAQ' to create one."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-400">Order</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-400">Question</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-400">Category</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-400">Status</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFAQs.map((faq) => (
                    <tr key={faq._id} className="border-b border-slate-800 last:border-0 hover:bg-slate-900/50 transition">
                      <td className="px-5 py-4 text-sm text-slate-400">{faq.order}</td>
                      <td className="px-5 py-4 text-sm text-white">{faq.question}</td>
                      <td className="px-5 py-4 text-sm text-slate-300">{faq.category}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          faq.isActive
                            ? "bg-emerald-950 text-emerald-400"
                            : "bg-slate-800 text-slate-500"
                        }`}>
                          {faq.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditingFAQ(faq); setDialogOpen(true); }}
                            className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white hover:border-cyan-500 transition"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteId(faq._id)}
                            className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-red-500 hover:border-red-500 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-50 transition"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm transition ${
                      page === currentPage
                        ? "bg-cyan-500 text-white"
                        : "border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <FAQDialog
          open={dialogOpen}
          onClose={() => { setDialogOpen(false); setEditingFAQ(null); }}
          onSubmit={handleSubmit}
          editingFAQ={editingFAQ}
        />

        {/* Delete Confirmation */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Delete FAQ</h3>
              <p className="mt-2 text-sm text-slate-400">Are you sure you want to delete this FAQ? This action cannot be undone.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default FAQs;

import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  MessageSquare,
  FolderKanban,
  FileText,
  CheckCheck,
  CreditCard,
  Calendar,
  Plus,
} from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getClientById,
  sendAdminMessage,
  markClientMessagesRead,
  createClientInvoice,
  updateClientInvoice,
  recordClientPayment,
  updateClientProject,
  assignProjectToClient,
} from "@/services/adminClient.service";
import { getAllProjects } from "@/services/project.service";
import { toast } from "sonner";

const tabs = ["projects", "messages", "invoices"];

function ClientDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [msgText, setMsgText] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [showAssign, setShowAssign] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ amount: "", dueDate: "", description: "" });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ amount: "", method: "bank_transfer", transactionId: "", invoiceId: "" });
  const bottomRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await getClientById(id);
      setData(res);
      await markClientMessagesRead(id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msgText.trim() || sendingMsg) return;
    setSendingMsg(true);
    try {
      await sendAdminMessage(id, msgText);
      setMsgText("");
      await fetchData();
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setSendingMsg(false);
    }
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      await createClientInvoice(id, {
        amount: Number(invoiceForm.amount),
        dueDate: invoiceForm.dueDate,
        description: invoiceForm.description,
      });
      toast.success("Invoice created");
      setShowInvoice(false);
      setInvoiceForm({ amount: "", dueDate: "", description: "" });
      await fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create invoice");
    }
  };

  const handleUpdateInvoiceStatus = async (invoiceId, status) => {
    try {
      await updateClientInvoice(id, invoiceId, { status });
      toast.success(`Invoice marked as ${status}`);
      await fetchData();
    } catch (err) {
      toast.error("Failed to update invoice");
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    try {
      await recordClientPayment(id, {
        amount: Number(paymentForm.amount),
        method: paymentForm.method,
        transactionId: paymentForm.transactionId,
        invoiceId: paymentForm.invoiceId || undefined,
      });
      toast.success("Payment recorded");
      setShowPayment(false);
      setPaymentForm({ amount: "", method: "bank_transfer", transactionId: "", invoiceId: "" });
      await fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record payment");
    }
  };

  const handleUpdateProjectStatus = async (projectId, status) => {
    try {
      await updateClientProject(id, projectId, { status });
      toast.success("Project updated");
      await fetchData();
    } catch (err) {
      toast.error("Failed to update project");
    }
  };

  const handleAssignProject = async (projectId) => {
    try {
      await assignProjectToClient(id, projectId);
      toast.success("Project assigned");
      setShowAssign(false);
      await fetchData();
    } catch (err) {
      toast.error("Failed to assign project");
    }
  };

  const loadAllProjects = async () => {
    try {
      const res = await getAllProjects();
      setAllProjects(res.projects || []);
      setShowAssign(true);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <p className="text-slate-400">Client not found.</p>
        </div>
      </AdminLayout>
    );
  }

  const { client, projects, messages, invoices, payments, unreadCount } = data;
  const unassignedProjects = allProjects.filter((p) => !p.assignedClient);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Link
          to="/admin/clients"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back to Clients
        </Link>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xl font-bold text-white">
              {client.name?.charAt(0)?.toUpperCase() || "C"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{client.name}</h1>
              <p className="text-sm text-slate-400">{client.email}</p>
              {client.company && (
                <p className="text-sm text-slate-500">{client.company}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400">
              {projects.length} Projects
            </span>
            <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400">
              {invoices.length} Invoices
            </span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400">
                {unreadCount} Unread
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? "bg-cyan-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "projects" && <FolderKanban size={16} />}
              {tab === "messages" && <MessageSquare size={16} />}
              {tab === "invoices" && <FileText size={16} />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Projects</h2>
              <Button size="sm" onClick={loadAllProjects}>
                <Plus size={16} /> Assign Project
              </Button>
            </div>

            {showAssign && (
              <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-3 text-sm font-medium text-cyan-400">Select a project to assign</h3>
                {unassignedProjects.length === 0 ? (
                  <p className="text-sm text-slate-500">No unassigned projects available.</p>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {unassignedProjects.map((p) => (
                      <button
                        key={p._id}
                        onClick={() => handleAssignProject(p._id)}
                        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-left text-sm text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                      >
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-slate-500">{p.category}</p>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setShowAssign(false)}
                  className="mt-3 text-xs text-slate-500 hover:text-slate-300"
                >
                  Cancel
                </button>
              </div>
            )}

            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects assigned.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-slate-400">{project.category}</p>
                      </div>
                      <select
                        value={project.status || "not-started"}
                        onChange={(e) => handleUpdateProjectStatus(project._id, e.target.value)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300 outline-none"
                      >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech) => (
                        <span key={tech} className="rounded-lg bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="flex h-[500px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <MessageSquare size={32} className="mb-3 text-slate-600" />
                  <p className="text-sm text-slate-500">No messages yet</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.sender === "admin"
                          ? "rounded-br-md bg-cyan-500 text-white"
                          : "rounded-bl-md bg-slate-800 text-slate-200"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className={`mt-1 flex items-center gap-1 ${msg.sender === "admin" ? "justify-end" : ""}`}>
                        <span className="text-[10px] text-white/60">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {msg.sender === "admin" && <CheckCheck size={12} className={msg.read ? "text-blue-300" : "text-white/40"} />}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-3 border-t border-slate-800 p-4">
              <input
                type="text"
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                placeholder="Reply as admin..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!msgText.trim() || sendingMsg}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:opacity-50"
              >
                <Send size={16} />
                Send
              </button>
            </form>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Invoices</h2>
              <Button size="sm" onClick={() => setShowInvoice(true)}>
                <Plus size={16} /> New Invoice
              </Button>
            </div>

            {showInvoice && (
              <form onSubmit={handleCreateInvoice} className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 space-y-4">
                <h3 className="text-sm font-medium text-cyan-400">Create Invoice</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input
                    type="number"
                    placeholder="Amount ($)"
                    value={invoiceForm.amount}
                    onChange={(e) => setInvoiceForm((p) => ({ ...p, amount: e.target.value }))}
                    required
                  />
                  <Input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm((p) => ({ ...p, dueDate: e.target.value }))}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Description"
                    value={invoiceForm.description}
                    onChange={(e) => setInvoiceForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Create</Button>
                  <button type="button" onClick={() => setShowInvoice(false)} className="text-sm text-slate-400 hover:text-white">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {invoices.length === 0 ? (
              <p className="text-sm text-slate-500">No invoices yet.</p>
            ) : (
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div
                    key={inv._id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">{inv.invoiceNumber}</p>
                      <p className="text-sm text-slate-400">${inv.amount}</p>
                      <p className="text-xs text-slate-500">
                        Due: {new Date(inv.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={inv.status}
                        onChange={(e) => handleUpdateInvoiceStatus(inv._id, e.target.value)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300 outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <h2 className="text-lg font-semibold text-white">Payments</h2>
              <Button size="sm" onClick={() => setShowPayment(true)}>
                <Plus size={16} /> Record Payment
              </Button>
            </div>

            {showPayment && (
              <form onSubmit={handleRecordPayment} className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-5 space-y-4">
                <h3 className="text-sm font-medium text-emerald-400">Record Payment</h3>
                <div className="grid gap-4 sm:grid-cols-4">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm((p) => ({ ...p, amount: e.target.value }))}
                    required
                  />
                  <select
                    value={paymentForm.method}
                    onChange={(e) => setPaymentForm((p) => ({ ...p, method: e.target.value }))}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-300 outline-none"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash</option>
                  </select>
                  <Input
                    type="text"
                    placeholder="Transaction ID"
                    value={paymentForm.transactionId}
                    onChange={(e) => setPaymentForm((p) => ({ ...p, transactionId: e.target.value }))}
                  />
                  <select
                    value={paymentForm.invoiceId}
                    onChange={(e) => setPaymentForm((p) => ({ ...p, invoiceId: e.target.value }))}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-300 outline-none"
                  >
                    <option value="">No invoice</option>
                    {invoices.filter((i) => i.status !== "paid").map((inv) => (
                      <option key={inv._id} value={inv._id}>{inv.invoiceNumber}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Record</Button>
                  <button type="button" onClick={() => setShowPayment(false)} className="text-sm text-slate-400 hover:text-white">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {payments.length === 0 ? (
              <p className="text-sm text-slate-500">No payments recorded.</p>
            ) : (
              <div className="space-y-3">
                {payments.map((pay) => (
                  <div
                    key={pay._id}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-500/10 p-2.5">
                        <CreditCard size={18} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">${pay.amount}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(pay.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      <p>{pay.method}</p>
                      {pay.transactionId && <p>ID: {pay.transactionId}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ClientDetail;

import { useEffect, useState } from "react";
import { Download, CreditCard } from "lucide-react";
import { getInvoices, getPayments } from "@/services/client.service";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("invoices");

  useEffect(() => {
    const fetch = async () => {
      try {
        const [invRes, payRes] = await Promise.all([getInvoices(), getPayments()]);
        setInvoices(invRes.invoices || []);
        setPayments(payRes.payments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Invoices & Payments</h1>
        <p className="mt-1 text-slate-400">View and download your invoices</p>
      </div>

      <div className="flex gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 w-fit">
        <button
          onClick={() => setTab("invoices")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === "invoices"
              ? "bg-cyan-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Invoices
        </button>
        <button
          onClick={() => setTab("payments")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === "payments"
              ? "bg-cyan-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Payment History
        </button>
      </div>

      {tab === "invoices" && (
        <div className="space-y-4">
          {invoices.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
              <p className="text-slate-400">No invoices yet.</p>
            </div>
          ) : (
            invoices.map((inv, idx) => (
              <AnimatedSection key={inv._id} delay={idx * 0.05}>
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-white">{inv.invoiceNumber}</p>
                    <p className="text-sm text-slate-400">{inv.description || "Invoice"}</p>
                    <p className="text-sm text-slate-500">
                      Due: {new Date(inv.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-white">${inv.amount}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      inv.status === "paid"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : inv.status === "pending"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-red-500/10 text-red-400"
                    }`}>
                      {inv.status}
                    </span>
                    <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800">
                      <Download size={14} />
                      PDF
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>
      )}

      {tab === "payments" && (
        <div className="space-y-4">
          {payments.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
              <p className="text-slate-400">No payments yet.</p>
            </div>
          ) : (
            payments.map((pay, idx) => (
              <AnimatedSection key={pay._id} delay={idx * 0.05}>
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-emerald-500/10 p-3">
                      <CreditCard size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">${pay.amount}</p>
                      <p className="text-sm text-slate-400">
                        {new Date(pay.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p>{pay.method || "bank_transfer"}</p>
                    {pay.transactionId && (
                      <p className="text-xs text-slate-500">ID: {pay.transactionId}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Invoices;

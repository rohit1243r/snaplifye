import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { getPublicFAQs } from "@/services/faq.service";
import { Search, ChevronDown, Loader2 } from "lucide-react";

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await getPublicFAQs();
        setFaqs(res.data);
      } catch (error) {
        console.error("Failed to load FAQs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const filtered = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

        <Container>
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and process."
          />

          <div className="relative mx-auto mb-12 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500 transition"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-cyan-500" />
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <p className="text-lg text-slate-500">No FAQs found.</p>
              <p className="mt-1 text-sm text-slate-600">
                {search ? "Try a different search term." : "FAQs will appear here once added."}
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-10">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-5 text-lg font-semibold text-cyan-400">{category}</h3>
                  <div className="space-y-3">
                    {items.map((faq) => (
                      <div
                        key={faq._id}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition hover:border-slate-700"
                      >
                        <button
                          onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                          className="flex w-full items-center justify-between px-6 py-5 text-left"
                        >
                          <span className="pr-4 text-sm font-medium text-white">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: openId === faq._id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 text-slate-500"
                          >
                            <ChevronDown size={18} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {openId === faq._id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-slate-800 px-6 py-5">
                                <p className="text-sm leading-relaxed text-slate-400">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
  );
}

export default FAQs;

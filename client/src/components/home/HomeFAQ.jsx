import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { getPublicFAQs } from "@/services/faq.service";
import { ChevronDown, Loader2 } from "lucide-react";

function HomeFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      <Container>
        <SectionTitle
          subtitle="FAQs"
          title="Frequently Asked Questions"
          center
        />

        <div className="mx-auto mt-16 max-w-3xl">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-cyan-500" />
            </div>
          ) : faqs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <p className="text-lg text-slate-500">No FAQs yet.</p>
              <p className="mt-1 text-sm text-slate-600">
                FAQs will appear here once added.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => (
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
          )}
        </div>
      </Container>
    </section>
  );
}

export default HomeFAQ;

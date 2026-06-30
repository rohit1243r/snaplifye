import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "General",
  "Pricing",
  "Services",
  "Support",
  "Website Development",
  "SEO",
];

function FAQDialog({ open, onClose, onSubmit, editingFAQ }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (editingFAQ) {
      reset({
        question: editingFAQ.question || "",
        answer: editingFAQ.answer || "",
        category: editingFAQ.category || "General",
        order: editingFAQ.order ?? 0,
        isActive: editingFAQ.isActive ?? true,
      });
    } else {
      reset({ question: "", answer: "", category: "General", order: 0, isActive: true });
    }
  }, [editingFAQ, reset, open]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl border-slate-800 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {editingFAQ ? "Edit FAQ" : "Add FAQ"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Question *</label>
            <Input
              placeholder="Enter your question"
              {...register("question", { required: "Question is required" })}
            />
            {errors.question && <p className="mt-1 text-xs text-red-500">{errors.question.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Answer *</label>
            <Textarea
              rows={4}
              placeholder="Enter the answer"
              {...register("answer", { required: "Answer is required" })}
            />
            {errors.answer && <p className="mt-1 text-xs text-red-500">{errors.answer.message}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Category *</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="w-32">
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Order</label>
              <Input
                type="number"
                placeholder="0"
                {...register("order", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
            />
            <label htmlFor="isActive" className="text-sm text-slate-300">Active</label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingFAQ ? "Update FAQ" : "Create FAQ"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FAQDialog;

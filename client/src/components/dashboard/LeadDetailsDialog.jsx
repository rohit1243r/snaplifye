import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function LeadDetailsDialog({ open, onClose, quote }) {
  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-950 text-white border-slate-800">

        <DialogHeader>
          <DialogTitle className="text-2xl">
            Lead Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-6">

          <div>
            <p className="text-slate-400">Name</p>
            <p>{quote.name}</p>
          </div>

          <div>
            <p className="text-slate-400">Email</p>
            <p>{quote.email}</p>
          </div>

          <div>
            <p className="text-slate-400">Phone</p>
            <p>{quote.phone}</p>
          </div>

          <div>
            <p className="text-slate-400">Business</p>
            <p>{quote.business}</p>
          </div>

          <div>
            <p className="text-slate-400">Status</p>
            <p>{quote.status}</p>
          </div>

          <div>
            <p className="text-slate-400">Created</p>
            <p>
              {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="mt-6">
          <p className="text-slate-400 mb-2">
            Project Details
          </p>

          <div className="rounded-xl bg-slate-900 p-4">
            {quote.details}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default LeadDetailsDialog;
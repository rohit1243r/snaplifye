import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function ContactDetailsDialog({
  open,
  onClose,
  contact,
}) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-3xl border-slate-800 bg-slate-950 text-white">

        <DialogHeader>

          <DialogTitle className="text-3xl">
            Contact Details
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6">

          <div>

            <h3 className="text-sm text-slate-400">
              Name
            </h3>

            <p className="text-lg font-semibold">
              {contact.name}
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <h3 className="text-sm text-slate-400">
                Email
              </h3>

              <p>{contact.email}</p>

            </div>

            <div>

              <h3 className="text-sm text-slate-400">
                Phone
              </h3>

              <p>{contact.phone}</p>

            </div>

          </div>

          <div>

            <h3 className="text-sm text-slate-400">
              Subject
            </h3>

            <p>{contact.subject}</p>

          </div>

          <div>

            <h3 className="text-sm text-slate-400">
              Message
            </h3>

            <div className="mt-2 rounded-xl bg-slate-900 p-5 text-slate-300">
              {contact.message}
            </div>

          </div>

          <div>

            <h3 className="text-sm text-slate-400">
              Status
            </h3>

            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
              {contact.status}
            </span>

          </div>

          <div className="flex justify-end">

            <Button onClick={onClose}>
              Close
            </Button>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}

export default ContactDetailsDialog;
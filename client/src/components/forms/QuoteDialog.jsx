import useQuoteDialog from "@/hooks/useQuoteDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema } from "@/schemas/quoteSchema";
import { toast } from "sonner";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function QuoteDialog() {
  const { isOpen, close } = useQuoteDialog();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data) => {
    try {
      await submitQuote(data);

      toast.success("Quote request submitted successfully! 🚀");

      reset();

      close();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };


  return (

    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-2xl rounded-3xl border-slate-800 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            Request a Free Quote 🚀
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Fill in your project details and we'll contact you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 py-4"
        >
            <Label>Full Name</Label>
          <Input
            placeholder="John Doe"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
          <Label>Phone No.</Label>
          <Input
            placeholder="+91 9876543210"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
          <Label>Business Name</Label>
          <Input
            placeholder="Snaplifye"
            {...register("business")}
          />


          {errors.business && (
            <p className="text-sm text-red-500">
              {errors.business.message}
            </p>
          )}

          <Label>Details</Label>
          <Textarea
            rows={5}
            placeholder="Tell us about your project..."
            {...register("details")}
          />

          {errors.details && (
            <p className="text-sm text-red-500">
              {errors.details.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default QuoteDialog;
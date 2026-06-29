import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContact } from "@/services/contact.service";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createContact(data);

      toast.success("Message sent successfully 🚀");

      // WhatsApp Message
      const phone = "919876543210"; // Apna WhatsApp Number

      const message = encodeURIComponent(`
Hello Snaplifye 👋

Name: ${data.name}

Email: ${data.email}

Phone: ${data.phone}

Subject: ${data.subject}

Message:
${data.message}
`);

      window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
      );

      reset();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-6 top-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px] sm:left-20 sm:top-20 sm:h-72 sm:w-72" />
        <div className="absolute -right-4 -bottom-4 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px] sm:bottom-0 sm:right-0 sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-400">
            CONTACT SNAPLIFYE
          </span>
          <h1 className="mt-8 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-7xl text-white">
            Let's Build Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Dream Website
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            Whether you need a modern business website,
            landing page or complete web application,
            our team is ready to help.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-500">
            <Mail className="mb-5 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold text-white">Email</h3>
            <p className="mt-3 text-slate-400">snaplifye@gmail.com</p>
          </div>

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-500">
            <Phone className="mb-5 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold text-white">Phone</h3>
            <p className="mt-3 text-slate-400">+91 98765 43210</p>
          </div>

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-500">
            <MapPin className="mb-5 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold text-white">Address</h3>
            <p className="mt-3 text-slate-400">Erode, Tamil Nadu</p>
          </div>

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-500">
            <Clock className="mb-5 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold text-white">Working Hours</h3>
            <p className="mt-3 text-slate-400">
              Mon - Sat
              <br />
              9 AM - 8 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 rounded-[30px] border border-slate-800 bg-slate-900/70 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
              FREE CONSULTATION
            </span>
            <h2 className="mt-5 text-2xl sm:text-4xl font-bold text-white">
              Tell Us About
              <span className="block text-cyan-400">
                Your Project
              </span>
            </h2>
            <p className="mt-3 text-slate-400">
              Fill out the form and our team will contact you within
              24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Input
                placeholder="Full Name"
                className="h-12 rounded-xl border-slate-700 bg-slate-950"
                {...register("name")}
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="h-12 rounded-xl border-slate-700 bg-slate-950"
                {...register("email")}
              />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Input
                placeholder="Phone Number"
                className="h-12 rounded-xl border-slate-700 bg-slate-950"
                {...register("phone")}
              />
              <Input
                placeholder="Subject"
                className="h-12 rounded-xl border-slate-700 bg-slate-950"
                {...register("subject")}
              />
            </div>

            <Textarea
              rows={7}
              placeholder="Describe your project..."
              className="rounded-xl border-slate-700 bg-slate-950"
              {...register("message")}
            />

            <Button
              type="submit"
              size="lg"
              className="h-14 w-full rounded-xl bg-cyan-500 text-lg font-semibold transition hover:scale-[1.02] hover:bg-cyan-600 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-3 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Why Choose Snaplifye */}
        <div className="mt-24 rounded-[30px] border border-slate-800 bg-slate-900/60 p-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">
              Why Choose <span className="text-cyan-400">Snaplifye</span>?
            </h2>
            <p className="mt-4 text-slate-400">
              We build websites that help businesses grow faster.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-8">
              <h3 className="text-2xl font-bold text-cyan-400">
                ⚡ Fast Delivery
              </h3>
              <p className="mt-4 text-slate-400">
                Get your website completed quickly without
                compromising quality.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-8">
              <h3 className="text-2xl font-bold text-cyan-400">
                💎 Premium Design
              </h3>
              <p className="mt-4 text-slate-400">
                Modern UI/UX with responsive layouts and animations.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-8">
              <h3 className="text-2xl font-bold text-cyan-400">
                🚀 SEO Optimized
              </h3>
              <p className="mt-4 text-slate-400">
                Built for speed, SEO and higher Google rankings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
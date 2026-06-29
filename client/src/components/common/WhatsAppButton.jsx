import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const phone = "919876543210";
  const message = encodeURIComponent(
    "Hello Snaplifye 👋 I want to build a website."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 group">

      <div className="absolute right-20 top-1/2 hidden -translate-y-1/2 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg group-hover:block whitespace-nowrap">
        Chat with us
      </div>

      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp className="text-4xl text-white" />
      </a>

    </div>
  );
}

export default WhatsAppButton;
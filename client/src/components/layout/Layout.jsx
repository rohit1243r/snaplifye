import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

function Layout({ children }) {
  return (

    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default Layout;
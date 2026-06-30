import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  Download,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

const menus = [
  { title: "Dashboard", path: "/client/dashboard", icon: <LayoutDashboard size={20} /> },
  { title: "Projects", path: "/client/projects", icon: <FolderKanban size={20} /> },
  { title: "Messages", path: "/client/messages", icon: <MessageSquare size={20} /> },
  { title: "Invoices", path: "/client/invoices", icon: <FileText size={20} /> },
  { title: "Files", path: "/client/files", icon: <Download size={20} /> },
  { title: "Profile", path: "/client/profile", icon: <User size={20} /> },
];

function ClientLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("client");
    navigate("/client/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800 bg-slate-900 transition-transform md:static md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Snaplifye</h1>
            <p className="mt-1 text-sm text-slate-400">Client Portal</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setMobileOpen(false)}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                location.pathname === menu.path
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {menu.icon}
              {menu.title}
            </Link>
          ))}

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center gap-3 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            <ArrowLeft size={18} />
            Back to Website
          </Link>
        </nav>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:px-6 md:py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white md:hidden">
              <Menu size={24} />
            </button>
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-slate-400 transition hover:text-cyan-400 md:inline-flex"
            >
              <ArrowLeft size={16} />
              Back to Website
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export default ClientLayout;

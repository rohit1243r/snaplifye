import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Users,
} from "lucide-react";
import { Mail } from "lucide-react";

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Projects",
      path: "/admin/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      title: "Clients",
      path: "/admin/clients",
      icon: <Users size={20} />,
    },
    {
      title: "Contacts",
      path: "/admin/contacts",
      icon: <Mail size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800 bg-slate-900">

        <div className="border-b border-slate-800 p-6">

          <h1 className="text-3xl font-bold text-cyan-400">
            Snaplifye
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Admin Panel
          </p>

        </div>

        <nav className="p-4">

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${location.pathname === menu.path
                ? "bg-cyan-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              {menu.icon}
              {menu.title}
            </Link>
          ))}

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center justify-end border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        <div className="p-6 md:p-8">{children}</div>
      </main>

    </div>
  );
}

export default AdminLayout;
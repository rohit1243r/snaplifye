import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LayoutDashboard, LogOut } from "lucide-react";
import useQuoteDialog from "@/hooks/useQuoteDialog";
import Logo from "./Logo";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Pricing", path: "/pricing" },
    { name: "Estimate Cost", path: "/cost-estimator" },
    { name: "Contact", path: "/contact" },
];

function Navbar() {
    const { open } = useQuoteDialog();
    const [openMenu, setOpenMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [client, setClient] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpenMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        const stored = localStorage.getItem("client");
        if (stored) {
            try { setClient(JSON.parse(stored)); } catch { setClient(null); }
        } else {
            setClient(null);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("clientToken");
        localStorage.removeItem("client");
        setClient(null);
        navigate("/");
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "border-b border-slate-800/50 bg-slate-950/80 shadow-lg shadow-black/20 backdrop-blur-xl"
                    : "border-b border-transparent bg-slate-950/50 backdrop-blur-md"
            }`}
        >
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <NavLink to="/" className="flex shrink-0 items-center">
                    <Logo className="h-8 md:h-10" />
                </NavLink>

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                                    isActive
                                        ? "text-cyan-400"
                                        : "text-slate-400 hover:text-slate-200"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute -bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-cyan-400" />
                                    )}
                                    <span className="absolute inset-0 rounded-lg transition-colors hover:bg-slate-800/40" />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Right */}
                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    {client ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate("/client/dashboard")}
                                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:scale-105 hover:shadow-cyan-500/30"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                                    {client.name?.charAt(0)?.toUpperCase() || "C"}
                                </div>
                                <span className="hidden xl:inline">Dashboard</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                title="Logout"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/client/login"
                            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                        >
                            Client Portal
                        </NavLink>
                    )}
                    <Button
                        onClick={open}
                        className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                            Get Free Quote
                        </span>
                        <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-300 group-hover:translate-y-0" />
                    </Button>
                </div>

                {/* Mobile Icon */}
                <button
                    className="relative z-50 md:hidden"
                    aria-label="Toggle menu"
                    onClick={() => setOpenMenu((s) => !s)}
                >
                    <div className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-800/50">
                        {openMenu ? <X className="text-white" /> : <Menu className="text-white" />}
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    openMenu
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                }`}
            >
                {openMenu && (
                    <div className="absolute inset-x-0 top-16 z-40 border-t border-slate-800/50 bg-slate-950/95 shadow-2xl shadow-black/30 backdrop-blur-xl">
                        <nav className="flex flex-col gap-1 p-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setOpenMenu(false)}
                                    className={({ isActive }) =>
                                        `rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                                            isActive
                                                ? "bg-cyan-500/10 text-cyan-400"
                                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}

                            {client ? (
                                <>
                                    <div className="mt-2 flex items-center gap-3 rounded-lg bg-slate-800/50 px-4 py-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                                            {client.name?.charAt(0)?.toUpperCase() || "C"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="truncate text-sm font-medium text-white">{client.name}</p>
                                            <p className="truncate text-xs text-slate-400">{client.email}</p>
                                        </div>
                                    </div>
                                    <NavLink
                                        to="/client/dashboard"
                                        onClick={() => setOpenMenu(false)}
                                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-cyan-400 transition hover:bg-slate-800/50"
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={() => { setOpenMenu(false); handleLogout(); }}
                                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-400 transition hover:bg-slate-800/50 hover:text-white"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink
                                    to="/client/login"
                                    onClick={() => setOpenMenu(false)}
                                    className={({ isActive }) =>
                                        `rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                                            isActive
                                                ? "bg-cyan-500/10 text-cyan-400"
                                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                        }`
                                    }
                                >
                                    Client Portal
                                </NavLink>
                            )}

                            <div className="mt-2 border-t border-slate-800/50 pt-4">
                                <Button
                                    onClick={() => { setOpenMenu(false); open(); }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 active:scale-95"
                                >
                                    <Sparkles className="mr-2 size-4" />
                                    Get Free Quote
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;

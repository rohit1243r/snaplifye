import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import useQuoteDialog from "@/hooks/useQuoteDialog";
import Logo from "./Logo";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
];

function Navbar() {
    const { open } = useQuoteDialog();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Logo */}
                <NavLink to="/" className="flex items-center">
                    <Logo className="h-8 md:h-10" />
                </NavLink>

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "text-cyan-400"
                                    : "text-slate-300 hover:text-cyan-400"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Button */}
                <div className="hidden md:block">
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
                    className="md:hidden"
                    aria-label="Toggle menu"
                    onClick={() => setOpenMenu((s) => !s)}
                >
                    {openMenu ? <X className="text-white" /> : <Menu className="text-white" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {openMenu && (
                <div className="md:hidden">
                    <div className="absolute inset-x-0 top-20 z-40 bg-slate-950/95 border-t border-slate-800/50 backdrop-blur p-6">
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setOpenMenu(false)}
                                    className={({ isActive }) =>
                                        `block text-lg transition ${isActive
                                            ? "text-cyan-400"
                                            : "text-slate-300 hover:text-cyan-400"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}

                            <div className="mt-4">
                                <Button
                                    onClick={() => { setOpenMenu(false); open(); }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-95"
                                >
                                    <Sparkles className="mr-2 size-4" />
                                    Get Free Quote
                                </Button>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
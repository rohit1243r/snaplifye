import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
                    <Button onClick={open}>
                        Get Free Quote
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
                                <Button onClick={() => { setOpenMenu(false); open(); }} className="w-full">
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
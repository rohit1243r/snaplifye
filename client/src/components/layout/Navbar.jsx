import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import useQuoteDialog from "@/hooks/useQuoteDialog";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
];

function Navbar() {
    const { open } = useQuoteDialog();
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/70 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-3xl font-bold text-cyan-400"
                >
                    Snaplifye
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
                <button className="md:hidden">
                    <Menu className="text-white" />
                </button>
            </div>
        </header>
    );
}

export default Navbar;
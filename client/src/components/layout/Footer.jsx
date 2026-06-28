import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Mail, Phone, MapPin } from "lucide-react";

import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950">
      {/* Background Glow (hide on small screens) */}
      <div className="hidden md:block absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="hidden md:block absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="flex items-center gap-3">
              <span>Snaplifye</span>
            </div>
            <p className="mt-5 leading-7 text-slate-400">
              We build premium websites, landing pages and
              web applications that help businesses grow
              faster.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://snaplifye.netlify.app/"
                className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:bg-cyan-500 hover:text-white"
                aria-label="Website"
              >
                <TbWorld size={18} />
              </a>
              <a
                href="https://www.instagram.com/snaplifye?igsh=dTVzZ3l2cGd4Znlt"
                className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:bg-[#E4405F] hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-kumar-5a533839b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:bg-[#0A66C2] hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://sorts.pro/WxeOhv"
                className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:bg-[#333333] hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61585237183009"
                className="rounded-xl bg-slate-800 p-3 text-slate-400 transition hover:bg-[#1877F2] hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link to="/" className="text-slate-400 transition hover:text-cyan-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 transition hover:text-cyan-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 transition hover:text-cyan-400">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-400 transition hover:text-cyan-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 transition hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white">Services</h3>
            <ul className="mt-6 space-y-3 text-slate-400">
              <li className="cursor-pointer transition hover:text-cyan-400">Website Development</li>
              <li className="cursor-pointer transition hover:text-cyan-400">Landing Pages</li>
              <li className="cursor-pointer transition hover:text-cyan-400">UI / UX Design</li>
              <li className="cursor-pointer transition hover:text-cyan-400">Bug Fixing</li>
              <li className="cursor-pointer transition hover:text-cyan-400">Performance Optimization</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-400">
                <Mail size={18} className="text-cyan-400" />
                snaplifyelimitedcompany@gmail.com
              </div>
              <div className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-400">
                <Phone size={18} className="text-cyan-400" />
                +91 86089 69421
              </div>
              <div className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-400">
                <MapPin size={18} className="text-cyan-400" />
                Erode, Tamil Nadu
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-center text-slate-500">
            © 2026 <span className="inline-block align-middle"><Logo className="inline h-4" /></span>. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="transition hover:text-cyan-400">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-cyan-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
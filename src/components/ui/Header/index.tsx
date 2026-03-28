import { Link } from "react-router-dom";
import { useState } from "react";
import { X, Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[rgba(5,6,18,0.88)] px-6 text-white backdrop-blur-lg md:px-10">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
           

            <img
              
              src="/images/logo/TIPOLOGO.png"
              alt="Eternare.it"
              className="h-50 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 md:flex">
            <Link to="/sobre">Sobre</Link>

            <Link to="/suporte">Suporte</Link>

            <Link
              to="/criar"
              aria-label="Criar memória"
              className="rounded-xl bg-[#9b6bff] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-white transition-all duration-200 hover:opacity-90"
            >
              CRIAR
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={24} className="text-[#9b6bff]" />
            ) : (
              <Menu size={24} className="text-[#9b6bff]" />
            )}
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/35 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-[72px] z-50 w-full border-b border-white/10 bg-[rgba(5,6,18,0.96)] text-white backdrop-blur-[16px] transition-all duration-300 md:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          <Link
            to="/"
            className="py-5 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Início
          </Link>

          <Link
            to="/sobre"
            className="border-t border-white/10 py-5 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </Link>

          <Link
            to="/suporte"
            className="border-y border-white/10 py-5 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Suporte
          </Link>

          <Link
            to="/criar"
            aria-label="Criar memória"
            className="mt-5 rounded-xl bg-[#9b6bff] px-4 py-3 text-center text-sm font-semibold tracking-[0.02em] text-white transition-all duration-200 hover:opacity-90"
            onClick={() => setMenuOpen(false)}
          >
            CRIAR
          </Link>
        </nav>
      </div>
    </>
  );
}
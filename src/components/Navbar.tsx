import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Truck, MagnifyingGlass, Bell, ShoppingCart, Leaf, X, List, SealCheck } from "@phosphor-icons/react";
import type { UserRole, TabId } from "../types";

interface NavbarProps {
  role: UserRole;
  onRoleChange: (r: UserRole) => void;
  cartCount: number;
  onCartOpen: () => void;
  activeTab?: TabId;
  onNavigate?: (t: TabId) => void;
}

const roles: { id: UserRole; label: string; icon: typeof User }[] = [
  { id: "farmer", label: "Farmer", icon: User },
  { id: "buyer", label: "Buyer", icon: Users },
  { id: "logistics", label: "Logistics", icon: Truck },
];

export default function Navbar({ role, onRoleChange, cartCount, onCartOpen, activeTab, onNavigate }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-100/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-emerald-600" weight="fill" />
          <span className="text-lg font-bold tracking-tight text-emerald-900">AgriNovva</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Role Switcher */}
          <div className="flex rounded-lg border border-emerald-200 bg-emerald-50/50 p-0.5">
            {roles.map((r) => {
              const Icon = r.icon;
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    active ? "bg-white text-emerald-800 shadow-sm" : "text-emerald-600 hover:text-emerald-800"
                  }`}
                >
                  <Icon weight={active ? "fill" : "regular"} className="h-3.5 w-3.5" />
                  {r.label}
                </button>
              );
            })}
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate("agent-network")}
              className={`hidden items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all lg:inline-flex ${
                activeTab === "agent-network"
                  ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                  : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <Users weight={activeTab === "agent-network" ? "fill" : "regular"} className="h-4 w-4" />
              Agent Network
              <span className={`ml-1 hidden rounded-full px-1.5 py-0.5 text-[10px] xl:inline ${activeTab === "agent-network" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>Hub</span>
            </button>
          )}

          {/* Search */}
          <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50">
            <MagnifyingGlass className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-emerald-600 hover:bg-emerald-50">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          {/* Cart */}
          <button onClick={onCartOpen} className="relative rounded-lg p-2 text-emerald-600 hover:bg-emerald-50">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={onCartOpen} className="relative rounded-lg p-2 text-emerald-600">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-emerald-600">
            {menuOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-emerald-100 bg-white px-4 pb-4"
          >
            <div className="flex flex-col gap-2 pt-3">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => { onRoleChange(r.id); setMenuOpen(false); }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active ? "bg-emerald-100 text-emerald-800" : "text-emerald-600"
                    }`}
                  >
                    <Icon weight={active ? "fill" : "regular"} className="h-5 w-5" />
                    {r.label}
                  </button>
                );
              })}
              {onNavigate && (
                <button
                  onClick={() => { onNavigate("agent-network"); setMenuOpen(false); }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold ${activeTab === "agent-network" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700"}`}
                >
                  <Users weight={activeTab === "agent-network" ? "fill" : "regular"} className="h-5 w-5" /> Agent Network — Hub
                </button>
              )}
              <button onClick={() => setSearchOpen(!searchOpen)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-emerald-600">
                <MagnifyingGlass className="h-5 w-5" /> Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar Expand */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-emerald-100 bg-emerald-50/70 px-4 py-3"
          >
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2">
                <MagnifyingGlass className="h-4 w-4 text-emerald-400" />
                <input
                  placeholder="Search produce, farmers, shipments..."
                  className="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-emerald-300"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
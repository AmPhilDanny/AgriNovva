import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus, Key, Leaf, Shield, Camera, TrendUp,
  Lock, User, Phone, Envelope, MapPin, CheckCircle, ArrowRight, Buildings,
} from "@phosphor-icons/react";
import type { TabId, UserRole } from "../types";

interface AgentNetworkProps {
  onNavigate?: (t: TabId) => void;
  role?: UserRole;
  onAgentLogin?: () => void;
}

export default function AgentNetwork({ onNavigate, role, onAgentLogin }: AgentNetworkProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter email and password");
      return;
    }
    // Demo login — any credentials work
    onAgentLogin?.();
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-emerald-900 sm:text-3xl">Extension Agent Network</h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-stone-500">
            AgriNovva's verified extension agents deliver AI-powered diagnostics, farmer registration, and input verification across every LGA in Benue State.
          </p>
        </div>

        {/* Hero image — Farmer Support Centre & Crop, Disease & Weather Hub */}
        <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/images/AgriNovva_Hub.jpg"
            alt="AgriNovva Farmer Support Centre & Learning Hub with Crop, Disease & Weather Hub board — extension agent helping farmers"
            className="w-full h-auto object-cover max-h-[480px]"
          />
        </div>

        {/* How to Access an Agent + How It Works */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* How to Access */}
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-black text-emerald-900">How to Access an Agent</h3>
            <p className="mt-1 text-sm text-stone-500">Our agents are at solar-powered hubs across every LGA in Benue State</p>
            <div className="mt-4 space-y-3">
              {[
                { step: "1", title: "Visit a Hub", desc: "Walk into any AgriNovva Farmer Support Centre near you — we have hubs in communities across every state in Nigeria." },
                { step: "2", title: "Scan the QR Code", desc: "At the solar board, scan the QR code to download the app or connect to an agent instantly." },
                { step: "3", title: "Call an Agent", desc: "Dial the toll-free line 0800-AGRI-NOV, use USSD code *700*333# from any phone, or tap 'Agent Login' below to reach your nearest verified agent." },
                { step: "4", title: "Agent Comes to You", desc: "No transport? Our agents can visit your farm for a small fee covering transport and diagnosis. To save costs, bring a branch of the diseased crop to the nearest hub — our agents will scan and diagnose it on the spot for just a token." },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">{item.step}</span>
                  <div>
                    <p className="text-sm font-bold text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-black text-emerald-900">How AgriNovva Works</h3>
            <p className="mt-1 text-sm text-stone-500">From farm to market — verified at every step</p>
            <div className="mt-4 space-y-3">
              {[
                { icon: Camera, title: "Snap a Crop Photo", desc: "Point your phone at a diseased leaf. Our TFLite AI runs 100% offline — no internet needed." },
                { icon: Leaf, title: "Get AI Diagnosis", desc: "Identifies 38+ diseases (Early Blight, Red Rust, etc.) with treatment in Hausa, Yoruba, Igbo, Pidgin, or English." },
                { icon: Shield, title: "Verify Inputs", desc: "Scan QR codes on seeds, fertilizers, and pesticides to confirm authenticity before buying." },
                { icon: TrendUp, title: "Sell & Earn", desc: "Post verified produce to the marketplace. Track shipments. Get paid via escrow — fraud-free." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Icon className="h-4 w-4" weight="fill" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{item.title}</p>
                      <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Agent Login / Register CTA */}
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left — CTA text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                <Lock className="h-3.5 w-3.5" />
                Agent Portal — Verified Access Only
              </div>
              <h2 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">
                Are You an Extension Agent?
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-emerald-50">
                Access the agent dashboard to manage farmer registrations, run crop diagnoses, verify inputs, monitor investments, and submit LGA reports — all from one place.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  { icon: CheckCircle, text: "Farmer Registration" },
                  { icon: CheckCircle, text: "AI Crop Diagnosis" },
                  { icon: CheckCircle, text: "Input Verification" },
                  { icon: CheckCircle, text: "Investment Monitoring" },
                  { icon: CheckCircle, text: "Harvest Grading" },
                  { icon: CheckCircle, text: "LGA Reports" },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.text} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
                      <Icon className="h-4 w-4 text-emerald-300" weight="fill" />
                      <span className="text-xs font-medium text-white">{f.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => { setShowLogin(true); setShowRegister(false); }}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-emerald-700 shadow-lg transition hover:bg-emerald-50 active:scale-[0.98]"
                >
                  <Key className="h-5 w-5" weight="fill" />
                  Agent Login
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => { setShowRegister(true); setShowLogin(false); }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/15"
                >
                  <UserPlus className="h-5 w-4" />
                  Register as Agent
                </button>
              </div>
            </div>

            {/* Right — Silhouette / placeholder */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed border-white/20 bg-white/5">
                  <div className="text-center">
                    <User className="mx-auto h-16 w-16 text-white/30" weight="fill" />
                    <p className="mt-3 text-sm font-bold text-white/50">Agent Portal</p>
                    <p className="text-xs text-white/30">Login to access your dashboard</p>
                  </div>
                </div>
                {/* Floating dots */}
                <div className="absolute -left-6 top-8 h-3 w-3 rounded-full bg-emerald-400/40 animate-pulse" />
                <div className="absolute -right-4 bottom-12 h-4 w-4 rounded-full bg-emerald-300/30 animate-pulse" />
                <div className="absolute left-12 -bottom-4 h-2 w-2 rounded-full bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <Key className="h-7 w-7 text-emerald-600" weight="fill" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-stone-900">Agent Portal Login</h3>
                <p className="mt-1 text-sm text-stone-500">Enter your agent credentials to continue</p>
              </div>

              <form onSubmit={handleDemoLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700">Email</label>
                  <div className="relative mt-1">
                    <Envelope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="agent@agrinovva.ng"
                      className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Password</label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                {loginError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{loginError}</p>
                )}
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                  <p className="text-[11px] font-medium text-emerald-700">Demo: Enter any email + password to log in</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowLogin(false)} className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition">
                    Login →
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Register Modal */}
        {showRegister && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowRegister(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <UserPlus className="h-7 w-7 text-emerald-600" weight="fill" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-stone-900">Register as Extension Agent</h3>
                <p className="mt-1 text-sm text-stone-500">Join AgriNovva's verified agent network</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Registration submitted! (Demo)"); setShowRegister(false); }}>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Full Name</label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input type="text" placeholder="e.g., Adaeze Ibrahim" className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Phone Number</label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input type="tel" placeholder="080xxxxxxxx" className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Email</label>
                  <div className="relative mt-1">
                    <Envelope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input type="email" placeholder="agent@agrinovva.ng" className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Shop / Business Name</label>
                  <div className="relative mt-1">
                    <Buildings className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input type="text" placeholder="e.g., Ibrahim Agro Services" className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">LGA</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <select className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500">
                      <option value="">Select LGA</option>
                      <option value="Gboko">Gboko</option>
                      <option value="Makurdi">Makurdi</option>
                      <option value="Otukpo">Otukpo</option>
                      <option value="Katsina-Ala">Katsina-Ala</option>
                      <option value="Vandeikya">Vandeikya</option>
                      <option value="Gwer West">Gwer West</option>
                      <option value="Buruku">Buruku</option>
                      <option value="Tarka">Tarka</option>
                      <option value="Kwande">Kwande</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowRegister(false)} className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition">
                    Register →
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Thermometer, Clock, CheckCircle, CurrencyCircleDollar, ArrowRight, Warning, CaretDown, CaretUp, Eye, EyeSlash, Lock, Shield } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { SupplyChainShipment } from "../types";
import { INITIAL_SHIPMENTS } from "../constants";

const statusColors: Record<string, string> = {
  "pending": "bg-amber-100 text-amber-700 border-amber-200",
  "in-transit": "bg-blue-100 text-blue-700 border-blue-200",
  "delivered": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "disputed": "bg-red-100 text-red-700 border-red-200",
};

export default function SupplyChainTracker() {
  const [shipments, setShipments] = useState<SupplyChainShipment[]>(() => {
    const saved = localStorage.getItem("ah_shipments");
    return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
  });
  const [activeId, setActiveId] = useState(shipments[0]?.id ?? null);
  const [expanded, setExpanded] = useState(true);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [revealCode, setRevealCode] = useState("");
  const active = shipments.find((s) => s.id === activeId) ?? shipments[0];
  const isRevealed = active ? revealed.has(active.id) : false;
  const mask = (v: string | number) => (isRevealed ? String(v) : "•••••");
  const maskTemp = (t: number) => (isRevealed ? `${t}°C` : "••°C");

  useEffect(() => {
    localStorage.setItem("ah_shipments", JSON.stringify(shipments));
  }, [shipments]);

  const handleReleaseEscrow = (id: string) => {
    setShipments((prev) => prev.map((s) => s.id === id ? { ...s, escrowReleased: true, status: "delivered" as const, routeProgress: 100 } : s));
  };

  const getStatusLabel = (s: string) => {
    switch (s) {
      case "pending": return "Awaiting Dispatch";
      case "in-transit": return "In Transit";
      case "delivered": return "Delivered";
      case "disputed": return "Disputed";
      default: return s;
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">Supply Chain Tracker</h2>
          <p className="mt-1 text-sm text-stone-500">End-to-end tracking — secured consignments are masked until code is verified (logistics only).</p>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
              <Lock className="h-5 w-5" weight="fill" />
            </span>
            <div>
              <p className="text-sm font-bold text-amber-900">Secured Consignment — details masked</p>
              <p className="mt-0.5 text-xs leading-relaxed text-amber-700">Driver, escrow, exact location & cold chain are hidden. Enter tracking code to reveal only this shipment — everyone cannot see what is being transported.</p>
              <p className="mt-1 text-[11px] font-mono text-amber-700">Demo: BN-FARM-2025-001 (farmer) · BN-BUYER-2025-002 (buyer)</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <input value={revealCode} onChange={(e) => setRevealCode(e.target.value.toUpperCase())} placeholder="Enter code e.g. BN-FARM-2025-001" className="w-44 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-mono outline-none focus:border-amber-400" />
            <button
              onClick={() => {
                const code = revealCode.trim().toUpperCase();
                if (!code) { toast.error("Enter your tracking code"); return; }
                if (code !== active?.id.toUpperCase()) { toast.error("Code does not match this consignment — you can only see your own"); return; }
                setRevealed((prev) => new Set([...prev, active.id]));
                setRevealCode("");
                toast.success("Revealed — secured details unlocked for this consignment");
              }}
              className="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-amber-500"
            >
              <Eye className="h-3.5 w-3.5" /> Reveal
            </button>
            {isRevealed && (
              <button onClick={() => setRevealed((prev) => { const n = new Set(prev); n.delete(active.id); return n; })} className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-600">
                <EyeSlash className="h-3.5 w-3.5" /> Mask
              </button>
            )}
          </div>
        </div>

        {!active ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Truck className="h-10 w-10 text-stone-300" />
            <p className="mt-3 text-sm font-medium text-stone-500">No active shipments found.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Shipment List */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-100 px-4 py-3">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Active Shipments</p>
                </div>
                <div className="divide-y divide-stone-100">
                  {shipments.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveId(s.id)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all hover:bg-stone-50 ${
                        activeId === s.id ? "bg-emerald-50" : ""
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
                        <Truck className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate flex items-center gap-1">
                          {revealed.has(s.id) ? s.produceTitle : "•••••"} <span className="ml-1 font-mono text-[10px] text-stone-400">{revealed.has(s.id) ? s.id : "••••"}</span> {!revealed.has(s.id) && <Lock className="h-3 w-3 text-amber-500" weight="fill" />}
                        </p>
                        <p className="text-xs text-stone-500 truncate flex items-center gap-1">
                          {revealed.has(s.id) ? `${s.origin} → ${s.destination}` : "•••• → ••••"} {revealed.has(s.id) ? null : <Lock className="h-3 w-3 text-amber-500" weight="fill" />}
                        </p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${statusColors[s.status]}`}>
                        {getStatusLabel(s.status)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipment Detail */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-100 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                        {isRevealed ? active.produceTitle : "••••• — masked"} {!isRevealed && <Lock className="h-4 w-4 text-amber-500" weight="fill" />}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                        <MapPin className="h-3.5 w-3.5" weight="fill" />
                        {isRevealed ? `${active.origin} → ${active.destination}` : "•••• → •••• — masked, enter code to reveal"}
                        {!isRevealed && <Lock className="h-3 w-3 text-amber-500" weight="fill" />}
                      </div>
                      {!isRevealed && <p className="mt-1 text-[11px] font-mono text-amber-600">Code: •••• — enter code above to reveal this consignment</p>}
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[active.status]}`}>
                      {getStatusLabel(active.status)}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Route Progress */}
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between text-xs text-stone-500">
                      <span>Route Progress</span>
                      <span className="font-semibold text-emerald-700">{active.routeProgress}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${active.routeProgress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Cold Chain Temp */}
                  <div className="mb-6 rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                      <Thermometer className="h-3.5 w-3.5" />
                      Cold Chain Temperature
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-2xl font-bold text-stone-900">{maskTemp(active.coldStorageTemp)}</span>
                      <span className={`text-xs ${!isRevealed ? "text-amber-600" : active.coldStorageTemp <= 6 ? "text-emerald-600" : "text-amber-600"}`}>
                        {!isRevealed ? "Masked" : active.coldStorageTemp <= 6 ? "Optimal" : "Above threshold"}
                      </span>
                      {!isRevealed && <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 flex items-center gap-1"><Lock className="h-3 w-3" weight="fill" /> Masked</span>}
                    </div>
                    {/* Temp Log Mini Chart — masked until revealed */}
                    <div className="mt-3 flex items-end gap-1">
                      {active.tempLog.map((t, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-t-sm transition-all ${isRevealed ? "bg-gradient-to-t from-emerald-400 to-emerald-300" : "bg-stone-200"}`}
                            style={{ height: `${isRevealed ? Math.max(8, (t.temp / 8) * 32) : 12}px` }}
                          />
                          <span className="text-[10px] text-stone-400">{isRevealed ? t.time.split(" ").pop() : "••"}</span>
                        </div>
                      ))}
                    </div>
                    {!isRevealed && <p className="mt-1 text-[11px] text-amber-600 flex items-center gap-1"><Shield className="h-3 w-3" /> Cold chain log masked — reveal to see temps</p>}
                  </div>

                  {/* Steps Tracker */}
                  <div className="mb-6">
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="flex items-center gap-2 text-xs font-medium text-stone-500"
                    >
                      Shipment Steps
                      {expanded ? <CaretUp className="h-3 w-3" /> : <CaretDown className="h-3 w-3" />}
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 space-y-3 overflow-hidden"
                        >
                          {active.steps.map((step, i) => (
                            <div key={i} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                  step.completed ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-400"
                                }`}>
                                  {step.completed ? <CheckCircle className="h-4 w-4" weight="fill" /> : i + 1}
                                </div>
                                {i < active.steps.length - 1 && <div className="mt-1 h-full w-px bg-stone-200" />}
                              </div>
                              <div className="pb-4">
                                <p className={`text-sm font-medium ${step.completed ? "text-stone-900" : "text-stone-400"}`}>
                                  {step.label}
                                </p>
                                <p className="text-xs text-stone-400 flex items-center gap-1">
                                  {isRevealed ? `${step.timestamp} · ${step.location}` : "•••• ••:•• · •••• — masked"} {!isRevealed && <Lock className="h-3 w-3 text-amber-500" weight="fill" />}
                                </p>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Driver & Escrow */}
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Truck className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-900 flex items-center gap-1">{mask(active.driverName)} {!isRevealed && <Lock className="h-3 w-3 text-amber-500" weight="fill" />}</p>
                        <p className="text-xs text-stone-500">Driver {isRevealed ? "" : "— masked"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CurrencyCircleDollar className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{isRevealed ? `₦ ${active.escrowAmount.toLocaleString()}` : "₦ •••••"}</p>
                        <p className="text-xs text-stone-500 flex items-center gap-1">{active.escrowReleased ? "Released" : "In Escrow"} {!isRevealed && <Lock className="h-3 w-3 text-amber-500" weight="fill" />}</p>
                      </div>
                    </div>
                    {!active.escrowReleased && active.status !== "pending" && (
                      <button
                        onClick={() => handleReleaseEscrow(active.id)}
                        className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]"
                      >
                        Release Payment
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
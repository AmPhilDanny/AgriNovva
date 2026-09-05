import { useState } from "react";
import { motion } from "framer-motion";
import { Buildings, Users, Shield, TrendUp, MapPin, CheckCircle, Warning, CurrencyNgn, Package, Leaf, Wrench, TestTube, Tractor, HandHeart, ArrowRight } from "@phosphor-icons/react";
import type { TabId } from "../types";

type OfferTab = "fertilizer" | "seedlings" | "pesticides" | "tools" | "aids";

const OFFERS: Record<OfferTab, { title: string; items: { name: string; detail: string; price: string; eligibility: string; how: string }[] }> = {
  fertilizer: {
    title: "Fertilizer — Presidential Fertilizer Initiative (PFI) & NAGS-AP",
    items: [
      { name: "NPK 15-15-15 (Dangote) — Subsidized", detail: "50kg bag, NPK for maize/rice. Market ₦28,000 → Gov ₦18,500 (34% off). NAFDAC + QR verified.", price: "₦18,500 / bag", eligibility: "Verified farmer (NIN + farm geo-tag, any state)", how: "Apply via agent → QR at depot → pay 50% via escrow, balance after delivery" },
      { name: "Urea (Indorama) — Subsidized", detail: "46% N, for top-dressing. Market ₦32,000 → Gov ₦21,000. Limited 4 bags/farmer/season.", price: "₦21,000 / bag", eligibility: "Verified farmer, 0.5ha+ verified", how: "Agent verifies farm size → e-voucher SMS" },
      { name: "DAP — Dry Season Support", detail: "For wheat/irrigated rice (Kebbi, Jigawa, Benue). 2 bags free per ha for dry season.", price: "Free (2 bags/ha)", eligibility: "Dry season verified plot", how: "Via LGA Agric Dept + agent" },
    ],
  },
  seedlings: {
    title: "Seedlings — NASC Certified, Climate-Adapted",
    items: [
      { name: "FARO 44 Rice Seed (certified)", detail: "High-yield, blast-resistant. 25kg bag plants 1ha. Germination 95%.", price: "₦14,000 / 25kg", eligibility: "Any verified farmer", how: "Order via agent → QR batch verification" },
      { name: "SAMMAZ 52 Maize (drought-tolerant)", detail: "For North-Central & North-West. 10kg bag. Maturity 90 days.", price: "₦9,500 / 10kg", eligibility: "Verified farmer", how: "Agent + input verification" },
      { name: "TGx 1987-10F Soybean + Vitamin A Cassava Stems", detail: "Soybean rust-resistant + TME 419 cassava stems (50 bundles/ha).", price: "Soybean ₦12,000 / 25kg, Cassava free (50 bundles)", eligibility: "Benue, Oyo, Kaduna farmers prioritized", how: " via JOSTUM & NASC" },
    ],
  },
  pesticides: {
    title: "Pesticides — NAFDAC Approved, Subsidized",
    items: [
      { name: "Mancozeb 80% WP — Early Blight", detail: "For tomato/pepper. 500g sachet. Gov 40% off.", price: "₦3,200 (was ₦5,500)", eligibility: "Verified farmer with diagnosis", how: "Diagnose via AI Agronomy → agent prescribes → QR" },
      { name: "Triazole (Propiconazole) — Yellow Rust", detail: "For wheat. 250ml. Free for verified wheat farmers (NAGS-AP).", price: "Free / 250ml", eligibility: "Wheat plot verified", how: "Via agent" },
      { name: "Neem Oil + Pheromone Traps — Organic", detail: "For smallholders avoiding chemicals. Subsidized via State ADP.", price: "₦1,800 / litre", eligibility: "Any farmer (women priority)", how: "Via women cooperative + agent" },
    ],
  },
  tools: {
    title: "Tools & Implements — Mechanization Support",
    items: [
      { name: "Hello Tractor — Pay-per-use", detail: "Tractor + operator, ₦15,000/ha (market ₦25,000). Gov + AgriNovva subsidy.", price: "₦15,000 / ha", eligibility: "Verified farmer, 0.5ha+", how: "Book via agent → escrow → Hello Tractor dispatch" },
      { name: "Power Tiller & Planter — 50% Grant", detail: "For cooperatives (10+ farmers). Federal grant covers 50%.", price: "50% grant", eligibility: "Registered cooperative", how: "Apply via LGA + agent verification" },
      { name: "Knapsack Sprayer + Hand Tools Kit", detail: "Sprayer, hoe, cutlass, boots. For women & youth farmers.", price: "Free (1 kit/farmer)", eligibility: "Women/youth verified farmer", how: "Via Government + AgriNovva agents" },
    ],
  },
  aids: {
    title: "Aids & Support — Grants, Training & Insurance",
    items: [
      { name: "NAGS-AP Input Grant", detail: "₦50,000-₦150,000 per farmer/season for verified smallholders (0.5-2ha).", price: "Grant (not loan)", eligibility: "Verified farmer, NIN, farm geo-tag", how: "Agent registers → NIN verification → e-wallet" },
      { name: "NAIC Weather-Index Insurance — 50% Subsidy", detail: "Premium 3.5% → farmer pays 1.75%. Auto payout via satellite.", price: "₦875 / ₦50,000 cover", eligibility: "Verified farmer with investment", how: "Via Insurance tab + agent" },
      { name: "Training: Good Agronomic Practices", detail: "Monthly ADP training in Tiv, Idoma, Hausa, Yoruba, Igbo, Pidgin. Solar boards at markets.", price: "Free", eligibility: "Any farmer", how: "Via agent or solar board" },
    ],
  },
};

export default function GovernmentDashboard({ onNavigate }: { onNavigate?: (t: TabId) => void }) {
  const [activeOffer, setActiveOffer] = useState<OfferTab>("fertilizer");

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900">Government Dashboard — Nigeria</h2>
          <p className="mt-1 text-sm text-stone-500">Federal Ministry of Agriculture & Food Security + 36 States + FCT — offers, aids & inputs for farmers (via AgriNovva agents)</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4 mb-6">
          {[
            { label: "Verified Farmers (Nigeria)", value: "2.4M", sub: "on AgriNovva · 36 states", icon: Users },
            { label: "Active Agents", value: "1,600+", sub: "31x below FAO 1:800", icon: Shield },
            { label: "Federal Subsidy Disbursed", value: "₦ 2.3T", sub: "PFI + NAGS-AP 2024/25", icon: CurrencyNgn },
            { label: "States Covered", value: "36 + FCT", sub: "All geopolitical zones", icon: MapPin },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="mt-3 text-2xl font-bold text-stone-900">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-stone-700">{s.label}</p>
                <p className="text-[11px] text-stone-500">{s.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-6 flex gap-1.5 overflow-x-auto rounded-xl border border-stone-200 bg-stone-50 p-1">
          {(["fertilizer", "seedlings", "pesticides", "tools", "aids"] as OfferTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveOffer(tab)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${activeOffer === tab ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
            >
              {tab === "fertilizer" && "Fertilizer"}
              {tab === "seedlings" && "Seedlings"}
              {tab === "pesticides" && "Pesticides"}
              {tab === "tools" && "Tools & Implements"}
              {tab === "aids" && "Aids & Grants"}
            </button>
          ))}
        </div>

        <motion.div
          key={activeOffer}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm"
        >
          <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
            {activeOffer === "fertilizer" && <Package className="h-4 w-4" />}
            {activeOffer === "seedlings" && <Leaf className="h-4 w-4" />}
            {activeOffer === "pesticides" && <TestTube className="h-4 w-4" />}
            {activeOffer === "tools" && <Tractor className="h-4 w-4" />}
            {activeOffer === "aids" && <HandHeart className="h-4 w-4" />}
            {OFFERS[activeOffer].title}
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERS[activeOffer].items.map((it) => (
              <div key={it.name} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h4 className="text-sm font-bold text-stone-900">{it.name}</h4>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">{it.detail}</p>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Price</span><span className="font-bold text-emerald-700">{it.price}</span></div>
                  <div><span className="text-stone-500">Eligibility: </span><span className="text-stone-700">{it.eligibility}</span></div>
                  <div><span className="text-stone-500">How: </span><span className="text-stone-700">{it.how}</span></div>
                </div>
                <button
                  onClick={() => onNavigate?.("agent-network")}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-600"
                >
                  Find agent to apply <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-emerald-700/80">All offers verified via agent + NIN + farm geo-tag + QR. No agent → no subsidy (prevents diversion). Women & youth prioritized.</p>
        </motion.div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2"><Buildings className="h-4 w-4 text-emerald-600" /> Nigeria Coverage — 6 Geopolitical Zones</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {[
                "North Central — Benue, Nasarawa, Plateau, Kwara, Kogi, Niger, FCT",
                "North West — Kano, Kaduna, Katsina, Kebbi, Sokoto, Zamfara, Jigawa",
                "North East — Borno, Yobe, Adamawa, Bauchi, Gombe, Taraba",
                "South West — Lagos, Oyo, Ogun, Ondo, Osun, Ekiti",
                "South South — Rivers, Delta, Bayelsa, Edo, Cross River, Akwa Ibom",
                "South East — Enugu, Anambra, Imo, Abia, Ebonyi",
              ].map((z) => (
                <div key={z} className="rounded-lg bg-emerald-50 px-3 py-2.5 text-emerald-800 leading-relaxed">{z}</div>
              ))}
            </div>
            <p className="mt-3 text-xs text-stone-500">Solar boards & agents in every zone. Tiv/Idoma in Benue, Hausa in North, Yoruba in South-West, Igbo in South-East, Pidgin nationwide.</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2"><Warning className="h-4 w-4 text-amber-600" /> How to Access</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="rounded-lg bg-emerald-50 px-3 py-2.5"><span className="font-bold">1. Find Agent</span> — Agent Network tab → choose nearest (Gboko, Makurdi… or any state)</div>
              <div className="rounded-lg bg-blue-50 px-3 py-2.5"><span className="font-bold">2. Verify</span> — NIN + farm geo-tag + photo → instant verification</div>
              <div className="rounded-lg bg-amber-50 px-3 py-2.5"><span className="font-bold">3. Get Offer</span> — Fertilizer/seedling QR or e-voucher via SMS → pay via escrow</div>
              <div className="rounded-lg bg-purple-50 px-3 py-2.5"><span className="font-bold">4. Track</span> — Supply Chain code → delivery → escrow release</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

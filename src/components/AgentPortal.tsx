import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass, UserPlus, SealCheck, Star, MapPin, Shield,
  TrendUp, Camera, Eye, PencilSimple, Factory, Calculator, Leaf,
  PiggyBank, Buildings, Truck, ShoppingCart, X, SignOut, Funnel,
  Clock, Warning, CheckCircle, ArrowRight,
} from "@phosphor-icons/react";
import type { TabId, UserRole } from "../types";

interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  lga: string;
  state: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  rating: number;
  totalTransactions: number;
  bondedAmount: number;
  status: "active" | "suspended" | "pending" | "blacklisted";
  joinedDate: string;
  lastActive: string;
  verificationScore: number;
  photo: string;
  skills: string[];
  shopName: string;
  shopAddress: string;
}

const MOCK_AGENTS: Agent[] = [
  {
    id: "agt-001", name: "Adaeze Ibrahim", phone: "0803 456 7890", email: "adaeze.ibrahim@agrinovva.ng",
    location: "Gboko Main Market", lga: "Gboko", state: "Benue", tier: "gold", rating: 4.9,
    totalTransactions: 234, bondedAmount: 5000000, status: "active", joinedDate: "2024-01-15",
    lastActive: "2 hours ago", verificationScore: 96, photo: "/images/Adaeze.jpg",
    skills: ["Crop Diagnosis", "Farmer Registration", "Input Verification", "Harvest Grading"],
    shopName: "Ibrahim Agro Services", shopAddress: "Gboko Main Market, Stall 45",
  },
  {
    id: "agt-002", name: "Amara Bello", phone: "0805 678 9012", email: "amara.bello@agrinovva.ng",
    location: "Makurdi Modern Market", lga: "Makurdi", state: "Benue", tier: "platinum", rating: 4.8,
    totalTransactions: 412, bondedAmount: 10000000, status: "active", joinedDate: "2023-06-20",
    lastActive: "30 mins ago", verificationScore: 98, photo: "/images/Amara.jpg",
    skills: ["Crop Diagnosis", "Farmer Registration", "Investment Monitoring", "Financial Literacy Training"],
    shopName: "Bello Farm Connect", shopAddress: "Makurdi Modern Market, Block B, Shop 12",
  },
  {
    id: "agt-003", name: "Chidi Ochoga", phone: "0807 890 1234", email: "chidi.ochoga@agrinovva.ng",
    location: "Otukpo Central Market", lga: "Otukpo", state: "Benue", tier: "silver", rating: 4.5,
    totalTransactions: 89, bondedAmount: 2000000, status: "active", joinedDate: "2024-08-10",
    lastActive: "1 day ago", verificationScore: 82, photo: "/images/Chidi.jpg",
    skills: ["Crop Diagnosis", "Farmer Registration", "Harvest Grading"],
    shopName: "Ochoga Agro Hub", shopAddress: "Otukpo Central Market, Section C",
  },
  {
    id: "agt-004", name: "Fatima Abubakar", phone: "0809 012 3456", email: "fatima.abubakar@agrinovva.ng",
    location: "Katsina-Ala Market", lga: "Katsina-Ala", state: "Benue", tier: "bronze", rating: 4.2,
    totalTransactions: 34, bondedAmount: 1000000, status: "pending", joinedDate: "2024-11-01",
    lastActive: "3 hours ago", verificationScore: 75, photo: "/images/Fatima.jpg",
    skills: ["Crop Diagnosis", "Farmer Registration"],
    shopName: "Abubakar Farm Point", shopAddress: "Katsina-Ala Market, New Section",
  },
  {
    id: "agt-005", name: "Emeka Okonkwo", phone: "0810 123 4567", email: "emeka.okonkwo@agrinovva.ng",
    location: "Vandeikya Market", lga: "Vandeikya", state: "Benue", tier: "silver", rating: 4.6,
    totalTransactions: 156, bondedAmount: 3000000, status: "suspended", joinedDate: "2024-03-12",
    lastActive: "2 weeks ago", verificationScore: 88, photo: "/images/Emeka.jpg",
    skills: ["Crop Diagnosis", "Input Verification", "Harvest Grading", "Logistics Coordination"],
    shopName: "Okonkwo Agro Center", shopAddress: "Vandeikya Market, Old Wing",
  },
  {
    id: "agt-006", name: "Nneka Ogbu", phone: "0812 345 6789", email: "nneka.ogbu@agrinovva.ng",
    location: "Gwer West Market", lga: "Gwer West", state: "Benue", tier: "gold", rating: 4.7,
    totalTransactions: 198, bondedAmount: 5000000, status: "active", joinedDate: "2023-11-28",
    lastActive: "45 mins ago", verificationScore: 93, photo: "/images/Nneka.jpg",
    skills: ["Crop Diagnosis", "Farmer Registration", "Investment Monitoring", "Harvest Grading"],
    shopName: "Ogbu Farm Solutions", shopAddress: "Gwer West Market, Main Road",
  },
];

const tierColors = {
  bronze: "bg-amber-100 text-amber-700 border-amber-200",
  silver: "bg-slate-100 text-slate-700 border-slate-200",
  gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
  platinum: "bg-purple-100 text-purple-700 border-purple-200",
};

const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  suspended: "bg-amber-100 text-amber-700",
  pending: "bg-blue-100 text-blue-700",
  blacklisted: "bg-red-100 text-red-700",
};

export default function AgentPortal({ onNavigate, onLogout }: { onNavigate?: (t: TabId) => void; onLogout?: () => void }) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [activeTab, setActiveTab] = useState<"agents" | "audits" | "analytics">("agents");

  const filtered = useMemo(() => {
    return MOCK_AGENTS.filter((agent) => {
      const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.location.toLowerCase().includes(search.toLowerCase()) ||
        agent.lga.toLowerCase().includes(search.toLowerCase());
      const matchesTier = tierFilter === "all" || agent.tier === tierFilter;
      const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [search, tierFilter, statusFilter]);

  const getTierLabel = (tier: string) => tier.charAt(0).toUpperCase() + tier.slice(1);
  const getStatusLabel = (status: string) => status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Portal Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Agent Portal — Logged In
            </div>
            <h2 className="mt-2 text-2xl font-black text-emerald-900">Extension Agent Dashboard</h2>
            <p className="mt-1 text-sm text-stone-500">Manage agents, verify performance, audit field reports, track commissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowAddAgent(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600">
              <UserPlus className="h-4 w-4" />
              Add New Agent
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-100">
              <SignOut className="h-4 w-4" weight="fill" />
              Logout
            </button>
          </div>
        </div>

        {/* Agent Services Hub */}
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-emerald-900">Agent Services Hub</h3>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200">Tap any card → opens service</span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { id: "agri-advisor" as TabId, label: "Crop Diagnosis", sub: "AI + field photo", icon: Leaf, color: "bg-emerald-600" },
              { id: "input-verification" as TabId, label: "Input Verification", sub: "Seed & fertilizer QR", icon: Factory, color: "bg-blue-600" },
              { id: "supply-chain" as TabId, label: "Harvest & Supply Chain", sub: "Grading + logistics", icon: Truck, color: "bg-amber-600" },
              { id: "investment-exchange" as TabId, label: "Investment Monitoring", sub: "Track farmer funds", icon: PiggyBank, color: "bg-emerald-700" },
              { id: "price-contracts" as TabId, label: "Price & Escrow", sub: "Floor price + escrow", icon: Calculator, color: "bg-slate-700" },
              { id: "insurance" as TabId, label: "Insurance Assist", sub: "Enroll & claims", icon: Shield, color: "bg-teal-600" },
              { id: "marketplace" as TabId, label: "Marketplace Oversight", sub: "Listings & orders", icon: ShoppingCart, color: "bg-stone-700" },
              { id: "government" as TabId, label: "Government Report", sub: "LGA submission", icon: Buildings, color: "bg-purple-600" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate?.(s.id)}
                  className="group flex items-center gap-3 rounded-xl border border-white bg-white p-3 text-left shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.color} text-white shrink-0`}>
                    <Icon className="h-5 w-5" weight="fill" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-stone-900 group-hover:text-emerald-700">{s.label}</span>
                    <span className="block text-[11px] text-stone-500">{s.sub}</span>
                  </span>
                  <span className="ml-auto text-emerald-600">→</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-1">
          {["agents", "audits", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activeTab === tab ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
            >
              {tab === "agents" && "Agents Directory"}
              {tab === "audits" && "Field Audits"}
              {tab === "analytics" && "Performance Analytics"}
            </button>
          ))}
        </div>

        {activeTab === "agents" && (
          <>
            {/* Your Agent Capabilities */}
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-5 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-900">Your Agent Capabilities</h3>
              <p className="mt-1 text-xs text-stone-500">Everything you can do from this portal — one tap to start</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { icon: UserPlus, label: "Farmer Registration", sub: "NIN + geo-tag", color: "bg-emerald-100 text-emerald-700" },
                  { icon: Camera, label: "AI Crop Diagnosis", sub: "38 diseases, offline", color: "bg-sky-100 text-sky-700" },
                  { icon: Factory, label: "Input Verification", sub: "Seed & fertilizer QR", color: "bg-blue-100 text-blue-700" },
                  { icon: PiggyBank, label: "Investment Monitoring", sub: "Track farmer funds", color: "bg-amber-100 text-amber-700" },
                  { icon: Leaf, label: "Harvest Grading", sub: "Quality + pricing", color: "bg-violet-100 text-violet-700" },
                  { icon: Buildings, label: "LGA Reports", sub: "Gov compliance", color: "bg-purple-100 text-purple-700" },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm border border-white">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${f.color}`}>
                        <Icon className="h-4 w-4" weight="fill" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 leading-tight">{f.label}</p>
                        <p className="text-[10px] text-stone-500 leading-tight">{f.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search agent, location, LGA..."
                    className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none">
                  <option value="all">All Tiers</option>
                  <option value="platinum">Platinum</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="blacklisted">Blacklisted</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <SealCheck className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-stone-500">Active Agents</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-emerald-800">{MOCK_AGENTS.filter(a => a.status === "active").length}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" weight="fill" />
                  <span className="text-sm font-medium text-stone-500">Avg Rating</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-emerald-800">{(MOCK_AGENTS.reduce((sum, a) => sum + a.rating, 0) / MOCK_AGENTS.length).toFixed(1)}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendUp className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-stone-500">Total Transactions</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-emerald-800">{MOCK_AGENTS.reduce((sum, a) => sum + a.totalTransactions, 0).toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-stone-500">Total Bonded</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-emerald-800">₦{MOCK_AGENTS.reduce((sum, a) => sum + a.bondedAmount, 0).toLocaleString()}</p>
              </div>
            </div>

            {/* Agents Grid — photos + full details */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((agent) => (
                <motion.div
                  key={agent.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedAgent(agent)}
                  className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden bg-stone-100">
                    <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 left-2 right-2 flex justify-between">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${tierColors[agent.tier]}`}>
                        {getTierLabel(agent.tier)} Tier
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[agent.status]}`}>
                        {getStatusLabel(agent.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-stone-900">{agent.name}</h3>
                    <p className="mt-1 text-xs text-stone-500">{agent.shopName}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                      <MapPin className="h-3 w-3" weight="fill" />
                      {agent.lga}, {agent.state}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-500" weight="fill" />
                        <span className="text-sm font-medium text-stone-700">{agent.rating}</span>
                      </div>
                      <span className="text-xs text-stone-500">{agent.totalTransactions} txns</span>
                    </div>
                    <div className="mt-2 text-xs text-stone-500">
                      Bonded: ₦{agent.bondedAmount.toLocaleString()} · Score: {agent.verificationScore}/100
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === "audits" && (
          <div className="space-y-4">
            {[
              { agent: "Adaeze Ibrahim", type: "Investment Monitoring", farm: "Amina Bello - Rice Farm", date: "2025-01-15", status: "completed", score: 95, photos: 12, issues: 0 },
              { agent: "Amara Bello", type: "Farmer Verification", farm: "Ibrahim Musa - Maize Farm", date: "2025-01-14", status: "completed", score: 98, photos: 8, issues: 0 },
              { agent: "Chidi Ochoga", type: "Input Verification", farm: "Grace Okafor - Soybean Farm", date: "2025-01-13", status: "pending_review", score: 87, photos: 6, issues: 1 },
              { agent: "Fatima Abubakar", type: "Harvest Grading", farm: "Yusuf Abdullahi - Yam Farm", date: "2025-01-12", status: "flagged", score: 72, photos: 4, issues: 2 },
              { agent: "Nneka Ogbu", type: "Crop Diagnosis", farm: "Fatima Ibrahim - Groundnut Farm", date: "2025-01-11", status: "completed", score: 94, photos: 10, issues: 0 },
            ].map((audit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-stone-900">{audit.type} Audit</h3>
                    <p className="text-sm text-stone-500">{audit.agent} · {audit.farm} · {audit.date}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${audit.status === "completed" ? "bg-emerald-100 text-emerald-700" : audit.status === "pending_review" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {audit.status.replace("_", " ")}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                  <div><span className="text-stone-500">Score</span> <p className="font-bold text-emerald-700">{audit.score}/100</p></div>
                  <div><span className="text-stone-500">Photos</span> <p className="font-bold">{audit.photos}</p></div>
                  <div><span className="text-stone-500">Issues</span> <p className="font-bold">{audit.issues}</p></div>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                      <Eye className="mr-1 h-3 w-3" /> Review
                    </button>
                    <button className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600">
                      <PencilSimple className="mr-1 h-3 w-3" /> Note
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-medium text-stone-500">Performance by Tier</h3>
              <div className="mt-4 space-y-3">
                {["platinum", "gold", "silver", "bronze"].map((tier) => (
                  <div key={tier} className="flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tierColors[tier]}`}>{getTierLabel(tier)}</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-2 overflow-hidden rounded-full bg-stone-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: tier === "platinum" ? "100%" : tier === "gold" ? "85%" : tier === "silver" ? "65%" : "40%" }} />
                      </div>
                      <span className="text-xs font-medium">{tier === "platinum" ? "98%" : tier === "gold" ? "92%" : tier === "silver" ? "78%" : "65%"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-medium text-stone-500">Monthly Transactions</h3>
              <div className="mt-4 h-32 flex items-end justify-between gap-1">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                  <div key={month} className="flex-1 flex flex-col items-center">
                    <div className="w-full rounded-t bg-emerald-500" style={{ height: `${30 + i * 10}%` }} />
                    <span className="mt-1 text-xs text-stone-500">{month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:col-span-2">
              <h3 className="text-sm font-medium text-stone-500">Geographic Coverage (Benue State)</h3>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                {["Gboko", "Makurdi", "Otukpo", "Katsina-Ala", "Vandeikya", "Gwer West", "Buruku", "Tarka", "Kwande"].map((lga) => (
                  <div key={lga} className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-emerald-700">{lga}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agent Detail Modal */}
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={selectedAgent.photo} alt={selectedAgent.name} className="h-full w-full object-cover" />
                <button onClick={() => setSelectedAgent(null)} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${tierColors[selectedAgent.tier]}`}>
                    {getTierLabel(selectedAgent.tier)} Tier
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[selectedAgent.status]}`}>
                    {getStatusLabel(selectedAgent.status)}
                  </span>
                  <span className="rounded-full bg-emerald-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    <SealCheck className="mr-1 inline h-3 w-3" weight="fill" />
                    Verified: {selectedAgent.verificationScore}%
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{selectedAgent.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{selectedAgent.shopName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-800">{selectedAgent.rating}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" weight="fill" />
                      <span className="text-xs text-stone-500">{selectedAgent.totalTransactions} txns</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-stone-600">
                  <div><span className="font-medium">Phone:</span> {selectedAgent.phone}</div>
                  <div><span className="font-medium">Email:</span> {selectedAgent.email}</div>
                  <div><span className="font-medium">Location:</span> {selectedAgent.location}</div>
                  <div><span className="font-medium">LGA:</span> {selectedAgent.lga}, {selectedAgent.state}</div>
                  <div><span className="font-medium">Joined:</span> {selectedAgent.joinedDate}</div>
                  <div><span className="font-medium">Last Active:</span> {selectedAgent.lastActive}</div>
                  <div className="col-span-2"><span className="font-medium">Shop Address:</span> {selectedAgent.shopAddress}</div>
                  <div className="col-span-2"><span className="font-medium">Bonded Amount:</span> ₦{selectedAgent.bondedAmount.toLocaleString()}</div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-stone-700">Skills & Certifications</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedAgent.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                    <Eye className="mr-1 h-4 w-4" /> View Field Reports
                  </button>
                  <button className="flex-1 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                    <TrendUp className="mr-1 h-4 w-4" /> Performance History
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Add Agent Modal */}
        {showAddAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowAddAgent(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-stone-900">Add New Agent</h3>
                <button onClick={() => setShowAddAgent(false)} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Agent added! (Demo)"); setShowAddAgent(false); }}>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Full Name</label>
                  <input type="text" className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="Enter agent name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Phone Number</label>
                  <input type="tel" className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="080xxxxxxxx" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Email</label>
                  <input type="email" className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="agent@agrinovva.ng" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Shop Name</label>
                  <input type="text" className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="e.g., Agro Services Ltd" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">LGA</label>
                  <select className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500">
                    <option value="">Select LGA</option>
                    {["Gboko", "Makurdi", "Otukpo", "Katsina-Ala", "Vandeikya", "Gwer West", "Buruku", "Tarka", "Kwande"].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Initial Tier</label>
                  <select className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500">
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddAgent(false)} className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">
                    Add Agent
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

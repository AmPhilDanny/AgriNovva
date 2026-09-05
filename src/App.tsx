import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Grains, Truck, Users, X, ShoppingCart, Trash, Leaf, ArrowRight, PiggyBank, Shield, Buildings, Factory, SealCheck, FileText, Calculator, HandHeart, MapPin, Download } from "@phosphor-icons/react";
import type { UserRole, CartItem, EscrowOrder, TabId, SupplyChainShipment } from "./types";
import { INITIAL_SHIPMENTS } from "./constants";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MarketplaceSection from "./components/MarketplaceSection";
import SupplyChainTracker from "./components/SupplyChainTracker";
import AgriToolsAdvisor from "./components/AgriToolsAdvisor";
import InvestmentExchange from "./components/InvestmentExchange";
import AgentNetwork from "./components/AgentNetwork";
import InsuranceProducts from "./components/InsuranceProducts";
import GovernmentDashboard from "./components/GovernmentDashboard";
import DownloadApp from "./components/DownloadApp";
import InputVerification from "./components/InputVerification";
import PriceContracts from "./components/PriceContracts";

const TABS: { id: TabId; label: string; icon: typeof Leaf; roles: UserRole[] }[] = [
  { id: "marketplace", label: "Marketplace", icon: ShoppingCart, roles: ["farmer", "buyer", "logistics"] },
  { id: "supply-chain", label: "Supply Chain", icon: Truck, roles: ["logistics"] },
  { id: "agri-advisor", label: "AI Agronomy", icon: Leaf, roles: ["farmer"] },
  { id: "investment-exchange", label: "Investment Exchange", icon: PiggyBank, roles: ["farmer", "buyer"] },
  { id: "agent-network", label: "Agent Network", icon: Users, roles: ["farmer", "buyer", "logistics"] },
  { id: "insurance", label: "Insurance", icon: Shield, roles: ["farmer", "buyer"] },
  { id: "government", label: "Government", icon: Buildings, roles: ["logistics"] },
  { id: "input-verification", label: "Input Verification", icon: Factory, roles: ["farmer", "buyer", "logistics"] },
  { id: "price-contracts", label: "Price Contracts", icon: Calculator, roles: ["farmer", "buyer"] },
  { id: "dashboard", label: "Dashboard", icon: Grains, roles: ["farmer", "buyer", "logistics"] },
  { id: "download-app", label: "Download App", icon: Download, roles: ["farmer", "buyer", "logistics"] },
];

const ROLE_DASHBOARD: Record<UserRole, { title: string; stats: { label: string; value: string; icon: typeof Leaf }[] }> = {
  farmer: {
    title: "Farmer Dashboard",
    stats: [
      { label: "Active Listings", value: "12", icon: Leaf },
      { label: "Total Harvest (kg)", value: "18,500", icon: Grains },
      { label: "Pending Orders", value: "4", icon: ShoppingCart },
      { label: "Revenue (30d)", value: "₦ 142,000", icon: Truck },
    ],
  },
  buyer: {
    title: "Buyer Dashboard",
    stats: [
      { label: "Active Orders", value: "6", icon: ShoppingCart },
      { label: "In Escrow", value: "₦ 28,500", icon: Truck },
      { label: "Saved Farmers", value: "15", icon: Users },
      { label: "Orders Delivered", value: "23", icon: Leaf },
    ],
  },
  logistics: {
    title: "Logistics Dashboard",
    stats: [
      { label: "Active Routes", value: "3", icon: Truck },
      { label: "Fleet Utilization", value: "78%", icon: Grains },
      { label: "On-Time Delivery", value: "94%", icon: Leaf },
      { label: "Pending Pickups", value: "5", icon: Users },
    ],
  },
};

const ROLE_SERVICES: Record<UserRole, { id: TabId; label: string; desc: string; icon: typeof Leaf }[]> = {
  farmer: [
    { id: "marketplace", label: "Sell Harvest", desc: "List & sell produce", icon: ShoppingCart },
    { id: "agri-advisor", label: "Diagnose Crops", desc: "AI + photo", icon: Leaf },
    { id: "investment-exchange", label: "Get Funded", desc: "Investors fund you", icon: PiggyBank },
    { id: "input-verification", label: "Verify Inputs", desc: "Seed QR check", icon: Factory },
    { id: "price-contracts", label: "Lock Price", desc: "Floor price escrow", icon: Calculator },
    { id: "insurance", label: "Insure Crops", desc: "Weather-index", icon: Shield },
    { id: "supply-chain", label: "Track Harvest", desc: "Grading + delivery", icon: Truck },
    { id: "agent-network", label: "My Agent", desc: "Extension support", icon: Users },
  ],
  buyer: [
    { id: "marketplace", label: "Buy Produce", desc: "Verified listings", icon: ShoppingCart },
    { id: "investment-exchange", label: "Fund Farms", desc: "35% share", icon: PiggyBank },
    { id: "price-contracts", label: "Forward Buy", desc: "Lock supply", icon: Calculator },
    { id: "supply-chain", label: "Track Orders", desc: "Use code", icon: Truck },
    { id: "input-verification", label: "Verify Quality", desc: "QR + lab", icon: Factory },
    { id: "insurance", label: "Protect Investment", desc: "Yield cover", icon: Shield },
    { id: "agent-network", label: "Agent Network", desc: "Verified agents", icon: Users },
  ],
  logistics: [
    { id: "supply-chain", label: "Manage Routes", desc: "Fleet & pickups", icon: Truck },
    { id: "government", label: "LGA Reports", desc: "Gov compliance", icon: Buildings },
    { id: "agent-network", label: "Manage Agents", desc: "Audits + tiers", icon: Users },
    { id: "input-verification", label: "Verify Transit", desc: "Inputs in transit", icon: Factory },
    { id: "marketplace", label: "View Orders", desc: "All listings", icon: ShoppingCart },
  ],
};

export default function App() {
  const [role, setRole] = useState<UserRole>("buyer");
  const [activeTab, setActiveTab] = useState<TabId>("marketplace");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("ah_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<EscrowOrder[]>(() => {
    const saved = localStorage.getItem("ah_orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogisticsModal, setShowLogisticsModal] = useState(false);
  const [logisticsCode, setLogisticsCode] = useState("");
  const [logisticsResult, setLogisticsResult] = useState<SupplyChainShipment | null>(null);

  useEffect(() => {
    localStorage.setItem("ah_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("ah_orders", JSON.stringify(orders));
  }, [orders]);

  // Reset tab when role changes to something inaccessible
  useEffect(() => {
    const tab = TABS.find((t) => t.id === activeTab);
    if (tab && !tab.roles.includes(role)) {
      const firstAvailable = TABS.find((t) => t.roles.includes(role));
      if (firstAvailable) setActiveTab(firstAvailable.id);
    }
  }, [role, activeTab]);

  const handleAddToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.produceId === item.produceId);
      if (existing) {
        return prev.map((c) => c.produceId === item.produceId ? { ...c, qty: c.qty + item.qty } : c);
      }
      return [...prev, item];
    });
    toast.success(`Added ${item.qty}kg of ${item.title} to cart`);
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.produceId !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const total = cart.reduce((sum, c) => sum + c.pricePerKg * c.qty, 0);
    const order: EscrowOrder = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items: [...cart],
      totalAmount: total,
      status: "pending",
      timestamp: new Date().toISOString(),
      buyerName: "Current Buyer",
      farmerName: cart[0].farmerName,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCartOpen(false);
    toast.success("Escrow order placed successfully!");
  }, [cart]);

  const availableTabs = TABS.filter((t) => t.roles.includes(role));
  const dashConfig = ROLE_DASHBOARD[role];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Toaster position="top-right" richColors />
      <Navbar role={role} onRoleChange={setRole} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} activeTab={activeTab} onNavigate={setActiveTab} />

      <HeroBanner role={role} />

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6">
          {availableTabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-all sm:text-sm ${
                  active ? "border-emerald-600 text-emerald-700" : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                <Icon className="h-4 w-4" weight={active ? "fill" : "regular"} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "marketplace" && (
            <MarketplaceSection cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} role={role} onNavigate={setActiveTab} />
          )}
          {activeTab === "supply-chain" && <SupplyChainTracker />}
          {activeTab === "agri-advisor" && <AgriToolsAdvisor />}
          {activeTab === "investment-exchange" && <InvestmentExchange />}
          {activeTab === "agent-network" && <AgentNetwork onNavigate={setActiveTab} role={role} />}
          {activeTab === "insurance" && <InsuranceProducts />}
          {activeTab === "government" && <GovernmentDashboard onNavigate={setActiveTab} />}
          {activeTab === "input-verification" && <InputVerification />}
          {activeTab === "price-contracts" && <PriceContracts />}
          {activeTab === "download-app" && <DownloadApp />}
          {activeTab === "dashboard" && (
            <section className="py-8 sm:py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <h2 className="text-2xl font-bold text-emerald-900">{dashConfig.title}</h2>
                <p className="mt-1 text-sm text-stone-500">Overview of your activity and key metrics</p>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {dashConfig.stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                          <Icon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="mt-3 text-2xl font-bold text-stone-900">{s.value}</p>
                        <p className="mt-1 text-xs text-stone-500">{s.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Organized Services Hub — wired per role */}
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-emerald-900">Your Services — {role === "farmer" ? "Farmer Hub" : role === "buyer" ? "Buyer Hub" : "Logistics Hub"}</h3>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200">One tap → opens service</span>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {ROLE_SERVICES[role].map((s) => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.id}
                          onClick={() => {
                            if (s.id === "supply-chain" && role !== "logistics") {
                              setShowLogisticsModal(true);
                            } else {
                              setActiveTab(s.id);
                            }
                          }}
                          className="group flex items-center gap-3 rounded-xl border border-white bg-white p-3 text-left shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shrink-0">
                            <Icon className="h-5 w-5" weight="fill" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-bold text-stone-900 group-hover:text-emerald-700">{s.label}</span>
                            <span className="block text-[11px] text-stone-500">{s.desc}</span>
                          </span>
                          <span className="ml-auto text-emerald-600">→</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[11px] text-emerald-700/80">
                    {role === "farmer" && "Sell → diagnose → verify inputs → lock price → insure → track via agent."}
                    {role === "buyer" && "Buy → fund farms → forward price → track escrow → verify quality via agent."}
                    {role === "logistics" && "Routes → verify transit → manage agents → government reports → escrow oversight."}
                  </p>
                </div>

                {role === "logistics" && (
                  <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2"><SealCheck className="h-4 w-4 text-emerald-600" /> Farmer & Buyer Verification Queue</h3>
                    <p className="mt-1 text-xs text-stone-500">Check and verify if user is a farmer or buyer — approve posting/trading rights before escrow.</p>
                    <div className="mt-4 space-y-3">
                      {[
                        { name: "Amina Bello", role: "farmer" as const, location: "Gboko, Benue", docs: "NIN, farm geo-tag, agent Adaeze — pending field check" },
                        { name: "Chidi Ochoga", role: "farmer" as const, location: "Otukpo, Benue", docs: "NIN, 5ha maize, input QR verified" },
                        { name: "Ibrahim Musa", role: "buyer" as const, location: "Makurdi, Benue", docs: "CAC, escrow KYC, limit ₦5M" },
                        { name: "Fatima Ibrahim", role: "buyer" as const, location: "Lagos Hub", docs: "BVN verified — already verified" },
                      ].map((u) => (
                        <div key={u.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-stone-100 bg-stone-50 p-3">
                          <div className="flex gap-3">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${u.role === "farmer" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                              <Users className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-stone-900">{u.name} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${u.role === "farmer" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{u.role}</span></p>
                              <p className="text-xs text-stone-500">{u.location} · {u.docs}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${u.name === "Fatima Ibrahim" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>{u.name === "Fatima Ibrahim" ? "verified" : "pending"}</span>
                            {u.name !== "Fatima Ibrahim" ? (
                              <button onClick={() => toast.success(`${u.name} verified as ${u.role} — now can ${u.role === "farmer" ? "post produce" : "place orders"}`)} className="rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600">Verify</button>
                            ) : (
                              <span className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-500">Verified</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] text-stone-500">Farmers need agent + NIN to post (Marketplace → Post Produce). Buyers need KYC to fund (Investment Exchange). Logistics confirms both before escrow.</p>
                  </div>
                )}

                {(role === "farmer" || role === "buyer") && (
                  <div className="mt-8 rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2"><Truck className="h-4 w-4 text-emerald-600" /> Track Your Supply — Secure</h3>
                    <p className="mt-1 text-xs text-stone-500">Choose your role and enter your tracking code — you will only see your own shipment. Everyone cannot see what is being transported.</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-mono font-bold text-emerald-700 border border-emerald-200">Farmer demo: BN-FARM-2025-001</span>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 font-mono font-bold text-blue-700 border border-blue-200">Buyer demo: BN-BUYER-2025-002</span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium">
                        <option value="farmer">I am Farmer</option>
                        <option value="buyer">I am Buyer</option>
                      </select>
                      <input value={logisticsCode} onChange={(e) => setLogisticsCode(e.target.value.toUpperCase())} placeholder="Enter code e.g. BN-FARM-2025-001" className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-mono outline-none focus:border-emerald-500" />
                      <button
                        onClick={() => {
                          const code = logisticsCode.trim().toUpperCase();
                          if (!code) { toast.error("Enter your tracking code"); return; }
                          const isFarmerCode = code.includes("FARM");
                          const isBuyerCode = code.includes("BUYER");
                          if ((role === "farmer" && isBuyerCode) || (role === "buyer" && isFarmerCode)) {
                            toast.error(`This code is for ${isFarmerCode ? "farmer" : "buyer"} — switch role to view`);
                            setLogisticsResult(null);
                            return;
                          }
                          const all: SupplyChainShipment[] = (() => { try { const s = localStorage.getItem("ah_shipments"); return s ? JSON.parse(s) : INITIAL_SHIPMENTS; } catch { return INITIAL_SHIPMENTS; } })();
                          const found = all.find(s => s.id.toUpperCase() === code);
                          if (found) {
                            const owns = (role === "farmer" && found.id.includes("FARM")) || (role === "buyer" && found.id.includes("BUYER")) || found.id.startsWith("s");
                            if (!owns && (found.id.includes("FARM") || found.id.includes("BUYER"))) {
                              toast.error("You can only see your own supply — this shipment belongs to another role");
                              setLogisticsResult(null);
                              return;
                            }
                            setLogisticsResult(found);
                            toast.success(`Found ${found.produceTitle} — ${found.status}`);
                          } else {
                            setLogisticsResult(null);
                            toast.error("Code not found — use demo codes above");
                          }
                        }}
                        className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                      >
                        Track
                      </button>
                    </div>
                    {logisticsResult && (
                      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                        <p className="text-xs font-bold text-stone-900">{logisticsResult.produceTitle} — {logisticsResult.id}</p>
                        <p className="text-[11px] text-stone-600">{logisticsResult.origin} → {logisticsResult.destination} · Driver {logisticsResult.driverName}</p>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                          <div className="h-full bg-emerald-500" style={{ width: `${logisticsResult.routeProgress}%` }} />
                        </div>
                        <p className="mt-1 text-[11px] text-stone-600">{logisticsResult.routeProgress}% · {logisticsResult.status} · Escrow ₦{logisticsResult.escrowAmount.toLocaleString()} {logisticsResult.escrowReleased ? "(released)" : "(in escrow)"}</p>
                      </div>
                    )}
                    <p className="mt-2 text-[11px] text-stone-500">Security: farmer codes start with <span className="font-mono font-bold">BN-FARM</span>, buyer codes with <span className="font-mono font-bold">BN-BUYER</span> — only your code shows your chain.</p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-stone-900">Quick Actions</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 active:scale-[0.98]">
                      {role === "farmer" ? "List New Harvest" : role === "buyer" ? "Browse Produce" : "View Fleet"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 transition-all hover:bg-stone-50">
                      View Reports
                    </button>
                  </div>
                </div>
                {/* Recent Orders */}
                {orders.length > 0 && (
                  <div className="mt-6 rounded-xl border border-stone-200 bg-white shadow-sm">
                    <div className="border-b border-stone-100 px-5 py-3">
                      <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Recent Escrow Orders</p>
                    </div>
                    <div className="divide-y divide-stone-100">
                      {orders.slice(0, 5).map((o) => (
                        <div key={o.id} className="flex items-center justify-between px-5 py-3">
                          <div>
                            <p className="text-sm font-medium text-stone-900">{o.id}</p>
                            <p className="text-xs text-stone-500">{o.items.length} items · {new Date(o.timestamp).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-stone-900">₦{o.totalAmount.toFixed(2)}</p>
                            <span className={`text-xs font-medium ${
                              o.status === "released" ? "text-emerald-600" : o.status === "disputed" ? "text-red-600" : "text-amber-600"
                            }`}>
                              {o.status === "pending" ? "In Escrow" : o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-emerald-600" weight="fill" />
                  <span className="text-sm font-semibold text-stone-900">Shopping Cart</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">{cart.length}</span>
                </div>
                <button onClick={() => setCartOpen(false)} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Leaf className="h-12 w-12 text-stone-200" />
                    <p className="mt-3 text-sm font-medium text-stone-500">Your cart is empty</p>
                    <p className="mt-1 text-xs text-stone-400">Browse the marketplace to add produce</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.produceId} className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 p-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-stone-900">{item.title}</p>
                          <p className="text-xs text-stone-500">{item.qty}kg × ₦{item.pricePerKg.toFixed(2)}</p>
                          <p className="text-xs font-semibold text-emerald-700">₦{(item.pricePerKg * item.qty).toFixed(2)}</p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.produceId)} className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-500">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t border-stone-200 px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-500">Total</span>
                    <span className="text-lg font-bold text-emerald-800">
                      ₦{cart.reduce((sum, c) => sum + c.pricePerKg * c.qty, 0).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]"
                  >
                    Place Escrow Order
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logistics Market — farmer/buyer order & track (Supply Chain tab is logistics-only) */}
      <AnimatePresence>
        {showLogisticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowLogisticsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white">
                      <Truck className="h-5 w-5" weight="fill" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-stone-900">Logistics Market</h3>
                      <p className="mt-1 text-xs leading-relaxed text-stone-500">
                        {role === "farmer" ? "Order pickup for your harvest — we assign a driver & escrow." : "Order delivery for your purchase — track with code."}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowLogisticsModal(false)} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-xs font-bold text-stone-700">Track Supply — secure (choose role + code)</p>
                  <p className="mt-1 text-[11px] text-stone-500">You will only see your own shipment — everyone cannot see what is being transported.</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button onClick={() => { setRole("farmer"); setLogisticsCode("BN-FARM-2025-001"); }} className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">Use Farmer Demo</button>
                    <button onClick={() => { setRole("buyer"); setLogisticsCode("BN-BUYER-2025-002"); }} className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[11px] font-bold text-blue-700">Use Buyer Demo</button>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium">
                      <option value="farmer">I am Farmer</option>
                      <option value="buyer">I am Buyer</option>
                      <option value="logistics">I am Logistics</option>
                    </select>
                    <input value={logisticsCode} onChange={(e) => setLogisticsCode(e.target.value.toUpperCase())} placeholder="e.g. BN-FARM-2025-001" className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-mono outline-none focus:border-emerald-500" />
                    <button
                      onClick={() => {
                        const code = logisticsCode.trim().toUpperCase();
                        if (!code) { toast.error("Enter your tracking code"); return; }
                        const isFarmerCode = code.includes("FARM");
                        const isBuyerCode = code.includes("BUYER");
                        if ((role === "farmer" && isBuyerCode) || (role === "buyer" && isFarmerCode)) {
                          toast.error(`This code is for ${isFarmerCode ? "farmer" : "buyer"} — switch role to view`);
                          setLogisticsResult(null);
                          return;
                        }
                        const all: SupplyChainShipment[] = (() => {
                          try { const s = localStorage.getItem("ah_shipments"); return s ? JSON.parse(s) : INITIAL_SHIPMENTS; } catch { return INITIAL_SHIPMENTS; }
                        })();
                        const found = all.find(s => s.id.toUpperCase() === code);
                        if (found) {
                          const owns = (role === "farmer" && found.id.includes("FARM")) || (role === "buyer" && found.id.includes("BUYER")) || role === "logistics" || found.id.startsWith("s");
                          if (!owns && (found.id.includes("FARM") || found.id.includes("BUYER"))) {
                            toast.error("You can only see your own supply — this shipment belongs to another role");
                            setLogisticsResult(null);
                            return;
                          }
                          setLogisticsResult(found); toast.success(`Found ${found.produceTitle} — ${found.status}`);
                        } else { setLogisticsResult(null); toast.error("Code not found — use demo codes above"); }
                      }}
                      className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                    >
                      Track
                    </button>
                  </div>
                  {logisticsResult && (
                    <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3">
                      <p className="text-xs font-bold text-stone-900">{logisticsResult.produceTitle}</p>
                      <p className="text-[11px] text-stone-500">{logisticsResult.origin} → {logisticsResult.destination} · Driver {logisticsResult.driverName}</p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
                        <div className="h-full bg-emerald-500" style={{ width: `${logisticsResult.routeProgress}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500">{logisticsResult.routeProgress}% · {logisticsResult.status} · Escrow ₦{logisticsResult.escrowAmount.toLocaleString()} {logisticsResult.escrowReleased ? "(released)" : "(in escrow)"}</p>
                      <button onClick={() => { setShowLogisticsModal(false); if (role === "logistics") setActiveTab("supply-chain"); }} className="mt-2 text-xs font-semibold text-emerald-700 underline">
                        {role === "logistics" ? "Open full Supply Chain Tracker →" : "Logistics will update you via SMS — save this code"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
                  <p className="text-xs font-bold text-stone-700">Order Logistics — {role === "farmer" ? "pickup from farm" : "delivery to you"}</p>
                  <div className="mt-2 grid gap-2">
                    <input id="logi-produce" placeholder={role === "farmer" ? "Produce e.g. Fresh Kale, 50kg" : "Order e.g. Brown Rice, 100kg"} className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-500" />
                    <div className="grid grid-cols-2 gap-2">
                      <input id="logi-from" placeholder="From (e.g. Gboko)" className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none" />
                      <input id="logi-to" placeholder="To (e.g. Makurdi)" className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none" />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const prod = (document.getElementById("logi-produce") as HTMLInputElement)?.value?.trim();
                      const from = (document.getElementById("logi-from") as HTMLInputElement)?.value?.trim() || (role === "farmer" ? "My Farm" : "Seller Hub");
                      const to = (document.getElementById("logi-to") as HTMLInputElement)?.value?.trim() || (role === "farmer" ? "Makurdi Hub" : "My Address");
                      if (!prod) { toast.error("Enter produce / order"); return; }
                      const code = `BN-${role === "farmer" ? "FARM" : "BUYER"}-${Date.now().toString().slice(-4)}`;
                      const newShip: SupplyChainShipment = {
                        id: code,
                        produceTitle: prod,
                        origin: from,
                        destination: to,
                        status: "pending",
                        driverName: "To be assigned",
                        coldStorageTemp: 5.0,
                        routeProgress: 0,
                        escrowAmount: Math.floor(Math.random() * 20000) + 5000,
                        escrowReleased: false,
                        steps: [
                          { label: "Logistics Ordered", completed: true, timestamp: new Date().toLocaleString(), location: from },
                          { label: "Agent Verified", completed: false, timestamp: "Pending", location: from },
                          { label: "Pickup Scheduled", completed: false, timestamp: "Pending", location: from },
                          { label: "In Transit", completed: false, timestamp: "Pending", location: `${from} → ${to}` },
                          { label: "Arrival & Delivery", completed: false, timestamp: "Pending", location: to },
                          { label: "Escrow Release", completed: false, timestamp: "Pending", location: "Payment Gateway" },
                        ],
                        tempLog: [{ time: "Day 1", temp: 5.0 }],
                      };
                      try {
                        const all: SupplyChainShipment[] = (() => { try { const s = localStorage.getItem("ah_shipments"); return s ? JSON.parse(s) : INITIAL_SHIPMENTS; } catch { return INITIAL_SHIPMENTS; } })();
                        localStorage.setItem("ah_shipments", JSON.stringify([newShip, ...all]));
                      } catch {}
                      setLogisticsCode(code);
                      setLogisticsResult(newShip);
                      toast.success(`Logistics ordered! Code: ${code} — share with driver/buyer`);
                    }}
                    className="mt-3 w-full rounded-xl bg-amber-600 py-2.5 text-sm font-bold text-white hover:bg-amber-500"
                  >
                    Order Logistics — Get Tracking Code
                  </button>
                  <p className="mt-1.5 text-center text-[11px] text-stone-500">Full tracking lives in <span className="font-semibold">Supply Chain</span> (logistics-only) — farmer/buyer track here with code.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" weight="fill" />
              <span className="text-sm font-bold text-emerald-900">AgriNovva</span>
            </div>
            <p className="text-xs text-stone-400">© 2025 AgriNovva. Empowering Nigeria's agricultural future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Grains, Truck, Users, X, ShoppingCart, Trash, Leaf, ArrowRight, PiggyBank, Shield, Building2, Factory, BadgeCheck, FileText, Calculator, HandHeart, MapPin } from "@phosphor-icons/react";
import type { UserRole, CartItem, EscrowOrder, TabId } from "./types";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MarketplaceSection from "./components/MarketplaceSection";
import SupplyChainTracker from "./components/SupplyChainTracker";
import AgriToolsAdvisor from "./components/AgriToolsAdvisor";
import InvestmentExchange from "./components/InvestmentExchange";
import AgentNetwork from "./components/AgentNetwork";
import InsuranceProducts from "./components/InsuranceProducts";
import GovernmentDashboard from "./components/GovernmentDashboard";
import InputVerification from "./components/InputVerification";
import PriceContracts from "./components/PriceContracts";

const TABS: { id: TabId; label: string; icon: typeof Leaf; roles: UserRole[] }[] = [
  { id: "marketplace", label: "Marketplace", icon: ShoppingCart, roles: ["farmer", "buyer"] },
  { id: "supply-chain", label: "Supply Chain", icon: Truck, roles: ["buyer", "logistics", "farmer"] },
  { id: "agri-advisor", label: "AI Agronomy", icon: Leaf, roles: ["farmer", "buyer", "logistics"] },
  { id: "investment-exchange", label: "Investment Exchange", icon: PiggyBank, roles: ["buyer", "farmer"] },
  { id: "agent-network", label: "Agent Network", icon: Users, roles: ["farmer", "buyer", "logistics"] },
  { id: "insurance", label: "Insurance", icon: Shield, roles: ["farmer", "buyer"] },
  { id: "government", label: "Government", icon: Building2, roles: ["logistics"] },
  { id: "input-verification", label: "Input Verification", icon: Factory, roles: ["farmer", "buyer", "logistics"] },
  { id: "price-contracts", label: "Price Contracts", icon: Calculator, roles: ["farmer", "buyer"] },
  { id: "dashboard", label: "Dashboard", icon: Grains, roles: ["farmer", "buyer", "logistics"] },
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
      <Navbar role={role} onRoleChange={setRole} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

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
            <MarketplaceSection cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
          )}
          {activeTab === "supply-chain" && <SupplyChainTracker />}
          {activeTab === "agri-advisor" && <AgriToolsAdvisor />}
          {activeTab === "investment-exchange" && <InvestmentExchange />}
          {activeTab === "agent-network" && <AgentNetwork />}
          {activeTab === "insurance" && <InsuranceProducts />}
          {activeTab === "government" && <GovernmentDashboard />}
          {activeTab === "input-verification" && <InputVerification />}
          {activeTab === "price-contracts" && <PriceContracts />}
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
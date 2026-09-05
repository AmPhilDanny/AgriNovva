import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Star, MapPin, SealCheck, ShoppingCart, MagnifyingGlass, Sliders, ArrowRight, Check, Leaf, Shield, Users, Lock, Warning } from "@phosphor-icons/react";
import type { ProduceItem, CartItem, UserRole, TabId } from "../types";
import { INITIAL_PRODUCE } from "../constants";

interface MarketplaceProps {
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (id: string) => void;
  role?: UserRole;
  onNavigate?: (t: TabId) => void;
}

const categories = [
  { id: "all", label: "All Produce" },
  { id: "grains", label: "Grains" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "organic", label: "Organic" },
  { id: "dairy-poultry", label: "Dairy & Poultry" },
];

const grades = ["all", "premium", "standard", "economy"] as const;
const sortOptions = ["price-low", "price-high", "rating", "newest"] as const;

export default function MarketplaceSection({ cart, onAddToCart, onRemoveFromCart, role, onNavigate }: MarketplaceProps) {
  const [produce, setProduce] = useState<ProduceItem[]>(() => {
    try {
      const saved = localStorage.getItem("ah_produce_v2");
      if (saved) return JSON.parse(saved);
      const old = localStorage.getItem("ah_produce");
      if (old) {
        const parsed: ProduceItem[] = JSON.parse(old);
        const hasBroken = parsed.some(p => p.image.includes("1522184216316") || p.image.includes("1624628639859") || p.image.includes("1590259223388") || p.image.includes(".jfif"));
        if (!hasBroken) return parsed;
        localStorage.removeItem("ah_produce");
      }
    } catch {}
    return INITIAL_PRODUCE;
  });
  const [farmerVerified, setFarmerVerified] = useState(() => {
    try { return localStorage.getItem("ah_farmer_verified") === "true"; } catch { return false; }
  });
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({ title: "", farmerName: "", location: "Gboko, Benue", category: "vegetables" as ProduceItem["category"], pricePerKg: "", availableQty: "", description: "" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGrade, setActiveGrade] = useState("all");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string>("rating");
  const [selectedItem, setSelectedItem] = useState<ProduceItem | null>(null);
  const [bulkQty, setBulkQty] = useState(1);

  useEffect(() => {
    localStorage.setItem("ah_produce_v2", JSON.stringify(produce));
  }, [produce]);

  useEffect(() => {
    try { localStorage.setItem("ah_farmer_verified", String(farmerVerified)); } catch {}
  }, [farmerVerified]);

  const handleVerify = () => {
    setFarmerVerified(true);
    setShowVerifyModal(false);
    setShowPostModal(true);
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title.trim() || !postForm.farmerName.trim() || !postForm.pricePerKg || !postForm.availableQty) return;
    const newItem: ProduceItem = {
      id: `p${Date.now()}`,
      title: postForm.title.trim(),
      farmerName: postForm.farmerName.trim(),
      location: postForm.location.trim() || "Benue, Nigeria",
      category: postForm.category,
      grade: "standard",
      pricePerKg: Number(postForm.pricePerKg),
      availableQty: Number(postForm.availableQty),
      organicCert: false,
      image: "/images/Fresk_kale.jpg",
      rating: 4.5,
      harvestDate: new Date().toISOString().slice(0, 10),
      description: postForm.description.trim() || "Fresh produce from verified farmer — Benue.",
    };
    setProduce(prev => [newItem, ...prev]);
    setPostForm({ title: "", farmerName: "", location: "Gboko, Benue", category: "vegetables", pricePerKg: "", availableQty: "", description: "" });
    setShowPostModal(false);
  };

  const filtered = useMemo(() => {
    let items = [...produce];
    if (activeCategory !== "all") items = items.filter((p) => p.category === activeCategory);
    if (activeGrade !== "all") items = items.filter((p) => p.grade === activeGrade);
    if (organicOnly) items = items.filter((p) => p.organicCert);
    if (search) items = items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.farmerName.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-low") items.sort((a, b) => a.pricePerKg - b.pricePerKg);
    else if (sort === "price-high") items.sort((a, b) => b.pricePerKg - a.pricePerKg);
    else if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") items.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime());
    return items;
  }, [produce, activeCategory, activeGrade, organicOnly, search, sort]);

  const getGradeColor = (g: string) => {
    switch (g) {
      case "premium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "standard": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "economy": return "bg-stone-100 text-stone-600 border-stone-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getInCart = (id: string) => cart.find((c) => c.produceId === id);

  const handleAddToCart = (item: ProduceItem, qty: number) => {
    onAddToCart({ produceId: item.id, title: item.title, qty, pricePerKg: item.pricePerKg, farmerName: item.farmerName });
  };

  const totalBulk = (selectedItem?.pricePerKg ?? 0) * bulkQty;
  const bulkDiscount = bulkQty >= 100 ? 0.15 : bulkQty >= 50 ? 0.10 : bulkQty >= 20 ? 0.05 : 0;
  const discountedTotal = totalBulk * (1 - bulkDiscount);

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-emerald-900">Marketplace</h2>
            <p className="mt-1 text-sm text-stone-500">
              {role === "farmer" ? "Sell your harvest — verified farmers only" : role === "buyer" ? "Browse & buy from verified farms" : "Browse produce & supply chain"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {role === "farmer" && (
              <button
                onClick={() => (farmerVerified ? setShowPostModal(true) : setShowVerifyModal(true))}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold shadow-sm transition-all ${farmerVerified ? "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-600" : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
              >
                {farmerVerified ? <Plus className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                Post Produce
              </button>
            )}
            {role === "buyer" && (
              <span className="hidden items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:inline-flex">
                <ShoppingCart className="h-4 w-4" /> Buy only — posting is farmer-only
              </span>
            )}
            {/* Search */}
            <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 shadow-sm">
            <MagnifyingGlass className="h-4 w-4 text-stone-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search produce or farmer..."
              className="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-stone-300"
            />
          </div>
          </div>
        </div>

        {role === "farmer" && !farmerVerified && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Warning className="h-5 w-5" weight="fill" />
              </span>
              <div>
                <p className="text-sm font-bold text-amber-900">Register and verify with our agents to post and sell your produce</p>
                <p className="mt-0.5 text-xs leading-relaxed text-amber-700">Verified farmers get a green badge, higher visibility & escrow protection. Visit any agent in Benue (Gboko, Makurdi, Otukpo…) to verify — takes 5 mins.</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => onNavigate?.("agent-network")} className="rounded-xl border border-amber-200 bg-white px-3.5 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100">
                <Users className="mr-1 inline h-3.5 w-3.5" /> Find Agent
              </button>
              <button onClick={() => setShowVerifyModal(true)} className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500">
                Verify Now
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === c.id ? "bg-emerald-800 text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-stone-200" />
          {/* Grade Filter */}
          <div className="flex gap-1.5">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGrade(g)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  activeGrade === g ? "bg-emerald-800 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {g === "all" ? "All Grades" : g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-stone-200" />
          {/* Organic Toggle */}
          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              organicOnly ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Leaf className="h-3.5 w-3.5" weight={organicOnly ? "fill" : "regular"} />
            Organic Only
          </button>
          <div className="h-5 w-px bg-stone-200" />
          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-stone-400" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600 outline-none">
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Produce Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 rounded-full bg-stone-100 p-4">
              <Leaf className="h-8 w-8 text-stone-300" />
            </div>
            <p className="text-sm font-medium text-stone-500">No produce found matching your filters.</p>
            <button onClick={() => { setActiveCategory("all"); setActiveGrade("all"); setOrganicOnly(false); setSearch(""); }} className="mt-2 text-xs text-emerald-600 underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => {
              const inCart = getInCart(item.id);
              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => { setSelectedItem(item); setBulkQty(1); }}
                  className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    {item.organicCert && (
                      <span className="absolute left-2 top-2 rounded-full bg-emerald-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        Organic
                      </span>
                    )}
                    <span className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${getGradeColor(item.grade)}`}>
                      {item.grade}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <MapPin className="h-3 w-3" weight="fill" />
                      {item.location}
                    </div>
                    <h3 className="mt-1 text-sm font-semibold text-stone-900">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                      <Star className="h-3 w-3 text-amber-500" weight="fill" />
                      {item.rating}
                      <span className="mx-1">·</span>
                      {item.farmerName}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-800">₦{item.pricePerKg.toFixed(2)}<span className="text-xs font-normal text-stone-400">/kg</span></span>
                      {inCart ? (
                        <span className="flex items-center gap-1 rounded-lg bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                          <Check className="h-3 w-3" weight="bold" /> {inCart.qty}kg
                        </span>
                      ) : (
                        <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                          View Details
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                <img src={selectedItem.image} alt={selectedItem.title} className="h-full w-full object-cover" />
                <button onClick={() => setSelectedItem(null)} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                  <X className="h-4 w-4" />
                </button>
                {selectedItem.organicCert && (
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-600/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <SealCheck className="mr-1 inline h-3 w-3" weight="fill" />
                    Certified Organic
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{selectedItem.title}</h3>
                    <p className="mt-1 text-sm text-stone-500">{selectedItem.farmerName} · {selectedItem.location}</p>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getGradeColor(selectedItem.grade)}`}>
                    {selectedItem.grade}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{selectedItem.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-500" weight="fill" /> {selectedItem.rating}</span>
                  <span>Harvested: {selectedItem.harvestDate}</span>
                  <span>{selectedItem.availableQty.toLocaleString()}kg available</span>
                </div>

                {/* Bulk Price Calculator */}
                <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-xs font-medium text-stone-500">Bulk Quantity Calculator</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setBulkQty(Math.max(1, bulkQty - 1))} className="rounded-lg border border-stone-200 bg-white p-2 text-stone-600 hover:bg-stone-100">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[3rem] text-center text-lg font-bold text-stone-900">{bulkQty}kg</span>
                      <button onClick={() => setBulkQty(bulkQty + 1)} className="rounded-lg border border-stone-200 bg-white p-2 text-stone-600 hover:bg-stone-100">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      {bulkDiscount > 0 && (
                        <p className="text-xs font-medium text-emerald-600">-{(bulkDiscount * 100).toFixed(0)}% bulk discount</p>
                      )}
                      <p className="text-lg font-bold text-emerald-800">₦{discountedTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Add to Cart / Escrow Buy */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => { handleAddToCart(selectedItem, bulkQty); setSelectedItem(null); }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]"
                  >
                    <ShoppingCart className="h-4 w-4" weight="fill" />
                    Add to Cart — ₦{discountedTotal.toFixed(2)}
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition-all hover:bg-emerald-100 active:scale-[0.98]">
                    Escrow Buy
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verify Flex Modal — farmers must verify to sell */}
      <AnimatePresence>
        {showVerifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowVerifyModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex flex-col gap-4 p-6 sm:flex-row">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
                  <Shield className="h-6 w-6" weight="fill" />
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-stone-900">Register and verify with our agents to post and sell your produce</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                    Buyers can browse and buy instantly. Farmers must be <span className="font-semibold text-emerald-700">verified by an AgriNovva agent</span> before listing. Visit any agent in Benue (Gboko, Makurdi, Otukpo) — they’ll check your farm, NIN &amp; inputs, then unlock posting + escrow.
                  </p>
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
                    <span className="font-bold">Unverified farmers</span> can browse, add to cart (as buyer), and use AI Agronomy — but <span className="font-bold">Post Produce</span> stays locked until verified.
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-stone-100 bg-stone-50 p-4 sm:flex-row sm:justify-end">
                <button onClick={() => setShowVerifyModal(false)} className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100">
                  Cancel
                </button>
                <button onClick={() => { setShowVerifyModal(false); onNavigate?.("agent-network"); }} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                  <Users className="h-4 w-4" /> Find Agent
                </button>
                <button onClick={handleVerify} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600">
                  Verify Now (Demo)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Produce Modal — farmer-only, verified only */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >
              <form onSubmit={handlePost} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Post Produce — Verified Farmers Only</h3>
                    <p className="mt-1 text-xs text-stone-500">Your listing will appear in Marketplace after posting. Buyer can’t post — they can only buy.</p>
                  </div>
                  <button type="button" onClick={() => setShowPostModal(false)} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 grid gap-3">
                  <input value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} placeholder="Produce title e.g. Fresh Tomatoes" className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={postForm.farmerName} onChange={e => setPostForm({ ...postForm, farmerName: e.target.value })} placeholder="Farmer / Farm name" className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" required />
                    <input value={postForm.location} onChange={e => setPostForm({ ...postForm, location: e.target.value })} placeholder="Location e.g. Gboko, Benue" className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <select value={postForm.category} onChange={e => setPostForm({ ...postForm, category: e.target.value as any })} className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none">
                      <option value="vegetables">Vegetables</option>
                      <option value="grains">Grains</option>
                      <option value="fruits">Fruits</option>
                      <option value="organic">Organic</option>
                      <option value="dairy-poultry">Dairy & Poultry</option>
                    </select>
                    <input type="number" value={postForm.pricePerKg} onChange={e => setPostForm({ ...postForm, pricePerKg: e.target.value })} placeholder="Price/kg ₦" className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none" required />
                    <input type="number" value={postForm.availableQty} onChange={e => setPostForm({ ...postForm, availableQty: e.target.value })} placeholder="Qty kg" className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none" required />
                  </div>
                  <textarea value={postForm.description} onChange={e => setPostForm({ ...postForm, description: e.target.value })} placeholder="Description — harvest date, grade, notes" rows={2} className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none" />
                </div>
                {!farmerVerified && <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-700"><Lock className="h-3.5 w-3.5" /> You must verify first — this form is for verified farmers only.</p>}
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => setShowPostModal(false)} className="flex-1 rounded-xl border border-stone-200 bg-white py-2.5 text-sm font-medium text-stone-600">Cancel</button>
                  <button type="submit" disabled={!farmerVerified} className="flex-1 rounded-xl bg-emerald-700 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed">Post to Marketplace</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
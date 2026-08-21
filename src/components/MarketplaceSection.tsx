import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Star, MapPin, SealCheck, ShoppingCart, MagnifyingGlass, Sliders, ArrowRight, Check, Leaf } from "@phosphor-icons/react";
import type { ProduceItem, CartItem } from "../types";
import { INITIAL_PRODUCE } from "../constants";

interface MarketplaceProps {
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (id: string) => void;
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

export default function MarketplaceSection({ cart, onAddToCart, onRemoveFromCart }: MarketplaceProps) {
  const [produce, setProduce] = useState<ProduceItem[]>(() => {
    const saved = localStorage.getItem("ah_produce");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCE;
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGrade, setActiveGrade] = useState("all");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string>("rating");
  const [selectedItem, setSelectedItem] = useState<ProduceItem | null>(null);
  const [bulkQty, setBulkQty] = useState(1);

  useEffect(() => {
    localStorage.setItem("ah_produce", JSON.stringify(produce));
  }, [produce]);

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
            <p className="mt-1 text-sm text-stone-500">Browse fresh produce from verified local farms</p>
          </div>
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
    </section>
  );
}
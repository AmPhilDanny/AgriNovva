import { useState } from "react";
import { motion } from "framer-motion";
import { CurrencyNgn, TrendUp, ShieldCheck, Handshake, Clock, Warning } from "@phosphor-icons/react";

const CONTRACTS = [
  { id:"PC-01", crop:"Rice (FARO44)", floor:"₦ 650/kg", market:"₦ 720/kg", status:"Above floor", topUp:"—", expiry:"Nov 2025", escrow:"₦ 12.4M locked", buyer:"Dangote Rice Mill" },
  { id:"PC-02", crop:"Maize (SAMMAZ52)", floor:"₦ 500/kg", market:"₦ 460/kg", status:"Top-up due", topUp:"₦ 40/kg → ₦ 1.1M", expiry:"Oct 2025", escrow:"₦ 8.2M locked", buyer:"Olam Feed" },
  { id:"PC-03", crop:"Soybean TGx", floor:"₦ 800/kg", market:"₦ 845/kg", status:"Above floor", topUp:"—", expiry:"Oct 2025", escrow:"₦ 5.6M locked", buyer:"Grand Cereals" },
  { id:"PC-04", crop:"Yam (Makurdi)", floor:"₦ 1,200/tuber", market:"₦ 1,150/tuber", status:"Top-up due", topUp:"₦ 50/tuber", expiry:"Dec 2025", escrow:"₦ 3.1M locked", buyer:"Local off-takers" },
];

export default function PriceContracts() {
  const [selected, setSelected] = useState<typeof CONTRACTS[0] | null>(null);
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900">Price Floor & Forward Contracts</h2>
          <p className="mt-1 text-sm text-stone-500">Escrow-backed floor price — buyer commits, farmer gets top-up if market falls below floor</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {CONTRACTS.map(c=>(
            <motion.div key={c.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} onClick={()=>setSelected(c)} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">{c.crop}</h3>
                  <p className="text-xs text-stone-500">{c.buyer} • {c.id}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.status==="Top-up due" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{c.status}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div><p className="text-stone-500">Floor</p><p className="font-bold text-emerald-800">{c.floor}</p></div>
                <div><p className="text-stone-500">Market now</p><p className="font-bold">{c.market}</p></div>
                <div><p className="text-stone-500">Top-up</p><p className="font-bold text-amber-700">{c.topUp}</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> Expiry {c.expiry}</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-600"/> {c.escrow}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {selected && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={()=>setSelected(null)}>
            <motion.div initial={{scale:0.95}} animate={{scale:1}} onClick={e=>e.stopPropagation()} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-stone-900">{selected.crop} — {selected.id}</h3>
              <p className="text-sm text-stone-500">{selected.buyer}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Floor price</span><span className="font-bold">{selected.floor}</span></div>
                <div className="flex justify-between"><span>Market price</span><span className="font-bold">{selected.market}</span></div>
                <div className="flex justify-between"><span>Escrow</span><span className="font-bold">{selected.escrow}</span></div>
                <div className="flex justify-between"><span>Status</span><span className={selected.status==="Top-up due" ? "text-amber-700 font-bold" : "text-emerald-700 font-bold"}>{selected.status}</span></div>
              </div>
              <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">How it works: Buyer locks funds in escrow → at harvest, if market ≥ floor farmer sells at market; if market &lt; floor, escrow pays top-up to floor.</div>
              <button onClick={()=>setSelected(null)} className="mt-4 w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white">Close</button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

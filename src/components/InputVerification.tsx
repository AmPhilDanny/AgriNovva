import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, QrCode, CheckCircle, XCircle, MagnifyingGlass, Package } from "@phosphor-icons/react";

const MOCK_INPUTS = [
  { id:"INP-001", name:"FARO 44 Rice Seed (certified)", supplier:"Benue Seed Co.", batch:"BS-2025-044", verified:true, qr:"QR-FA44-9X2P", lga:"Gboko" },
  { id:"INP-002", name:"SAMMAZ 52 Maize (drought-tolerant)", supplier:"Premier Seeds", batch:"PS-MA52-881", verified:true, qr:"QR-SM52-7K1Q", lga:"Makurdi" },
  { id:"INP-003", name:"TGx 1987-10F Soybean", supplier:"Agro Input Hub", batch:"AI-TGx-203", verified:false, qr:"QR-TGx-3M9W", lga:"Otukpo", reason:"Unregistered batch — flag for audit" },
  { id:"INP-004", name:"NPK 15-15-15 Fertilizer (Dangote)", supplier:"Dangote Fertilizer", batch:"DF-NPK-5521", verified:true, qr:"QR-DF-2L8Z", lga:"Katsina-Ala" },
];

export default function InputVerification() {
  const [q, setQ] = useState("");
  const [scan, setScan] = useState("");
  const filtered = MOCK_INPUTS.filter(i=> i.name.toLowerCase().includes(q.toLowerCase()) || i.qr.toLowerCase().includes(q.toLowerCase()));
  const scanned = MOCK_INPUTS.find(i=> i.qr===scan);
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900">Input Supply Chain Verification</h2>
          <p className="mt-1 text-sm text-stone-500">Scan QR on seed/fertilizer bags — verify authenticity, batch & LGA before planting</p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="MagnifyingGlass input name or QR (e.g. QR-FA44)" className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-500"/>
            </div>
            <div className="flex gap-2">
              <input value={scan} onChange={e=>setScan(e.target.value.trim())} placeholder="Scan QR here" className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 w-48"/>
              <button onClick={()=>setScan("QR-FA44-9X2P")} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 flex items-center gap-1"><QrCode className="h-4 w-4"/> Demo scan</button>
            </div>
          </div>
          {scan && (
            <div className={`mt-3 rounded-lg px-3 py-2 text-sm flex items-center gap-2 ${scanned?.verified ? "bg-emerald-50 text-emerald-700" : scanned ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
              {scanned?.verified ? <CheckCircle className="h-4 w-4"/> : <XCircle className="h-4 w-4"/>}
              {scanned ? (scanned.verified ? `Verified: ${scanned.name} — Batch ${scanned.batch} (${scanned.supplier}, ${scanned.lga})` : `Flagged: ${scanned.reason}`) : `Not found: ${scan} — check QR or report to agent`}
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map(i=>(
            <motion.div key={i.id} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <Package className="h-5 w-5 text-emerald-600"/>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${i.verified ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{i.verified ? "Verified" : "Flagged"}</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-stone-900">{i.name}</h3>
              <p className="text-xs text-stone-500">{i.supplier} • {i.batch}</p>
              <p className="mt-2 text-xs font-mono bg-stone-50 px-2 py-1 rounded">{i.qr}</p>
              <p className="mt-1 text-xs text-stone-500">{i.lga} LGA</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import {
  Download, DeviceMobile, WifiSlash, Translate, ShieldCheck,
  Leaf, Star, ArrowRight, QrCode, Play, Users, MapPin,
  Camera, Microphone, ChartLineUp, Phone, Seeding, Truck,
} from "@phosphor-icons/react";

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: Download,
    title: "Download & Install",
    desc: "Download the 107MB APK from this page or scan a QR code at your local solar board. Installs on any Android 8+ device — no Play Store needed.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    step: 2,
    icon: Seeding,
    title: "Register Your Farm",
    desc: "Sign up as a Farmer, Buyer, or Logistics partner. Farmers geo-tag their plot and link NIN for verification. Buyers get instant access to fresh produce.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    step: 3,
    icon: Camera,
    title: "Snap & Diagnose",
    desc: "Point your camera at a diseased leaf. Our TFLite model runs 100% offline — no internet required. Get diagnosis + treatment in Hausa, Yoruba, Igbo, Pidgin, or English.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    step: 4,
    icon: ChartLineUp,
    title: "Sell, Track & Earn",
    desc: "Post produce to the marketplace with verification badges. Track shipments in real-time via supply chain. Earn through escrow-protected transactions.",
    color: "bg-violet-100 text-violet-700",
  },
];

const EXTENSION_AGENTS = [
  {
    name: "Adaeze Obi",
    location: "Gboko, Benue",
    phone: "+234 803 XXX 4521",
    specialties: ["Cassava", "Yam", "Soil Testing"],
    avatar: "/images/adaeze.jpg",
  },
  {
    name: "Tunde Bakare",
    location: "Makurdi, Benue",
    phone: "+234 805 XXX 7832",
    specialties: ["Rice", "Sorghum", "Pest Control"],
    avatar: "/images/tunde.jpg",
  },
  {
    name: "Amara Nwosu",
    location: "Otukpo, Benue",
    phone: "+234 809 XXX 1245",
    specialties: ["Vegetables", "Organic Farming"],
    avatar: "/images/amara.jpg",
  },
  {
    name: "Fatima Abdullahi",
    location: "Guma, Benue",
    phone: "+234 802 XXX 6789",
    specialties: ["Millet", "Cowpea", "Irrigation"],
    avatar: "/images/fatima.jpg",
  },
];

export default function DownloadApp() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero CTA */}
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                v1.0.0 — Offline — Benue Pilot — 107MB
                <span className="hidden sm:inline">— Naija Harvest (com.naijaharvest.app)</span>
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
                Download the <span className="text-emerald-200">AgriNovva</span> App
                <span className="block text-lg font-bold text-white/90 sm:text-xl">Diagnose crops offline — in your language.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-emerald-50">
                Extension agent + farmer side-by-side. Snap a leaf, get{" "}
                <span className="font-bold text-white">AI diagnosis (TFLite, no internet)</span> + treatment in{" "}
                <span className="font-bold text-white">Hausa, Yoruba, Igbo, Pidgin, English</span>{" "}
                <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[11px]">Tiv & Idoma — Coming Soon</span> — with voice.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                {[
                  { icon: WifiSlash, label: "100% Offline", sub: "SQLite + TFLite" },
                  { icon: Translate, label: "5 Languages + Voice", sub: "HA/YO/IG/PCM/EN" },
                  { icon: ShieldCheck, label: "Agent Verified", sub: "NIN + farm geo-tag" },
                  { icon: Leaf, label: "38 Diseases", sub: "Early Blight etc." },
                  { icon: DeviceMobile, label: "Capacitor + SQLite", sub: "Camera + GPS" },
                  { icon: Star, label: "4.8 Rating", sub: "Benue pilot" },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur">
                      <Icon className="h-4 w-4 text-emerald-200" weight="fill" />
                      <div>
                        <p className="text-xs font-bold text-white">{f.label}</p>
                        <p className="text-[11px] text-emerald-100">{f.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/images/AgriNovva_App.png"
                  download
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-emerald-700 shadow-lg transition hover:bg-emerald-50 active:scale-[0.98]"
                >
                  <Download className="h-5 w-5" weight="bold" />
                  Download APK — 107MB
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/15"
                >
                  <Play className="h-4 w-4" weight="fill" />
                  How It Works
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-emerald-100">
                <span className="inline-flex items-center gap-1"><QrCode className="h-3.5 w-3.5" /> Scan QR at market solar board</span>
                <span>·</span>
                <span>Android 8+ · Works without internet</span>
                <span>·</span>
                <span>Free for farmers</span>
              </div>
            </div>

            {/* Right — Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 12, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[360px] lg:ml-auto"
            >
              <div className="relative rounded-[2.5rem] bg-black p-3 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
                <div className="overflow-hidden rounded-[2rem] bg-white">
                  <img
                    src="/images/AgriNovva_App.png"
                    alt="AgriNovva App — extension agent diagnosing with farmer"
                    className="h-[560px] w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-lg border border-stone-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-stone-700">Offline Ready</span>
                  <span className="text-[11px] text-stone-500">· Benue · Tiv/Idoma soon</span>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -left-4 top-10 hidden rounded-xl bg-white px-3 py-2 shadow-xl sm:flex items-center gap-2 border border-stone-100">
                <Leaf className="h-4 w-4 text-emerald-600" weight="fill" />
                <div>
                  <p className="text-xs font-bold text-stone-900">Early Blight 94%</p>
                  <p className="text-[11px] text-stone-500">Mancozeb — 7 days</p>
                </div>
              </div>
              <div className="absolute -right-4 bottom-16 hidden rounded-xl bg-white px-3 py-2 shadow-xl sm:flex items-center gap-2 border border-stone-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-xs font-black">HA</span>
                <div>
                  <p className="text-xs font-bold text-stone-900">Hausa Voice</p>
                  <p className="text-[11px] text-stone-500">Maganin cuta...</p>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="relative mt-6 text-center text-[11px] text-emerald-100/80">
            Built for 40M smallholders (1 agent : 25,000 farmers → 1:800 with AgriNovva) · Solar boards at Gboko/Makurdi · Escrow + QR inputs · 22.5% yield loss prevented
          </p>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="mt-12 sm:mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-black text-stone-900 sm:text-3xl">How AgriNovva Works</h2>
            <p className="mt-2 text-sm text-stone-500">From download to harvest — four simple steps</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="absolute -top-3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white shadow-lg">
                    {item.step}
                  </div>
                  <div className={`mt-2 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon className="h-6 w-6" weight="fill" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Visual flow arrow */}
          <div className="mt-4 hidden items-center justify-center gap-2 text-stone-300 sm:flex">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-300" />
            <Truck className="h-5 w-5" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-300" />
            <span className="text-xs font-medium text-stone-400">Farm to Market, Verified</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-300" />
            <Truck className="h-5 w-5" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-300" />
          </div>
        </div>

        {/* Can't Download? Contact Extension Agents */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-black text-stone-900 sm:text-3xl">Can't Download the App?</h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm text-stone-500">
              No smartphone? No internet? No problem. Our trained extension agents are in every Local Government Area in Benue State.
              They carry tablets pre-loaded with AgriNovva and will come to your farm to diagnose, register your produce, and connect you to buyers — all for free.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXTENSION_AGENTS.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-stone-900">{agent.name}</p>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <MapPin className="h-3 w-3" />
                      {agent.location}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {agent.specialties.map((s) => (
                    <span key={s} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={`tel:${agent.phone.replace(/\s/g, "")}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" weight="fill" />
                  Call Now
                </a>
              </motion.div>
            ))}
          </div>

          {/* Subscription note */}
          <div className="mt-6 rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Subscription-Free for Farmers</h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  AgriNovva is free for all registered farmers. Extension agents are funded by the Benue State Government and partner NGOs.
                  Buyers pay a small 2% transaction fee on escrow-protected orders. Logistics partners earn per delivery.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ShieldCheck className="h-8 w-8 text-emerald-600" weight="fill" />
                <div>
                  <p className="text-xs font-bold text-emerald-700">Government Backed</p>
                  <p className="text-[11px] text-stone-500">Ministry of Agriculture</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-500">
            Questions? Call our helpline: <span className="font-bold text-emerald-700">0800-AGRI-NOV</span> (toll-free)
            or visit any extension office in Gboko, Makurdi, Otukpo, or Vandeikya.
          </p>
        </div>
      </div>
    </section>
  );
}

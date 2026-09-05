import { motion } from "framer-motion";
import { Download, DeviceMobile, WifiSlash, Translate, ShieldCheck, Leaf, Star, ArrowRight, QrCode, Play } from "@phosphor-icons/react";

export default function DownloadCTA() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                v1.0.0 — Offline • Benue Pilot • 107MB
                <span className="hidden sm:inline">• Naija Harvest (com.naijaharvest.app)</span>
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
                Download the <span className="text-emerald-200">AgriNovva</span> App
                <span className="block text-lg font-bold text-white/90 sm:text-xl">Diagnose crops offline — in your language.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-emerald-50">
                Extension agent + farmer side-by-side. Snap a leaf, get <span className="font-bold text-white">AI diagnosis (TFLite, no internet)</span> + treatment in <span className="font-bold text-white">Hausa, Yoruba, Igbo, Pidgin, English</span> <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[11px]">Tiv & Idoma — Coming Soon</span> — with voice.
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
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); document.getElementById("agent-network")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/15"
                >
                  <Play className="h-4 w-4" weight="fill" />
                  See Demo — Farmer + Agent
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-emerald-100">
                <span className="inline-flex items-center gap-1"><QrCode className="h-3.5 w-3.5" /> Scan QR at market solar board</span>
                <span>•</span>
                <span>Android 8+ • Works without internet</span>
                <span>•</span>
                <span>Free for farmers</span>
              </div>
            </div>

            {/* Right — Phone mockup using your AgriNovva_App.png */}
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
                  <span className="text-[11px] text-stone-500">• Benue • Tiv/Idoma soon</span>
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
            Built for 40M smallholders (1 agent : 25,000 farmers → 1:800 with AgriNovva) • Solar boards at Gboko/Makurdi • Escrow + QR inputs • 22.5% yield loss prevented
          </p>
        </div>
      </div>
    </section>
  );
}

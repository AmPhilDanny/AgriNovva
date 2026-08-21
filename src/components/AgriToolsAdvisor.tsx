import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, CloudRain, Thermometer, ChartLineUp, Sparkle, Leaf, Warning, WarningCircle, Info, Scan, ArrowRight, Image, Microscope, Calendar, MapPin } from "@phosphor-icons/react";
import type { AdvisoryTopic, CropDiseaseScan } from "../types";
import { ADVISORY_TOPICS, MARKET_PRICES, SAMPLE_DISEASES } from "../constants";

const severityIcons = { info: Info, warning: Warning, critical: WarningCircle } as const;
const severityColors = { info: "bg-blue-100 text-blue-700 border-blue-200", warning: "bg-amber-100 text-amber-700 border-amber-200", critical: "bg-red-100 text-red-700 border-red-200" } as const;

export default function AgriToolsAdvisor() {
  const [activeTab, setActiveTab] = useState<"advisor" | "scanner" | "prices">("advisor");
  const [scans, setScans] = useState<CropDiseaseScan[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleScan = () => {
    setScanning(true);
    const random = SAMPLE_DISEASES[Math.floor(Math.random() * SAMPLE_DISEASES.length)];
    setTimeout(() => {
      const newScan: CropDiseaseScan = {
        id: `scan-${Date.now()}`,
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=60",
        diseaseName: random.disease,
        confidence: random.confidence,
        remedy: random.remedy,
        timestamp: new Date().toLocaleDateString(),
      };
      setScans((prev) => [newScan, ...prev]);
      setScanning(false);
      setSelectedDisease(0);
    }, 2000);
  };

  const tabs = [
    { id: "advisor" as const, label: "AI Advisory", icon: Sparkle },
    { id: "scanner" as const, label: "Crop Scanner", icon: Microscope },
    { id: "prices" as const, label: "Price Trends", icon: ChartLineUp },
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">AI Agronomy & Advisory</h2>
          <p className="mt-1 text-sm text-stone-500">Smart crop diagnosis, weather alerts, and market insights</p>
        </div>

        {/* Tab Nav */}
        <div className="mb-6 flex gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:text-sm ${
                  active ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <Icon className="h-4 w-4" weight={active ? "fill" : "regular"} />
                {t.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "advisor" && (
            <motion.div key="advisor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Weather Card */}
              <div className="rounded-xl border border-stone-200 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                  <CloudRain className="h-4 w-4" />
                  Local Weather
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Cloud className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-stone-900">24°C</p>
                    <p className="text-xs text-stone-500">Partly Cloudy · Nairobi Region</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-stone-500">
                  <div className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> Humidity: 67%</div>
                  <div className="flex items-center gap-1"><CloudRain className="h-3 w-3" /> Rain: 20%</div>
                </div>
              </div>

              {/* Advisory Feed */}
              <div className="rounded-xl border border-stone-200 bg-white shadow-sm sm:col-span-2">
                <div className="border-b border-stone-100 px-4 py-3">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Advisory Feed</p>
                </div>
                <div className="divide-y divide-stone-100">
                  {ADVISORY_TOPICS.map((a) => {
                    const SevIcon = severityIcons[a.severity];
                    return (
                      <div key={a.id} className="flex items-start gap-3 px-4 py-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.severity === "critical" ? "bg-red-100" : a.severity === "warning" ? "bg-amber-100" : "bg-blue-100"}`}>
                          <SevIcon className={`h-4 w-4 ${a.severity === "critical" ? "text-red-600" : a.severity === "warning" ? "text-amber-600" : "text-blue-600"}`} weight="fill" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-stone-900">{a.title}</p>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${severityColors[a.severity]}`}>
                              {a.severity}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-stone-500">{a.summary}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "scanner" && (
            <motion.div key="scanner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto max-w-2xl">
              {/* Scan Area */}
              <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleScan} />
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Leaf className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="mt-4 text-sm font-medium text-stone-900">Upload a leaf or crop photo for AI diagnosis</p>
                <p className="mt-1 text-xs text-stone-500">Drag & drop an image or click to browse</p>
                <div className="mt-4 flex justify-center gap-3">
                  <button onClick={handleScan} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]">
                    <Scan className="h-4 w-4" weight="fill" />
                    Scan Sample
                  </button>
                  <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition-all hover:bg-stone-50">
                    <Image className="h-4 w-4" />
                    Upload Image
                  </button>
                </div>
              </div>

              {/* Scanning Animation */}
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden rounded-xl border border-amber-200 bg-amber-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                      <p className="text-sm font-medium text-amber-800">Analyzing crop sample...</p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-amber-200">
                      <motion.div
                        className="h-full rounded-full bg-amber-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              {scans.length > 0 && selectedDisease !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-stone-100">
                      <img src={scans[0].image} alt="Scan" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Diagnosis Result</p>
                      <p className="text-xs text-stone-500">{scans[0].timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-stone-900">{scans[0].diseaseName}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${scans[0].confidence}%` }}
                            className="h-full rounded-full bg-emerald-500"
                          />
                        </div>
                        <span className="text-xs font-semibold text-emerald-700">{scans[0].confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-emerald-50 p-4">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Recommended Treatment</p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700">{scans[0].remedy}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "prices" && (
            <motion.div key="prices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-100 px-5 py-3">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Commodity Market Prices · Kenya</p>
                </div>
                <div className="divide-y divide-stone-100">
                  {MARKET_PRICES.map((mp, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-stone-50">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          mp.trend === "up" ? "bg-emerald-100" : mp.trend === "down" ? "bg-red-100" : "bg-stone-100"
                        }`}>
                          <ChartLineUp className={`h-4 w-4 ${
                            mp.trend === "up" ? "text-emerald-600" : mp.trend === "down" ? "text-red-500" : "text-stone-400"
                          }`} weight="fill" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-900">{mp.commodity}</p>
                          <p className="text-xs text-stone-400">{mp.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-stone-900">{mp.price}</p>
                        <p className={`text-xs font-medium ${
                          mp.trend === "up" ? "text-emerald-600" : mp.trend === "down" ? "text-red-500" : "text-stone-400"
                        }`}>
                          {mp.change > 0 ? "+" : ""}{mp.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
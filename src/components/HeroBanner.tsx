import { motion } from "framer-motion";
import { TrendUp, TrendDown, SealCheck, CurrencyCircleDollar, Leaf, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { MARKET_PRICES } from "../constants";
import type { UserRole } from "../types";

interface HeroBannerProps {
  role: UserRole;
}

const stats = [
  { icon: SealCheck, label: "Verified Farms", value: "2,400+" },
  { icon: CurrencyCircleDollar, label: "Zero-Middlemen Savings", value: "35%" },
  { icon: Leaf, label: "Freshness Guarantee", value: "100%" },
];

export default function HeroBanner({ role }: HeroBannerProps) {
  const roleAction = role === "farmer" ? "List Your Harvest" : role === "buyer" ? "Source Fresh Produce" : "Track Shipments";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        {/* Hero Content */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
              <Sparkle className="h-3.5 w-3.5" weight="fill" />
              GS26 AgriTech Innovation Summit
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              From{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">
                Seed
              </span>{" "}
              to{" "}
              <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">
                Sold
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-emerald-100/80 sm:text-lg">
              AI-powered crop diagnosis. Agent-verified inputs. Cold-chain logistics. Real-time market prices. Escrow payment protection. One trusted network connecting Nigeria's 40 million smallholder farmers to the full agricultural value chain.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-[0.98]">
                {roleAction}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-white/5 px-6 py-3 text-sm font-medium text-emerald-100 backdrop-blur-sm transition-all hover:bg-white/10">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-emerald-200/70">{s.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Market Price Ticker */}
      <div className="border-t border-emerald-500/20 bg-emerald-950/60 py-3">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...MARKET_PRICES, ...MARKET_PRICES].map((mp, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-emerald-200">{mp.commodity}</span>
                <span className="font-semibold text-white">{mp.price}</span>
                <span className={`flex items-center gap-0.5 text-xs ${
                  mp.trend === "up" ? "text-emerald-400" : mp.trend === "down" ? "text-red-400" : "text-amber-400"
                }`}>
                  {mp.trend === "up" ? <TrendUp className="h-3 w-3" weight="fill" /> : mp.trend === "down" ? <TrendDown className="h-3 w-3" weight="fill" /> : null}
                  {mp.change > 0 ? "+" : ""}{mp.change}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
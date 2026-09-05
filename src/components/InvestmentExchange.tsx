import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass, Funnel, Heart, ArrowRight, CheckCircle, Clock, MapPin, Users, CurrencyNgn, TrendUp, Shield, Star, Warning, X } from "@phosphor-icons/react";

interface FarmingOpportunity {
  id: string;
  farmerName: string;
  location: string;
  crop: string;
  hectares: number;
  expectedYield: number;
  expectedRevenue: number;
  investmentNeeded: number;
  investorShare: number;
  farmerShare: number;
  agentShare: number;
  platformShare: number;
  duration: string;
  riskLevel: "low" | "medium" | "high";
  reputationScore: number;
  agentVerified: boolean;
  insuranceIncluded: boolean;
  images: string[];
  description: string;
  plantingDate: string;
  harvestDate: string;
}

const MOCK_OPPORTUNITIES: FarmingOpportunity[] = [
  {
    id: "inv-001",
    farmerName: "Amina Bello",
    location: "Gboko, Benue",
    crop: "Rice (FARO 44)",
    hectares: 5,
    expectedYield: 25000,
    expectedRevenue: 70000000,
    investmentNeeded: 2500000,
    investorShare: 35,
    farmerShare: 50,
    agentShare: 10,
    platformShare: 5,
    duration: "6 months",
    riskLevel: "low",
    reputationScore: 87,
    agentVerified: true,
    insuranceIncluded: true,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80",
    ],
    description: "Experienced rice farmer with 12 years cultivation. Uses improved FARO 44 variety. Agent-verified with geo-tagged farm photos. NAIC weather-index insurance included.",
    plantingDate: "2025-05-15",
    harvestDate: "2025-11-15",
  },
  {
    id: "inv-002",
    farmerName: "Ibrahim Musa",
    location: "Makurdi, Benue",
    crop: "Maize (SAMMAZ 52)",
    hectares: 8,
    expectedYield: 40000,
    expectedRevenue: 52000000,
    investmentNeeded: 1800000,
    investorShare: 35,
    farmerShare: 50,
    agentShare: 10,
    platformShare: 5,
    duration: "5 months",
    riskLevel: "low",
    reputationScore: 92,
    agentVerified: true,
    insuranceIncluded: true,
    images: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80",
      "https://images.unsplash.com/photo-1590259223388-aa2e5b3093af?w=600&q=80",
    ],
    description: "High-yield maize farmer using SAMMAZ 52 drought-tolerant variety. 15 years experience. Weekly photo monitoring by agent. Input supply verified via QR codes.",
    plantingDate: "2025-06-01",
    harvestDate: "2025-10-15",
  },
  {
    id: "inv-003",
    farmerName: "Grace Okafor",
    location: "Otukpo, Benue",
    crop: "Soybean (TGx 1987-10F)",
    hectares: 3,
    expectedYield: 9000,
    expectedRevenue: 18000000,
    investmentNeeded: 950000,
    investorShare: 35,
    farmerShare: 50,
    agentShare: 10,
    platformShare: 5,
    duration: "4 months",
    riskLevel: "medium",
    reputationScore: 78,
    agentVerified: true,
    insuranceIncluded: true,
    images: [
      "/images/soyabean.jpg",
    ],
    description: "Soybean farmer with 8 years experience. TGx 1987-10F variety resistant to rust. Agent-verified. Insurance covers pest outbreak and drought.",
    plantingDate: "2025-06-15",
    harvestDate: "2025-10-15",
  },
  {
    id: "inv-004",
    farmerName: "Yusuf Abdullahi",
    location: "Katsina-Ala, Benue",
    crop: "Yam (Improved Variety)",
    hectares: 2,
    expectedYield: 8000,
    expectedRevenue: 24000000,
    investmentNeeded: 1200000,
    investorShare: 35,
    farmerShare: 50,
    agentShare: 10,
    platformShare: 5,
    duration: "8 months",
    riskLevel: "medium",
    reputationScore: 85,
    agentVerified: true,
    insuranceIncluded: false,
    images: [
      "/images/Yams.jpg",
    ],
    description: "Yam farmer using improved seed yams. 10 years experience. No insurance available for yam yet. Agent monitoring weekly with photo evidence.",
    plantingDate: "2025-04-01",
    harvestDate: "2025-12-01",
  },
  {
    id: "inv-005",
    farmerName: "Fatima Ibrahim",
    location: "Vandeikya, Benue",
    crop: "Groundnut (SAMNUT 24)",
    hectares: 4,
    expectedYield: 12000,
    expectedRevenue: 30000000,
    investmentNeeded: 1500000,
    investorShare: 35,
    farmerShare: 50,
    agentShare: 10,
    platformShare: 5,
    duration: "5 months",
    riskLevel: "low",
    reputationScore: 90,
    agentVerified: true,
    insuranceIncluded: true,
    images: [
      "/images/groundnut.jpg",
    ],
    description: "Groundnut farmer with SAMNUT 24 variety. 9 years experience. High demand from oil processors. Full insurance coverage. Agent-verified.",
    plantingDate: "2025-06-01",
    harvestDate: "2025-10-20",
  },
  {
    id: "inv-006",
    farmerName: "Peter Ochoga",
    location: "Gwer West, Benue",
    crop: "Tomato (Roma VF)",
    hectares: 1.5,
    expectedYield: 18000,
    expectedRevenue: 27000000,
    investmentNeeded: 800000,
    investorShare: 35,
    farmerShare: 50,
    agentShare: 10,
    platformShare: 5,
    duration: "4 months",
    riskLevel: "high",
    reputationScore: 72,
    agentVerified: true,
    insuranceIncluded: true,
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80",
    ],
    description: "Tomato farmer with Roma VF variety. Greenhouse cultivation. High value but perishable. Cold-chain logistics included. Insurance covers disease outbreak.",
    plantingDate: "2025-07-01",
    harvestDate: "2025-10-15",
  },
];

const riskColors = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-red-100 text-red-700 border-red-200",
};

export default function InvestmentExchange() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [minReputation, setMinReputation] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState<FarmingOpportunity | null>(null);
  const [investAmount, setInvestAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"browse" | "my-investments" | "returns">("browse");

  const filtered = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((opp) => {
      const matchesSearch = opp.farmerName.toLowerCase().includes(search.toLowerCase()) ||
        opp.crop.toLowerCase().includes(search.toLowerCase()) ||
        opp.location.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = riskFilter === "all" || opp.riskLevel === riskFilter;
      const matchesReputation = opp.reputationScore >= minReputation;
      return matchesSearch && matchesRisk && matchesReputation;
    });
  }, [search, riskFilter, minReputation]);

  const getRiskLabel = (risk: string) => risk.charAt(0).toUpperCase() + risk.slice(1);

  const handleInvest = () => {
    if (!selectedOpportunity || !investAmount) return;
    const amount = parseFloat(investAmount);
    if (amount < 50000) {
      alert("Minimum investment is ₦50,000");
      return;
    }
    if (amount > selectedOpportunity.investmentNeeded) {
      alert("Cannot invest more than needed");
      return;
    }
    alert(`Investment of ₦${amount.toLocaleString()} committed for ${selectedOpportunity.farmerName}'s ${selectedOpportunity.crop} farm! Smart contract created. Funds held in escrow.`);
    setSelectedOpportunity(null);
    setInvestAmount("");
    setActiveTab("my-investments");
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-emerald-900">Investment Exchange — "Help a Farmer"</h2>
            <p className="mt-1 text-sm text-stone-500">Browse verified farming opportunities. Invest with escrow protection. Earn at harvest.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600">
              <Heart className="h-4 w-4" />
              My Investments
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search farmer, crop, location..."
                className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none">
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <select value={minReputation} onChange={(e) => setMinReputation(parseInt(e.target.value))} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none">
              <option value={0}>Min Reputation: Any</option>
              <option value={70}>Min Reputation: 70+</option>
              <option value={80}>Min Reputation: 80+</option>
              <option value={90}>Min Reputation: 90+</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-1">
          {["browse", "my-investments", "returns"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activeTab === tab ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
            >
              {tab === "browse" && "Browse Opportunities"}
              {tab === "my-investments" && "My Investments"}
              {tab === "returns" && "Returns & Payouts"}
            </button>
          ))}
        </div>

        {activeTab === "browse" && (
          <>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Warning className="h-12 w-12 text-stone-300" />
                <p className="mt-3 text-sm font-medium text-stone-500">No opportunities match your filters.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((opp) => (
                  <motion.div
                    key={opp.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSelectedOpportunity(opp)}
                    className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                      <img src={opp.images[0]} alt={opp.crop} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium border ${riskColors[opp.riskLevel]}`}>
                        {getRiskLabel(opp.riskLevel)} Risk
                      </span>
                      {opp.agentVerified && (
                        <span className="absolute right-2 top-2 rounded-full bg-emerald-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                          <Shield className="mr-1 inline h-3 w-3" weight="fill" />
                          Agent Verified
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <MapPin className="h-3 w-3" weight="fill" />
                        {opp.location}
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-stone-900">{opp.crop}</h3>
                      <p className="mt-1 text-xs text-stone-500">{opp.farmerName} • {opp.hectares} ha</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500" weight="fill" />
                          <span className="text-xs font-medium text-stone-700">{opp.reputationScore}</span>
                        </div>
                        <span className="text-lg font-bold text-emerald-800">₦{opp.investmentNeeded.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 text-xs text-stone-500">
                        Investor: {opp.investorShare}% • Farmer: {opp.farmerShare}% • Agent: {opp.agentShare}% • Platform: {opp.platformShare}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "my-investments" && (
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-100 px-5 py-3">
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Active Investments</p>
            </div>
            <div className="divide-y divide-stone-100">
              {MOCK_OPPORTUNITIES.slice(0, 3).map((opp, i) => (
                <div key={opp.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-stone-900">{opp.crop} — {opp.farmerName}</h3>
                      <p className="text-xs text-stone-500">{opp.location} • {opp.duration} • Planted: {opp.plantingDate}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${riskColors[opp.riskLevel]}`}>
                      {getRiskLabel(opp.riskLevel)}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-stone-500">Invested</p>
                      <p className="font-bold text-emerald-800">₦{(opp.investmentNeeded * 0.3).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-stone-500">Expected Return</p>
                      <p className="font-bold text-emerald-800">₦{(opp.expectedRevenue * 0.35 / 100).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-stone-500">Progress</p>
                      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(100, (i + 1) * 30)}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                      View Monitoring Reports
                    </button>
                    <button className="flex-1 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                      Reinvest Returns
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "returns" && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendUp className="h-5 w-5" />
                <span className="text-sm font-medium">Total Returns</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-emerald-800">₦ 2,840,000</p>
              <p className="mt-1 text-xs text-stone-500">From 4 completed cycles</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <CurrencyNgn className="h-5 w-5" />
                <span className="text-sm font-medium">Available to Withdraw</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-emerald-800">₦ 1,200,000</p>
              <p className="mt-1 text-xs text-stone-500">Instant withdrawal to bank</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <Heart className="h-5 w-5" weight="fill" />
                <span className="text-sm font-medium">Farmers Supported</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-emerald-800">12</p>
              <p className="mt-1 text-xs text-stone-500">Across 6 LGAs in Benue</p>
            </div>
          </div>
        )}

        {/* Investment Detail Modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ${selectedOpportunity ? "" : "hidden"}`}
          onClick={() => setSelectedOpportunity(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {selectedOpportunity && (
              <>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={selectedOpportunity.images[0]} alt={selectedOpportunity.crop} className="h-full w-full object-cover" />
                  <button onClick={() => setSelectedOpportunity(null)} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute left-3 bottom-3 flex gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${riskColors[selectedOpportunity.riskLevel]}`}>
                      {getRiskLabel(selectedOpportunity.riskLevel)} Risk
                    </span>
                    {selectedOpportunity.agentVerified && (
                      <span className="rounded-full bg-emerald-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        <Shield className="mr-1 inline h-3 w-3" weight="fill" />
                        Agent Verified
                      </span>
                    )}
                    {selectedOpportunity.insuranceIncluded && (
                      <span className="rounded-full bg-blue-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        Insured
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">{selectedOpportunity.crop}</h3>
                      <p className="mt-1 text-sm text-stone-500">{selectedOpportunity.farmerName} • {selectedOpportunity.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-800">₦{selectedOpportunity.investmentNeeded.toLocaleString()}</p>
                      <p className="text-xs text-stone-500">Total Investment Needed</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{selectedOpportunity.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-stone-500">
                    <div><span className="font-medium">Hectares:</span> {selectedOpportunity.hectares} ha</div>
                    <div><span className="font-medium">Expected Yield:</span> {selectedOpportunity.expectedYield.toLocaleString()} kg</div>
                    <div><span className="font-medium">Expected Revenue:</span> ₦{selectedOpportunity.expectedRevenue.toLocaleString()}</div>
                    <div><span className="font-medium">Duration:</span> {selectedOpportunity.duration}</div>
                    <div><span className="font-medium">Planting:</span> {selectedOpportunity.plantingDate}</div>
                    <div><span className="font-medium">Harvest:</span> {selectedOpportunity.harvestDate}</div>
                    <div><span className="font-medium">Reputation Score:</span> {selectedOpportunity.reputationScore}/100</div>
                    <div><span className="font-medium">Insurance:</span> {selectedOpportunity.insuranceIncluded ? "Yes (NAIC Weather-Index)" : "No"}</div>
                  </div>
                  <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Revenue Split</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between"><span>Farmer</span> <span className="font-semibold">{selectedOpportunity.farmerShare}%</span></div>
                      <div className="flex justify-between"><span>Investor (You)</span> <span className="font-semibold text-emerald-700">{selectedOpportunity.investorShare}%</span></div>
                      <div className="flex justify-between"><span>Agent</span> <span className="font-semibold">{selectedOpportunity.agentShare}%</span></div>
                      <div className="flex justify-between"><span>Platform</span> <span className="font-semibold">{selectedOpportunity.platformShare}%</span></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-stone-700">Your Investment Amount (₦)</label>
                    <input
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      placeholder={`Min ₦50,000 • Max ₦${selectedOpportunity.investmentNeeded.toLocaleString()}`}
                      className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => setSelectedOpportunity(null)} className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50">
                      Cancel
                    </button>
                    <button onClick={handleInvest} className="flex-1 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                      Commit Investment
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
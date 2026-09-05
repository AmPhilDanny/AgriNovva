import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Warning, Calculator, FileText, Clock, Heart, House, TrendUp, Umbrella, Drop, Sun, Cloud, Wind, Flame, Leaf, UserCheck, SealCheck, CurrencyNgn, ArrowRight, CaretDown, CaretUp, X } from "@phosphor-icons/react";

interface InsuranceProduct {
  id: string;
  name: string;
  provider: string;
  type: "weather-index" | "yield-based" | "area-yield" | "named-peril" | "multi-peril";
  crops: string[];
  coverage: string;
  premiumRate: number; // percentage of sum insured
  minSumInsured: number;
  maxSumInsured: number;
  payoutTrigger: string;
  payoutSpeed: string;
  regions: string[];
  features: string[];
  excluded: string[];
  claimProcess: string[];
  rating: number;
  isPopular: boolean;
  color: string;
  icon: typeof Shield;
}

const MOCK_INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    id: "ins-001",
    name: "NAIC Weather-Index Insurance",
    provider: "NAIC (Nigerian Agricultural Insurance Corporation)",
    type: "weather-index",
    crops: ["Rice", "Maize", "Millet", "Sorghum", "Soybean", "Groundnut", "Cotton"],
    coverage: "Drought, Excess Rainfall, Dry Spells",
    premiumRate: 3.5,
    minSumInsured: 50000,
    maxSumInsured: 5000000,
    payoutTrigger: "Automatic via satellite weather data (no field visit needed)",
    payoutSpeed: "7-14 days after trigger",
    regions: ["All Benue LGAs", "Nationwide"],
    features: [
      "No paperwork for claims - automatic satellite triggers",
      "Covers entire growing season",
      "Index based on nearest weather station/satellite",
      "Government subsidized premium (up to 50%)",
      "Payout directly to farmer's bank account",
    ],
    excluded: ["Pest/disease damage (unless weather-related)", "Theft", "Fire (unless lightning)", "Poor management"],
    claimProcess: [
      "Weather trigger detected by satellite/station",
      "Automatic calculation of payout based on index",
      "Notification sent via SMS to farmer",
      "Payout transferred to registered bank account",
      "Farmer confirms receipt via USSD/app",
    ],
    rating: 4.5,
    isPopular: true,
    color: "emerald",
    icon: Shield,
  },
  {
    id: "ins-002",
    name: "Leadway Multi-Peril Crop Insurance",
    provider: "Leadway Assurance",
    type: "multi-peril",
    crops: ["Rice", "Maize", "Cassava", "Yam", "Tomato", "Pepper", "Vegetables"],
    coverage: "Drought, Flood, Fire, Lightning, Storm, Pest/Disease Outbreak",
    premiumRate: 5.0,
    minSumInsured: 100000,
    maxSumInsured: 10000000,
    payoutTrigger: "Field assessment by loss adjuster + weather data verification",
    payoutSpeed: "14-30 days after assessment",
    regions: ["Benue", "Niger", "Kogi", "Nasarawa", "Taraba"],
    features: [
      "Comprehensive coverage including pests/diseases",
      "Covers post-harvest losses (up to 14 days storage)",
      "Optional livestock add-on",
      "Dedicated claims hotline",
      "Premium financing available through partner banks",
    ],
    excluded: ["Pre-existing conditions", "Negligence", "War/civil unrest", "Nuclear risks"],
    claimProcess: [
      "Farmer reports loss within 48 hours via hotline/app",
      "Loss adjuster visits farm within 72 hours",
      "Assessment report submitted to Leadway",
      "Approval and payout processing",
      "Payment to farmer's account",
    ],
    rating: 4.2,
    isPopular: false,
    color: "blue",
    icon: Shield,
  },
  {
    id: "ins-003",
    name: "AIICO Area Yield Index Insurance",
    provider: "AIICO Insurance",
    type: "area-yield",
    crops: ["Rice", "Maize", "Sorghum", "Millet"],
    coverage: "Area yield shortfall below historical average",
    premiumRate: 2.8,
    minSumInsured: 50000,
    maxSumInsured: 3000000,
    payoutTrigger: "Official government yield statistics for LGA fall below threshold",
    payoutSpeed: "30-60 days after harvest statistics published",
    regions: ["Benue State LGAs", "Selected Northern States"],
    features: [
      "Lowest premium rate in market",
      "Based on LGA-level government yield data",
      "No individual farm assessment needed",
      "Ideal for smallholder farmers in same area",
      "Government co-financing available",
    ],
    excluded: ["Individual farm losses above area average", "Non-yield risks", "Quality losses"],
    claimProcess: [
      "Government publishes LGA yield statistics",
      "Automatic comparison to historical threshold",
      "Payout calculated if area yield < threshold",
      "Bulk payout to all insured farmers in LGA",
      "Notification via SMS/agent",
    ],
    rating: 4.0,
    isPopular: false,
    color: "purple",
    icon: Shield,
  },
  {
    id: "ins-004",
    name: "NSIA Named Peril Insurance",
    provider: "NSIA Insurance",
    type: "named-peril",
    crops: ["All crops"],
    coverage: "Fire, Lightning, Flood, Windstorm, Hail",
    premiumRate: 2.0,
    minSumInsured: 100000,
    maxSumInsured: 5000000,
    payoutTrigger: "Verified occurrence of named peril + damage assessment",
    payoutSpeed: "14-21 days",
    regions: ["Nationwide"],
    features: [
      "Most affordable basic coverage",
      "Covers specific named perils only",
      "Can be combined with weather-index",
      "Simple claim process",
      "Available for all crop types",
    ],
    excluded: ["Drought", "Pests/Diseases", "Theft", "Price fluctuations"],
    claimProcess: [
      "Farmer reports named peril event",
      "Adjuster verifies peril occurrence",
      "Damage assessment conducted",
      "Payout based on sum insured and damage %",
      "Payment processed",
    ],
    rating: 3.8,
    isPopular: false,
    color: "orange",
    icon: Shield,
  },
  {
    id: "ins-005",
    name: "AgriNovva Bundled Protection Plan",
    provider: "AgriNovva (Partner: NAIC + Leadway)",
    type: "multi-peril",
    crops: ["All crops on platform"],
    coverage: "Weather-index + Yield protection + Input quality + Price floor",
    premiumRate: 4.5,
    minSumInsured: 50000,
    maxSumInsured: 10000000,
    payoutTrigger: "Multi-trigger: weather index OR yield shortfall OR input failure OR price drop",
    payoutSpeed: "7-21 days depending on trigger",
    regions: ["Platform farmers in Benue (23 LGAs)"],
    features: [
      "Exclusive to AgriNovva platform farmers",
      "Bundles 4 protections in one policy",
      "Input quality guarantee (replacement if fake)",
      "Price floor protection (top-up if market < floor)",
      "Agent-assisted claims",
      "Premium deducted from harvest proceeds",
    ],
    excluded: ["Intentional damage", "War/nuclear", "Unverified farming practices"],
    claimProcess: [
      "Trigger detected (auto weather / agent report / market data)",
      "Platform validates with agent + satellite data",
      "Auto-approval for weather/price triggers",
      "Agent-assisted for yield/input claims",
      "Payout to farmer wallet / escrow release",
    ],
    rating: 4.8,
    isPopular: true,
    color: "emerald",
    icon: Shield,
  },
];

const typeLabels = {
  "weather-index": "Weather Index",
  "yield-based": "Yield Based",
  "area-yield": "Area Yield Index",
  "named-peril": "Named Peril",
  "multi-peril": "Multi-Peril",
};

const typeColors = {
  "weather-index": "bg-blue-100 text-blue-700",
  "yield-based": "bg-green-100 text-green-700",
  "area-yield": "bg-purple-100 text-purple-700",
  "named-peril": "bg-orange-100 text-orange-700",
  "multi-peril": "bg-emerald-100 text-emerald-700",
};

export default function InsuranceProducts() {
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "my-policies" | "claims">("products");
  const [expandDetails, setExpandDetails] = useState<Record<string, boolean>>({});

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-emerald-900">Insurance Products</h2>
            <p className="mt-1 text-sm text-stone-500">Protect your crops and investments with weather-index, multi-peril, and bundled coverage</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-1">
          {["products", "my-policies", "claims"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activeTab === tab ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
            >
              {tab === "products" && "Browse Products"}
              {tab === "my-policies" && "My Policies"}
              {tab === "claims" && "Claims Center"}
            </button>
          ))}
        </div>

        {activeTab === "products" && (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {MOCK_INSURANCE_PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {product.isPopular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[product.type]}`}>
                        {typeLabels[product.type]}
                      </span>
                      {product.isPopular && (
                        <span className="ml-2 rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${product.color}-100`}>
                      <product.icon className={`h-5 w-5 ${product.color}-600`} />
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-stone-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-stone-500">{product.provider}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-800">{product.premiumRate}%</span>
                    <span className="text-sm text-stone-500">premium rate</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1"><CurrencyNgn className="h-3.5 w-3.5" /> Min: ₦{product.minSumInsured.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><CurrencyNgn className="h-3.5 w-3.5" /> Max: ₦{product.maxSumInsured.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {product.payoutSpeed}</span>
                    <span className="flex items-center gap-1"><SealCheck className="h-3.5 w-3.5" /> {product.rating}/5</span>
                  </div>
                </div>
                <div className="border-t border-stone-100 p-5">
                  <button
                    onClick={() => setExpandDetails(prev => ({ ...prev, [product.id]: !expandDetails[product.id] }))}
                    className="flex w-full items-center justify-between text-sm font-medium text-emerald-700 hover:text-emerald-600"
                  >
                    <span>Coverage Details</span>
                    {expandDetails[product.id] ? <CaretUp className="h-4 w-4" /> : <CaretDown className="h-4 w-4" />}
                  </button>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: expandDetails[product.id] ? "auto" : 0, opacity: expandDetails[product.id] ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-stone-700">Crops Covered</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {product.crops.map((crop) => (
                          <span key={crop} className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">{crop}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-stone-700">Coverage</p>
                      <p className="mt-1 text-stone-600">{product.coverage}</p>
                    </div>
                    <div>
                      <p className="font-medium text-stone-700">Payout Trigger</p>
                      <p className="mt-1 text-stone-600">{product.payoutTrigger}</p>
                    </div>
                    <div>
                      <p className="font-medium text-stone-700">Key Features</p>
                      <ul className="mt-1 space-y-1">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-stone-600">
                            <CheckCircle className="h-4 w-4 text-emerald-500" size={12} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-stone-700">Exclusions</p>
                      <ul className="mt-1 space-y-1">
                        {product.excluded.map((e, i) => (
                          <li key={i} className="flex items-center gap-2 text-stone-500">
                            <XCircle className="h-4 w-4 text-red-500" size={12} />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <p className="font-medium text-emerald-800">Quick Enrollment for Platform Farmers</p>
                      <p className="mt-1 text-sm text-emerald-700">Premium auto-deducted from harvest proceeds. Agent-assisted enrollment available.</p>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-all"
                    >
                      Enroll Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "my-policies" && (
          <div className="space-y-4">
            {[
              { policyId: "POL-2025-001234", product: "NAIC Weather-Index Insurance", crop: "Rice (5 ha)", sumInsured: 2500000, premium: 87500, status: "active", startDate: "2025-05-15", endDate: "2025-11-15", nextPayment: "₦0 (paid)", agent: "Musa Ibrahim" },
              { policyId: "POL-2025-001235", product: "AgriNovva Bundled Protection Plan", crop: "Maize (8 ha)", sumInsured: 1800000, premium: 81000, status: "active", startDate: "2025-06-01", endDate: "2025-10-15", nextPayment: "₦0 (paid)", agent: "Aisha Bello" },
              { policyId: "POL-2025-001236", product: "Leadway Multi-Peril Crop Insurance", crop: "Tomato (1.5 ha)", sumInsured: 800000, premium: 40000, status: "pending_payment", startDate: "2025-07-01", endDate: "2025-10-15", nextPayment: "₦40,000", agent: "Grace Ogbu" },
            ].map((policy, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-stone-900">{policy.product}</h3>
                    <p className="text-sm text-stone-500">{policy.crop} • {policy.policyId}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${policy.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {policy.status.replace("_", " ")}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-stone-500">Sum Insured</span> <p className="font-bold text-emerald-800">₦{policy.sumInsured.toLocaleString()}</p></div>
                  <div><span className="text-stone-500">Premium Paid</span> <p className="font-bold">₦{policy.premium.toLocaleString()}</p></div>
                  <div><span className="text-stone-500">Period</span> <p className="font-bold">{policy.startDate} → {policy.endDate}</p></div>
                  <div><span className="text-stone-500">Agent</span> <p className="font-bold">{policy.agent}</p></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    <FileText className="mr-1 h-4 w-4" /> View Certificate
                  </button>
                  <button className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-600">
                    <CaretDown className="mr-1 h-4 w-4" /> Details
                  </button>
                  {policy.status === "pending_payment" && (
                    <button className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
                      Pay Now
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "claims" && (
          <div className="space-y-4">
            {[
              { claimId: "CLM-2025-000456", policy: "NAIC Weather-Index Insurance", trigger: "Drought - 45 day dry spell", status: "paid", amount: 1250000, filedDate: "2025-10-10", paidDate: "2025-10-17", agent: "Musa Ibrahim" },
              { claimId: "CLM-2025-000457", policy: "AgriNovva Bundled Protection Plan", trigger: "Price floor breach - Maize", status: "processing", amount: 340000, filedDate: "2025-11-01", paidDate: null, agent: "Aisha Bello" },
              { claimId: "CLM-2025-000458", policy: "Leadway Multi-Peril", trigger: "Flood damage - Tomato greenhouse", status: "assessment", amount: 480000, filedDate: "2025-09-15", paidDate: null, agent: "Grace Ogbu" },
            ].map((claim, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-stone-900">{claim.claimId}</h3>
                    <p className="text-sm text-stone-500">{claim.policy} • {claim.trigger}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${claim.status === "paid" ? "bg-emerald-100 text-emerald-700" : claim.status === "processing" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                    {claim.status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-stone-500">Claim Amount</span> <p className="font-bold text-emerald-800">₦{claim.amount.toLocaleString()}</p></div>
                  <div><span className="text-stone-500">Filed</span> <p className="font-bold">{claim.filedDate}</p></div>
                  <div><span className="text-stone-500">Paid</span> <p className="font-bold">{claim.paidDate || "Pending"}</p></div>
                  <div><span className="text-stone-500">Agent</span> <p className="font-bold">{claim.agent}</p></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    <FileText className="mr-1 h-4 w-4" /> View Documents
                  </button>
                  <button className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-600">
                    <Clock className="mr-1 h-4 w-4" /> Timeline
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className={`relative h-32 ${selectedProduct.color}-600`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <selectedProduct.icon className="h-16 w-16 text-white/20" />
                </div>
                <button onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[selectedProduct.type]}`}>
                    {typeLabels[selectedProduct.type]}
                  </span>
                  {selectedProduct.isPopular && (
                    <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-medium">Popular</span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-bold text-stone-900">{selectedProduct.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{selectedProduct.provider}</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="text-2xl font-bold text-emerald-800">{selectedProduct.premiumRate}%</p>
                    <p className="text-xs text-stone-500">Premium Rate</p>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="text-2xl font-bold text-emerald-800">₦{selectedProduct.minSumInsured.toLocaleString()}</p>
                    <p className="text-xs text-stone-500">Min Coverage</p>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="text-2xl font-bold text-emerald-800">{selectedProduct.rating}/5</p>
                    <p className="text-xs text-stone-500">Farmer Rating</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-stone-600">
                    <Umbrella className="h-5 w-5 text-emerald-600" />
                    <span><strong>Coverage:</strong> {selectedProduct.coverage}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span><strong>Payout Speed:</strong> {selectedProduct.payoutSpeed}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                    <span><strong>Crops:</strong> {selectedProduct.crops.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <House className="h-5 w-5 text-emerald-600" />
                    <span><strong>Regions:</strong> {selectedProduct.regions.join(", ")}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-emerald-50 p-4">
                  <p className="font-medium text-emerald-800">Enrollment for Platform Farmers</p>
                  <p className="mt-1 text-sm text-emerald-700">Premium auto-deducted from harvest proceeds. No upfront cash needed. Agent-assisted enrollment available at your collection point.</p>
                </div>
                <button className="mt-4 w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                  Enroll in This Plan
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
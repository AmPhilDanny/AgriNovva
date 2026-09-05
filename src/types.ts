export type UserRole = "farmer" | "buyer" | "logistics";

export interface ProduceItem {
  id: string;
  title: string;
  farmerName: string;
  location: string;
  category: "grains" | "vegetables" | "fruits" | "organic" | "dairy-poultry";
  grade: "premium" | "standard" | "economy";
  pricePerKg: number;
  availableQty: number;
  organicCert: boolean;
  image: string;
  rating: number;
  harvestDate: string;
  description: string;
}

export interface SupplyChainStep {
  label: string;
  completed: boolean;
  timestamp: string;
  location: string;
}

export interface SupplyChainShipment {
  id: string;
  produceTitle: string;
  origin: string;
  destination: string;
  status: "pending" | "in-transit" | "delivered" | "disputed";
  driverName: string;
  coldStorageTemp: number;
  routeProgress: number;
  escrowAmount: number;
  escrowReleased: boolean;
  steps: SupplyChainStep[];
  tempLog: { time: string; temp: number }[];
}

export interface MarketPrice {
  commodity: string;
  price: string;
  change: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

export interface AdvisoryTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  severity: "info" | "warning" | "critical";
}

export interface CropDiseaseScan {
  id: string;
  image: string;
  diseaseName: string;
  confidence: number;
  remedy: string;
  timestamp: string;
}

export interface CartItem {
  produceId: string;
  title: string;
  qty: number;
  pricePerKg: number;
  farmerName: string;
}

export interface EscrowOrder {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "released" | "disputed";
  timestamp: string;
  buyerName: string;
  farmerName: string;
}

export type TabId = "marketplace" | "supply-chain" | "agri-advisor" | "investment-exchange" | "agent-network" | "insurance" | "government" | "input-verification" | "price-contracts" | "dashboard" | "download-app" | "agent-portal";
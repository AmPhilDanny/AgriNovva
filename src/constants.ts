import type { ProduceItem, SupplyChainShipment, MarketPrice, AdvisoryTopic } from "./types";

export const BRAND = {
  name: "AgriNovva",
  tagline: "From Farm to Fork, Transparently",
  description: "Empowering farmers, buyers, and logistics partners with a transparent, AI-driven agricultural marketplace.",
};

export const INITIAL_PRODUCE: ProduceItem[] = [
  { id: "p1", title: "Premium Organic Brown Rice", farmerName: "Muthoni Farms", location: "Kirinyaga, Nigeria", category: "organic", grade: "premium", pricePerKg: 2800, availableQty: 5000, organicCert: true, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80", rating: 4.8, harvestDate: "2025-03-10", description: "Hand-harvested organic brown rice from the foothills of Mt. Nigeria. Naturally grown without pesticides." },
  { id: "p2", title: "Fresh Vine Tomatoes", farmerName: "Green Valley Co-op", location: "Nakuru, Nigeria", category: "vegetables", grade: "premium", pricePerKg: 1500, availableQty: 2000, organicCert: false, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80", rating: 4.5, harvestDate: "2025-03-14", description: "Plump, vine-ripened tomatoes harvested fresh daily. Perfect for salads and sauces." },
  { id: "p3", title: "Sweet Nigerian Mangoes", farmerName: "Coast Tropical Fruits", location: "Mombasa, Nigeria", category: "fruits", grade: "premium", pricePerKg: 1800, availableQty: 3000, organicCert: false, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80", rating: 4.9, harvestDate: "2025-03-12", description: "Sun-ripened sweet mangoes from the Nigerian coast. Naturally juicy and fiber-free." },
  { id: "p4", title: "Grade A White Maize", farmerName: "Rift Valley Grains", location: "Uasin Gishu, Nigeria", category: "grains", grade: "standard", pricePerKg: 650, availableQty: 10000, organicCert: false, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80", rating: 4.2, harvestDate: "2025-02-28", description: "High-yield white maize from the breadbasket of Nigeria. Dried and graded for quality." },
  { id: "p5", title: "Organic Free-Range Eggs", farmerName: "Happy Hens Farm", location: "Kiambu, Nigeria", category: "dairy-poultry", grade: "premium", pricePerKg: 3500, availableQty: 800, organicCert: true, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80", rating: 4.7, harvestDate: "2025-03-15", description: "Farm-fresh free-range eggs from pasture-raised hens. Rich in omega-3 and flavor." },
  { id: "p6", title: "Fresh Kale (Sukuma Wiki)", farmerName: "Highlands Greens", location: "Nyeri, Nigeria", category: "vegetables", grade: "standard", pricePerKg: 800, availableQty: 1500, organicCert: false, image: "https://images.unsplash.com/photo-1522184216316-3c25379f9720?w=600&q=80", rating: 4.3, harvestDate: "2025-03-13", description: "Crisp, dark green kale bunches harvested daily. Staple green for every Nigerian kitchen." },
  { id: "p7", title: "Organic Avocados (Fuerte)", farmerName: "Muthoni Farms", location: "Muranga, Nigeria", category: "organic", grade: "premium", pricePerKg: 2200, availableQty: 2500, organicCert: true, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80", rating: 4.9, harvestDate: "2025-03-11", description: "Creamy Fuerte avocados grown organically in the central highlands. Export quality." },
  { id: "p8", title: "Fresh Cow Milk", farmerName: "Dairy Gold Co-op", location: "Nandi, Nigeria", category: "dairy-poultry", grade: "premium", pricePerKg: 900, availableQty: 3000, organicCert: false, image: "https://images.unsplash.com/photo-1624628639859-c31b5e6e5c0b?w=600&q=80", rating: 4.4, harvestDate: "2025-03-15", description: "Fresh pasteurized whole milk from grass-fed Ayrshire cows. Delivered chilled." },
  { id: "p9", title: "Sorghum Grain", farmerName: "Eastern Drylands Farm", location: "Kitui, Nigeria", category: "grains", grade: "economy", pricePerKg: 500, availableQty: 6000, organicCert: false, image: "https://images.unsplash.com/photo-1590259223388-aa2e5b3093af?w=600&q=80", rating: 4.0, harvestDate: "2025-02-20", description: "Drought-resistant sorghum grain from semi-arid regions. Ideal for flour and animal feed." },
  { id: "p10", title: "Passion Fruit", farmerName: "Coast Tropical Fruits", location: "Kwale, Nigeria", category: "fruits", grade: "premium", pricePerKg: 3000, availableQty: 1200, organicCert: false, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80", rating: 4.6, harvestDate: "2025-03-14", description: "Sweet-tart passion fruits bursting with flavor. Perfect for juice and desserts." },
];

export const INITIAL_SHIPMENTS: SupplyChainShipment[] = [
  {
    id: "s1", produceTitle: "Premium Organic Brown Rice", origin: "Kirinyaga, Nigeria", destination: "Nairobi Wholesale Market", status: "in-transit",
    driverName: "James Ochieng", coldStorageTemp: 4.2, routeProgress: 65, escrowAmount: 14000, escrowReleased: false,
    steps: [
      { label: "Harvested & Packed", completed: true, timestamp: "2025-03-10 06:00", location: "Kirinyaga Farm" },
      { label: "Quality Inspection", completed: true, timestamp: "2025-03-10 14:00", location: "Kirinyaga Grading Center" },
      { label: "Loaded for Transit", completed: true, timestamp: "2025-03-11 07:00", location: "Kirinyaga Depot" },
      { label: "In Transit to Nairobi", completed: true, timestamp: "2025-03-12 10:00", location: "Thika Highway" },
      { label: "Arrival at Nairobi Market", completed: false, timestamp: "ETA 2025-03-16", location: "Nairobi Wholesale" },
      { label: "Escrow Release", completed: false, timestamp: "Pending", location: "Payment Gateway" },
    ],
    tempLog: [
      { time: "Day 1", temp: 4.5 }, { time: "Day 2", temp: 4.3 }, { time: "Day 3", temp: 4.0 },
      { time: "Day 4", temp: 4.2 }, { time: "Day 5", temp: 4.4 },
    ],
  },
  {
    id: "s2", produceTitle: "Fresh Vine Tomatoes", origin: "Nakuru, Nigeria", destination: "Mombasa Port", status: "pending",
    driverName: "Amina Hassan", coldStorageTemp: 6.0, routeProgress: 0, escrowAmount: 3000, escrowReleased: false,
    steps: [
      { label: "Harvested & Packed", completed: false, timestamp: "Scheduled 2025-03-18", location: "Nakuru Farm" },
      { label: "Quality Inspection", completed: false, timestamp: "Pending", location: "Nakuru Grading" },
      { label: "Loaded for Transit", completed: false, timestamp: "Pending", location: "Nakuru Depot" },
      { label: "In Transit to Mombasa", completed: false, timestamp: "Pending", location: "Nairobi-Mombasa Highway" },
      { label: "Arrival at Port", completed: false, timestamp: "Pending", location: "Mombasa Port" },
      { label: "Escrow Release", completed: false, timestamp: "Pending", location: "Payment Gateway" },
    ],
    tempLog: [{ time: "Day 1", temp: 6.2 }],
  },
  {
    id: "s3", produceTitle: "Sweet Nigerian Mangoes", origin: "Mombasa, Nigeria", destination: "Nairobi Fresh Market", status: "delivered",
    driverName: "Peter Kamau", coldStorageTemp: 5.5, routeProgress: 100, escrowAmount: 5400, escrowReleased: true,
    steps: [
      { label: "Harvested & Packed", completed: true, timestamp: "2025-03-10 05:00", location: "Mombasa Farm" },
      { label: "Quality Inspection", completed: true, timestamp: "2025-03-10 13:00", location: "Mombasa Grading" },
      { label: "Loaded for Transit", completed: true, timestamp: "2025-03-11 06:00", location: "Mombasa Depot" },
      { label: "In Transit to Nairobi", completed: true, timestamp: "2025-03-12 08:00", location: "Mombasa Road" },
      { label: "Arrival at Nairobi Market", completed: true, timestamp: "2025-03-14 07:00", location: "Nairobi Fresh Market" },
      { label: "Escrow Release", completed: true, timestamp: "2025-03-14 14:00", location: "Payment Gateway" },
    ],
    tempLog: [
      { time: "Day 1", temp: 5.8 }, { time: "Day 2", temp: 5.5 }, { time: "Day 3", temp: 5.3 },
      { time: "Day 4", temp: 5.6 }, { time: "Day 5", temp: 5.4 },
    ],
  },
];

export const MARKET_PRICES: MarketPrice[] = [
  { commodity: "Organic Brown Rice", price: "₦ 145", change: 3.2, unit: "/kg", trend: "up" },
  { commodity: "White Maize", price: "₦ 42", change: -1.5, unit: "/kg", trend: "down" },
  { commodity: "Tomatoes", price: "₦ 85", change: 1.8, unit: "/kg", trend: "up" },
  { commodity: "Mangoes", price: "₦ 110", change: 2.5, unit: "/kg", trend: "up" },
  { commodity: "Avocados", price: "₦ 130", change: -0.8, unit: "/kg", trend: "down" },
  { commodity: "Kale (Sukuma Wiki)", price: "₦ 45", change: 0.5, unit: "/bunch", trend: "stable" },
  { commodity: "Free-Range Eggs", price: "₦ 520", change: 4.1, unit: "/tray", trend: "up" },
  { commodity: "Fresh Milk", price: "₦ 65", change: 1.2, unit: "/liter", trend: "up" },
  { commodity: "Sorghum", price: "₦ 38", change: -0.3, unit: "/kg", trend: "down" },
  { commodity: "Passion Fruit", price: "₦ 180", change: 5.0, unit: "/kg", trend: "up" },
];

export const ADVISORY_TOPICS: AdvisoryTopic[] = [
  { id: "a1", title: "Heavy Rainfall Warning — Central Region", category: "weather", summary: "Expect 40-60mm rainfall in central highlands over next 48 hours. Secure drainage and delay harvesting.", severity: "warning" },
  { id: "a2", title: "Maize Lethal Necrosis Detected — Rift Valley", category: "disease", summary: "Reports of MLN in parts of Uasin Gishu. Isolate affected crops and apply approved fungicide.", severity: "critical" },
  { id: "a3", title: "Optimal Tomato Planting Window", category: "agronomy", summary: "Current soil temperatures ideal for tomato transplanting in central and eastern regions.", severity: "info" },
  { id: "a4", title: "Fertilizer Price Drop — Apply Now", category: "market", summary: "DAP and NPK fertilizer prices dropped 12% this week. Recommended top-dressing for maize.", severity: "info" },
  { id: "a5", title: "Drought Stress — Eastern Lowlands", category: "weather", summary: "Below-average rainfall expected in Kitui and Makueni. Switch to drought-tolerant varieties.", severity: "warning" },
  { id: "a6", title: "Coffee Berry Disease Outbreak", category: "disease", summary: "CBD reported in Muranga. Apply copper-based fungicide and prune affected branches immediately.", severity: "critical" },
];

export const SAMPLE_DISEASES = [
  { disease: "Early Blight", confidence: 94, remedy: "Apply Mancozeb or Chlorothalonil fungicide every 7-10 days. Remove infected lower leaves and improve air circulation." },
  { disease: "Yellow Rust", confidence: 91, remedy: "Use resistant wheat varieties. Apply Triazole fungicide at first sign. Rotate crops for 2+ seasons." },
  { disease: "Bacterial Wilt", confidence: 87, remedy: "Remove and destroy infected plants. Apply copper-based bactericide. Practice crop rotation with non-solanaceous crops." },
  { disease: "Powdery Mildew", confidence: 96, remedy: "Apply sulfur-based fungicide or neem oil. Ensure adequate spacing for airflow. Avoid overhead irrigation." },
  { disease: "Healthy Leaf", confidence: 99, remedy: "No treatment needed. Continue regular preventive care and monitoring." },
];
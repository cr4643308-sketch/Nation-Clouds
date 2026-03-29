export const LOCATIONS = [
  { id: 'us', name: 'North America' },
  { id: 'eu', name: 'Europe' },
];

export const PLANS = [
  { 
    id: 'vps', 
    name: 'VPS Hosting', 
    description: 'General-purpose virtual private servers.',
    features: ['2 vCPU', '4GB RAM', '50GB NVMe'],
    prices: { us: 10, eu: 12 }
  },
  { 
    id: 'mc-budget', 
    name: 'Minecraft Budget', 
    description: 'Optimized for cost-effective gaming.',
    features: ['1 vCPU', '2GB RAM', '20GB SSD'],
    prices: { us: 5, eu: 6 }
  },
  { 
    id: 'mc-perf', 
    name: 'Minecraft Performance', 
    description: 'High-clock speed setups for lag-free gaming.',
    features: ['2 vCPU', '6GB RAM', '50GB NVMe'],
    prices: { us: 15, eu: 18 }
  },
  { 
    id: 'mc-prem', 
    name: 'Minecraft Premium', 
    description: 'Top-tier resources with dedicated threads and NVMe storage.',
    features: ['4 vCPU', '12GB RAM', '100GB NVMe'],
    prices: { us: 25, eu: 30 }
  },
];

export const HARDWARE = [
  { name: 'Intel® Xeon® E-5 Series', description: 'For entry-level/budget builds' },
  { name: 'Intel® Xeon® Platinum', description: 'For high-compute tasks' },
  { name: 'AMD EPYC™ Genoa (9th Gen)', description: 'For flagship performance' },
];

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, HardDrive, MemoryStick, Plus, Minus } from 'lucide-react';
import data from '../data.json';

export default function HostingPlans() {
  const [category, setCategory] = useState('premium');
  const [locationId, setLocationId] = useState(data.locations[0].id);
  const [addons, setAddons] = useState({ ram: 0, cpu: 0, disk: 0 });
  
  const location = data.locations.find(l => l.id === locationId)!;
  const categoryData = (data.categories as any)[category];

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && data.categories[hash as keyof typeof data.categories]) {
      setCategory(hash);
    }
  }, []);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    window.location.hash = cat;
    document.getElementById('pricing-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculatePrice = (base: number) => {
    const addonsCost = category === 'performance' ? (addons.ram * data.addons.ram) + (addons.cpu * data.addons.cpu) + (addons.disk * data.addons.disk) : 0;
    const price = (base + addonsCost) * location.markup;
    return Math.round(price / 10) * 10;
  };

  const handleBuy = () => window.open('https://discord.gg/WyRBSKPYD', '_blank');

  return (
    <div className="space-y-12" id="pricing-grid">
      {/* Tabs */}
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="glass p-1 rounded-full flex gap-1">
          {Object.entries(data.categories).map(([key, cat]: [string, any]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${category === key ? 'bg-[var(--primary-accent)] text-white shadow-[0_0_15px_var(--primary-accent)]' : 'hover:bg-white/10'}`}
            >
              {cat.name} [{cat.plans.length}]
            </button>
          ))}
        </div>
      </div>

      {/* Location Switcher */}
      <div className="flex justify-center gap-2">
        {data.locations.map(loc => (
          <button
            key={loc.id}
            onClick={() => setLocationId(loc.id)}
            className={`px-6 py-2 rounded-full text-sm transition-all ${locationId === loc.id ? 'bg-[var(--primary-accent)] text-white shadow-[0_0_15px_var(--primary-accent)]' : 'bg-white/5 border border-white/10'}`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {categoryData.plans.map((plan: any, i: number) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className={`glass p-6 rounded-2xl border ${plan.elite ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10'} flex flex-col relative overflow-hidden`}
            >
              {plan.popular && <div className="absolute top-0 right-0 bg-[var(--primary-accent)] text-white text-xs px-3 py-1 rounded-bl-lg font-bold">POPULAR</div>}
              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <div className="text-sm text-slate-400 mb-6 flex-grow space-y-2">
                <div className="flex items-center gap-2"><MemoryStick size={16} /> RAM: {plan.ram}</div>
                <div className={`flex items-center gap-2 ${plan.cpu === '∞' ? 'animate-pulse-slow text-blue-400' : ''}`}><Cpu size={16} /> CPU: {plan.cpu}</div>
                <div className="flex items-center gap-2"><HardDrive size={16} /> Storage: {plan.storage}</div>
              </div>
              <p className="text-3xl font-bold mb-6">₹{plan.custom ? 'Custom' : calculatePrice(plan.basePrice)}<span className="text-sm font-normal text-slate-500">{plan.custom ? '' : '/mo'}</span></p>
              <button onClick={handleBuy} className="w-full bg-[var(--primary-accent)] py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                Buy Plan
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add-ons Calculator */}
      {category === 'performance' && (
        <div className="glass p-8 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold mb-6">Specs Upgrader</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '+1GB RAM', key: 'ram', price: data.addons.ram },
              { label: '+100% CPU', key: 'cpu', price: data.addons.cpu },
              { label: '+10GB Disk', key: 'disk', price: data.addons.disk }
            ].map(addon => (
              <div key={addon.key} className="flex items-center justify-between">
                <span>{addon.label} (₹{addon.price})</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAddons(prev => ({ ...prev, [addon.key]: Math.max(0, prev[addon.key as keyof typeof addons] - 1) }))} className="bg-white/5 p-2 rounded"><Minus size={16} /></button>
                  <span className="w-8 text-center">{addons[addon.key as keyof typeof addons]}</span>
                  <button onClick={() => setAddons(prev => ({ ...prev, [addon.key]: prev[addon.key as keyof typeof addons] + 1 }))} className="bg-white/5 p-2 rounded"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

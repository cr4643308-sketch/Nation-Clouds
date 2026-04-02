import React, { useState } from 'react';
import VirtualDashboard from './VirtualDashboard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState('Console');
  const [installedPlugins, setInstalledPlugins] = useState<string[]>([]);

  if (!isOpen) return null;

  const tabs = ['Console', 'Log', 'Options', 'Software', 'Plugins', 'Files', 'Players', 'Pricing'];

  const installPlugin = (plugin: string) => {
    setInstalledPlugins(prev => [...prev, plugin]);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">Nation Clouds™ Dashboard</h1>
        <button onClick={onClose} className="text-gray-400 hover:text-white">Close</button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-2">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`text-left py-2 px-4 rounded ${activeTab === tab ? 'bg-blue-900 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'Console' && <VirtualDashboard />}
          {activeTab === 'Plugins' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Plugins</h2>
              {['EssentialsX', 'WorldEdit', 'Vault'].map(plugin => (
                <div key={plugin} className="flex justify-between items-center bg-gray-800 p-4 rounded">
                  <div>
                    <div className="font-bold">{plugin}</div>
                    <div className="text-xs text-gray-400">Compatible with 1.20.1</div>
                  </div>
                  {installedPlugins.includes(plugin) ? (
                    <span className="text-green-500 font-bold">Installed Successfully</span>
                  ) : (
                    <button onClick={() => installPlugin(plugin)} className="bg-green-600 px-4 py-2 rounded font-bold">Install</button>
                  )}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Pricing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Pricing Plans (INR)</h2>
              {[
                { name: 'Premium', plans: ['Dirt (₹30)', 'Gold (₹1000)'] },
                { name: 'Budget', plans: ['Oak (₹80)', 'Netherite (₹1100)'] },
                { name: 'Performance', plans: ['Dirt (₹80)', 'Netherite (₹2560)'] },
                { name: 'VPS', plans: ['Plan 1 (₹800)', 'Plan 4 (₹2800)'] },
              ].map(category => (
                <div key={category.name}>
                  <h3 className="font-bold text-blue-300 mb-2">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.plans.map(plan => (
                      <div key={plan} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                        <span>{plan}</span>
                        <a href="https://discord.gg/WyRBSKPYD" target="_blank" rel="noreferrer" className="bg-blue-600 px-4 py-2 rounded font-bold">Buy Now</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

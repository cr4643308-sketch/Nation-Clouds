import React, { useState, useEffect, useRef } from 'react';

export default function VirtualDashboard({ server, onClose }: { server: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('Console');
  const [status, setStatus] = useState('Online');
  const [logs, setLogs] = useState<string[]>([
    `[System] Allocating ${server.ram} GB RAM from Master Node...`,
    `[System] Server Ready!`
  ]);
  const [installedPlugins, setInstalledPlugins] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (log: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
  };

  const handleAction = (action: string) => {
    if (action === 'Stop') {
      setStatus('Offline');
      addLog('Server stopped.');
    } else if (action === 'Restart') {
      setStatus('Restarting...');
      addLog('Restarting server...');
      setTimeout(() => { setStatus('Online'); addLog('Server online.'); }, 2000);
    } else if (action === 'Start') {
      setStatus('Starting...');
      addLog('Starting server...');
      setTimeout(() => { setStatus('Online'); addLog('Server online.'); }, 3000);
    }
  };

  const tabs = ['Console', 'Log', 'Options', 'Software', 'Plugins', 'Files', 'Players', 'Pricing'];

  return (
    <div className="flex h-full bg-gray-950 text-white">
      <div className="w-48 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-2">
        <div className="font-bold text-blue-400 mb-4">Nation Clouds™</div>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left py-2 px-4 rounded ${activeTab === tab ? 'bg-blue-900' : 'hover:bg-gray-800'}`}>{tab}</button>
        ))}
        <button onClick={onClose} className="mt-auto text-red-400">Close Dashboard</button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{server.name} ({server.ip})</h2>
          <div className={`px-3 py-1 rounded font-bold ${status === 'Online' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>{status}</div>
        </div>
        
        {activeTab === 'Console' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded">CPU: 48 Cores</div>
              <div className="bg-gray-800 p-4 rounded">RAM: {server.ram}GB / 128GB</div>
              <div className="bg-gray-800 p-4 rounded">Disk: 1TB NVMe</div>
              <div className="bg-gray-800 p-4 rounded">Network: 50 Gbps</div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleAction('Start')} className="bg-green-600 px-6 py-2 rounded font-bold">START</button>
              <button onClick={() => handleAction('Restart')} className="bg-gray-600 px-6 py-2 rounded font-bold">RESTART</button>
              <button onClick={() => handleAction('Stop')} className="bg-red-600 px-6 py-2 rounded font-bold">STOP</button>
            </div>
            <div className="bg-black p-4 rounded font-mono text-green-500 text-xs h-60 overflow-y-auto border border-gray-700">
              {logs.map((log, i) => <div key={i}>{log}</div>)}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}
        
        {activeTab === 'Plugins' && (
          <div className="grid grid-cols-2 gap-4">
            {['EssentialsX', 'WorldEdit', 'Vault', 'ViaVersion', 'GeyserMC', 'ClearLag'].map(plugin => (
              <div key={plugin} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <span>{plugin}</span>
                <button onClick={() => { addLog(`[NC-Installer] Downloading ${plugin}.jar... Done!`); setInstalledPlugins([...installedPlugins, plugin]); }} className="bg-green-600 px-4 py-2 rounded">Install</button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'Files' && (
          <div className="bg-gray-800 p-4 rounded font-mono">
            <div>/plugins</div>
            <div>/world</div>
            <div>server.properties</div>
            <div>spigot.yml</div>
          </div>
        )}
      </div>
    </div>
  );
}

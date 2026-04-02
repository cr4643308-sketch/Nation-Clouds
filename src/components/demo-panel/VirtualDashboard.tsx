import React, { useState, useEffect, useRef } from 'react';
import { useNationClouds } from '../../context/NationCloudsContext';

export default function VirtualDashboard({ server, onClose }: { server: any, onClose: () => void }) {
  const { updateServerStatus } = useNationClouds();
  const [activeTab, setActiveTab] = useState('Console');
  const [status, setStatus] = useState<any>('Online');
  const [logs, setLogs] = useState<string[]>([
    `[System] Allocating ${server.ram} GB RAM from Master Node...`,
    `[System] Server Ready!`
  ]);
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

  // Watchdog simulation
  useEffect(() => {
    if (status === 'Online') {
      const timer = setTimeout(() => {
        if (Math.random() > 0.8) {
          setStatus('Offline');
          addLog('CRITICAL: Server Crashed! Stacktrace: java.lang.OutOfMemoryError');
          setTimeout(() => {
            addLog('Watchdog: Auto-Restarting...');
            setStatus('Starting...');
            setTimeout(() => { setStatus('Online'); addLog('Server online.'); }, 2000);
          }, 1000);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const tabs = ['Console', 'Log', 'Options', 'Software', 'Plugins', 'Files', 'Players', 'Pricing'];

  return (
    <div className="flex h-full bg-[#1e2127] text-gray-300 font-sans">
      <div className="w-56 bg-[#181a1f] border-r border-[#131519] p-4 flex flex-col gap-2">
        <div className="font-bold text-white mb-4">Nation Clouds™</div>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left py-2 px-4 rounded ${activeTab === tab ? 'bg-[#292e36] text-white' : 'hover:bg-[#292e36]'}`}>{tab}</button>
        ))}
        <button onClick={onClose} className="mt-auto text-red-400 hover:text-red-300">Close Dashboard</button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b border-[#292e36] pb-4">
          <h2 className="text-2xl font-bold text-white">{server.name}</h2>
          <div className={`px-3 py-1 rounded font-bold ${status === 'Online' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>{status}</div>
        </div>
        
        {activeTab === 'Console' && (
          <div className="space-y-6">
            <div className="bg-black p-4 rounded font-mono text-green-500 text-xs h-60 overflow-y-auto border border-[#131519]">
              {logs.map((log, i) => <div key={i}>{log}</div>)}
              <div ref={logsEndRef} />
            </div>
            <input type="text" placeholder="Type command..." className="w-full bg-[#181a1f] p-3 rounded border border-[#292e36]" />
            <div className="flex gap-4">
              <button onClick={() => handleAction('Start')} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold text-white">START</button>
              <button onClick={() => handleAction('Restart')} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-bold text-white">RESTART</button>
              <button onClick={() => handleAction('Stop')} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold text-white">STOP</button>
              <button className="bg-red-900 hover:bg-red-950 px-6 py-2 rounded font-bold text-white">KILL</button>
            </div>
          </div>
        )}
        
        {activeTab === 'Files' && (
          <div className="bg-[#181a1f] p-4 rounded border border-[#292e36]">
            <table className="w-full text-left">
              <thead><tr className="border-b border-[#292e36]"><th>Name</th><th>Size</th><th>Last Modified</th></tr></thead>
              <tbody>
                <tr><td>plugins/</td><td>-</td><td>2026-04-02</td></tr>
                <tr><td>world/</td><td>-</td><td>2026-04-02</td></tr>
                <tr><td>server.properties</td><td>1KB</td><td>2026-04-02</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

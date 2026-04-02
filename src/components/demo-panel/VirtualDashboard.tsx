import React, { useState, useEffect, useRef } from 'react';

export default function VirtualDashboard() {
  const [status, setStatus] = useState('Online');
  const [logs, setLogs] = useState<string[]>([
    '[NC-System] Allocating 128GB RAM... Done!',
    '[Server] Loading level "world"...',
    '[Server] Nation Clouds Node Optimized!'
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
      setTimeout(() => {
        setStatus('Online');
        addLog('Server online.');
      }, 2000);
    } else if (action === 'Start') {
      setStatus('Starting...');
      addLog('Starting server...');
      setTimeout(() => {
        setStatus('Online');
        addLog('Server online.');
      }, 3000);
    }
  };

  // Simulate random crash
  useEffect(() => {
    if (status === 'Online') {
      const timer = setTimeout(() => {
        if (Math.random() > 0.7) {
          setStatus('Offline');
          addLog('Server Crashed!');
          setTimeout(() => {
            addLog('Nation Clouds Auto-Restarting...');
            setStatus('Starting...');
            setTimeout(() => {
              setStatus('Online');
              addLog('Done! Server online.');
            }, 2000);
          }, 1000);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-400">01.Nationclouds.fun</h2>
        <div className={`px-3 py-1 rounded font-bold ${status === 'Online' ? 'bg-green-900 text-green-300 animate-pulse' : 'bg-red-900 text-red-300'}`}>{status}</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded text-sm">CPU: AMD EPYC™ 7 (48 Cores)</div>
        <div className="bg-gray-800 p-4 rounded text-sm">RAM: 128GB DDR4</div>
        <div className="bg-gray-800 p-4 rounded text-sm">Storage: 1TB NVMe SSD</div>
        <div className="bg-gray-800 p-4 rounded text-sm">Network: 50 Gbps</div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => handleAction('Start')} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold">START</button>
        <button onClick={() => handleAction('Restart')} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-bold">RESTART</button>
        <button onClick={() => handleAction('Stop')} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold">STOP</button>
      </div>

      <div className="bg-black p-4 rounded font-mono text-green-500 text-xs h-60 overflow-y-auto border border-gray-700">
        {logs.map((log, i) => <div key={i}>{log}</div>)}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}

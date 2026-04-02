import React, { useState } from 'react';

export default function VirtualDashboard() {
  const [status, setStatus] = useState('Online');

  const handleAction = (action: string) => {
    if (action === 'Stop') setStatus('Offline');
    else if (action === 'Restart') {
      setStatus('Restarting...');
      setTimeout(() => setStatus('Online'), 2000);
    } else setStatus('Online');
  };

  return (
    <div className="bg-gray-900 border border-blue-900 rounded-lg w-full max-w-6xl mx-auto mt-10 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="bg-gray-800 p-4 w-full md:w-48 flex flex-col gap-2">
        <button className="text-left py-2 px-4 hover:bg-gray-700 rounded">Files</button>
        <button className="text-left py-2 px-4 hover:bg-gray-700 rounded">Console</button>
        <button className="text-left py-2 px-4 hover:bg-gray-700 rounded">Plugin Manager</button>
      </div>
      
      {/* Main Content */}
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">01.Nationclouds.fun</h2>
          <div className={`px-3 py-1 rounded font-bold ${status === 'Online' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>{status}</div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded text-sm">CPU: AMD EPYC™ 7 (48 Cores)</div>
          <div className="bg-gray-800 p-4 rounded text-sm">RAM: 128GB</div>
          <div className="bg-gray-800 p-4 rounded text-sm">Storage: 1TB NVMe SSD</div>
          <div className="bg-gray-800 p-4 rounded text-sm">Network: 50 Gbps</div>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={() => handleAction('Start')} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold">START</button>
          <button onClick={() => handleAction('Restart')} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-bold">RESTART</button>
          <button onClick={() => handleAction('Stop')} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold">STOP</button>
        </div>

        <div className="bg-black p-4 rounded font-mono text-green-500 text-xs h-40 overflow-y-auto border border-gray-700">
          [Server] Loading level "world"...<br/>
          [Server] Nation Clouds Node Optimized!<br/>
          [Server] {status === 'Online' ? 'Server is running...' : 'Server stopped.'}
        </div>
      </div>
    </div>
  );
}

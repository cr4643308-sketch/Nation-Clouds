import React, { useState } from 'react';
import VirtualDashboard from './VirtualDashboard';
import { useNationClouds } from '../../context/NationCloudsContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isOpen, onClose }: Props) {
  const { masterNode, deployServer } = useNationClouds();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [serverConfig, setServerConfig] = useState({ name: '', desc: '', version: '1.20.4' });
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);
  const [deployedServer, setDeployedServer] = useState<any>(null);

  if (!isOpen) return null;

  const plans = [
    { name: 'Premium: Dirt', ram: 2, price: 30 },
    { name: 'Budget: Oak', ram: 4, price: 80 },
    { name: 'Performance: Netherite', ram: 8, price: 2560 },
  ];

  const handleDeploy = () => {
    setStep(3);
    setDeploymentLog([
      `[System] Fetching Node 01 Resources...`,
      `[System] Allocating ${selectedPlan.ram} GB RAM from Master Node...`,
      `[System] Generating IP: 0${masterNode.servers.length + 1}.Nationclouds.fun...`,
      `[System] Server Ready!`
    ]);
    setTimeout(() => {
      const newServer = { ...serverConfig, ...selectedPlan };
      deployServer(newServer);
      setDeployedServer(newServer);
    }, 3000);
  };

  if (deployedServer) return <VirtualDashboard server={deployedServer} onClose={onClose} />;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-400">Nation Clouds™ Deployment</h1>
        <button onClick={onClose} className="text-gray-400 hover:text-white">Close</button>
      </div>

      <div className="text-sm text-gray-400 mb-4">Master Node Capacity: {masterNode.ram}GB / 128GB RAM</div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Step 1: Select Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <button key={plan.name} onClick={() => { setSelectedPlan(plan); setStep(2); }} className="bg-gray-800 p-6 rounded hover:bg-gray-700 border border-gray-700">
                <div className="font-bold text-lg">{plan.name}</div>
                <div className="text-sm text-gray-400">{plan.ram}GB RAM - ₹{plan.price}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 max-w-lg">
          <h2 className="text-xl font-bold">Step 2: Server Configuration</h2>
          <input type="text" placeholder="Server Name" className="w-full bg-gray-800 p-4 rounded" onChange={e => setServerConfig({...serverConfig, name: e.target.value})} />
          <input type="text" placeholder="Description" className="w-full bg-gray-800 p-4 rounded" onChange={e => setServerConfig({...serverConfig, desc: e.target.value})} />
          <select className="w-full bg-gray-800 p-4 rounded" onChange={e => setServerConfig({...serverConfig, version: e.target.value})}>
            <option>1.20.4</option>
            <option>1.19.2</option>
            <option>1.8.8</option>
          </select>
          <button onClick={handleDeploy} className="w-full bg-blue-600 p-4 rounded font-bold">Deploy Server</button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-black p-6 rounded font-mono text-green-500">
          {deploymentLog.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      )}
    </div>
  );
}

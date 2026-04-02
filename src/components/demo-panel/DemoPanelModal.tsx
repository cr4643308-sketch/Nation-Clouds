import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: () => void;
}

export default function DemoPanelModal({ isOpen, onClose, onDeploy }: Props) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          onDeploy();
          setStep(1); // Reset
          setProgress(0);
        }
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-blue-800 rounded-lg p-8 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">Deploy Server</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">Close</button>
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-gray-300">Step 1: Select Plan</p>
            <button className="w-full bg-gray-800 p-4 rounded hover:bg-gray-700 border border-gray-700">Budget Plan</button>
            <button className="w-full bg-gray-800 p-4 rounded hover:bg-gray-700 border border-gray-700">Premium Plan</button>
            <button onClick={handleNext} className="w-full bg-blue-600 p-4 rounded mt-4 font-bold">Next</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-gray-300">Step 2: Payment Simulation</p>
            <button onClick={handleNext} className="w-full bg-green-600 p-4 rounded font-bold">Pay Now ($19.99)</button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-gray-300">Step 3: Server Details</p>
            <input type="text" placeholder="Server Name" className="w-full bg-gray-800 p-4 rounded border border-gray-700" />
            <textarea placeholder="Description (Optional)" className="w-full bg-gray-800 p-4 rounded border border-gray-700" />
            <button onClick={handleNext} className="w-full bg-blue-600 p-4 rounded mt-4 font-bold">Deploy</button>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-gray-300">Step 4: Deployment</p>
            <div className="w-full bg-gray-800 h-6 rounded overflow-hidden border border-gray-700">
              <div className="bg-blue-500 h-full rounded transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-400 text-center">{progress < 100 ? "Installing Minecraft... Optimizing EPYC™ 7 Nodes..." : "Done!"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';

interface Props {
  onOpenModal: () => void;
}

export default function DemoPanelEntry({ onOpenModal }: Props) {
  return (
    <div className="bg-gray-900 border border-blue-500/50 rounded-lg p-6 flex items-center justify-between mx-6 my-8 max-w-7xl mx-auto shadow-[0_0_10px_rgba(59,130,246,0.2)]">
      <div className="text-white">
        <h3 className="text-xl font-bold">Try Nation Clouds™</h3>
        <p className="text-sm text-gray-400">Instant access demo: Aternos-style hosting experience.</p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition shadow-[0_0_15px_rgba(22,163,74,0.5)]"
        >
          Host Your Server
        </button>
        <a 
          href="#pricing"
          className="border border-gray-600 hover:border-gray-400 text-gray-300 font-semibold py-2 px-6 rounded transition"
        >
          See Price List
        </a>
      </div>
    </div>
  );
}

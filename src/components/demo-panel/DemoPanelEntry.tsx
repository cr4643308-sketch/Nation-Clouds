import React from 'react';

interface Props {
  onOpenModal: () => void;
}

export default function DemoPanelEntry({ onOpenModal }: Props) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg p-4 flex items-center justify-between mx-6 my-8 max-w-7xl mx-auto">
      <div className="text-white">
        <h3 className="text-lg font-semibold">Try Nation Clouds™</h3>
        <p className="text-sm text-gray-400">Deploy your server in seconds with our simulation.</p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
        >
          Host Your Server
        </button>
        <a 
          href="#pricing"
          className="border border-gray-500 hover:border-gray-300 text-gray-300 font-semibold py-2 px-6 rounded transition"
        >
          See Price List
        </a>
      </div>
    </div>
  );
}

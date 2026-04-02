/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HostingPlans from './components/HostingPlans';
import DemoPanelEntry from './components/demo-panel/DemoPanelEntry';
import DashboardModal from './components/demo-panel/DashboardModal';
import { useState } from 'react';

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [masterNode, setMasterNode] = useState({
    cpu: 48,
    ram: 128,
    disk: 1000,
    servers: [] as any[]
  });

  const deployServer = (server: any) => {
    setMasterNode(prev => ({
      ...prev,
      ram: prev.ram - server.ram,
      servers: [...prev.servers, server]
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <DemoPanelEntry onOpenModal={() => setModalOpen(true)} />
        
        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Hosting Plans</h2>
          <HostingPlans />
        </section>
      </main>

      <DashboardModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        masterNode={masterNode}
        onDeploy={deployServer}
      />

      <Footer />
    </div>
  );
}

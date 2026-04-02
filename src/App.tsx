/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HostingPlans from './components/HostingPlans';
import DemoPanelEntry from './components/demo-panel/DemoPanelEntry';
import DemoPanelModal from './components/demo-panel/DemoPanelModal';
import VirtualDashboard from './components/demo-panel/VirtualDashboard';
import { useState } from 'react';

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeployed, setDeployed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <DemoPanelEntry onOpenModal={() => setModalOpen(true)} />
        
        {isDeployed && <VirtualDashboard />}

        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Hosting Plans</h2>
          <HostingPlans />
        </section>
      </main>

      <DemoPanelModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onDeploy={() => {
          setModalOpen(false);
          setDeployed(true);
        }} 
      />

      <Footer />
    </div>
  );
}

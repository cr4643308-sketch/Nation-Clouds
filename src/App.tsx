/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HostingPlans from './components/HostingPlans';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Hosting Plans</h2>
          <HostingPlans />
        </section>
      </main>

      <Footer />
    </div>
  );
}

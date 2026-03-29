import { motion } from 'motion/react';
import { Gamepad2, Server, Globe, DollarSign, Gift, ShieldCheck, Users, Zap } from 'lucide-react';

const services = [
  { icon: Gamepad2, title: 'Minecraft Hosting', desc: 'Optimized, lag-free gaming.' },
  { icon: Server, title: 'VPS Hosting', desc: 'Full root access & dedicated resources.' },
  { icon: Globe, title: 'India & Asia Nodes', desc: 'Lowest latency & local speeds.' },
  { icon: DollarSign, title: 'Affordable Plans', desc: 'Premium performance at market-leading prices.' },
  { icon: Gift, title: 'Free Hosting', desc: 'Special tiers for students and developers.', badge: 'Student Special' },
];

const pillars = [
  { icon: ShieldCheck, title: 'High Reliability', desc: '24/7 uptime guarantee.' },
  { icon: Users, title: 'Expert Support', desc: 'Community & staff-driven troubleshooting.' },
  { icon: Zap, title: 'Local Connectivity', desc: 'Best pings for regional Asia-based users.' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background Nebula */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary-accent)] rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass p-12 rounded-3xl max-w-4xl text-center border border-white/10"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Welcome to Nation Cloud ☁️
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light">
          Looking for the best and reliable hosting for your next big project? You’ve landed in the right place!
        </p>
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
          Nation Cloud is dedicated to providing high-performance hosting solutions at prices that won't break the bank.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          animate={{ boxShadow: ["0 0 0px var(--primary-accent)", "0 0 20px var(--primary-accent)", "0 0 0px var(--primary-accent)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => window.open('https://discord.gg/WyRBSKPYD', '_blank')}
          className="accent-bg px-10 py-4 rounded-full text-lg font-bold"
        >
          Join the Family - Start Hosting Today! 🚀
        </motion.button>
      </motion.div>

      {/* Services Grid */}
      <div className="relative z-10 mt-32 max-w-7xl w-full">
        <h2 className="text-4xl font-bold text-center mb-16">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ rotate: 5 }}
              className="glass p-6 rounded-2xl flex flex-col items-center text-center relative"
            >
              {s.badge && <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">{s.badge}</span>}
              <s.icon className="accent-text mb-4" size={40} />
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative z-10 mt-32 max-w-7xl w-full">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center"
            >
              <p.icon className="accent-text mb-6" size={48} />
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-slate-400">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

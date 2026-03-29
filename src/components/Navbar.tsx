import { motion } from 'motion/react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tighter">Nation clouds™</span>
        <div className="flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-blue-400">Features</a>
          <a href="#pricing" className="hover:text-blue-400">Pricing</a>
          <a href="#status" className="hover:text-blue-400">Status</a>
          <ThemeSwitcher />
        </div>
        <button className="bg-blue-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-500">Client Area</button>
      </div>
    </motion.nav>
  );
}

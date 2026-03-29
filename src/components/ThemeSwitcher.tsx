import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const colors = [
  '#ef4444', '#3b82f6', '#eab308', '#22c55e', '#ffffff', 
  '#f97316', '#a855f7', '#ec4899', '#06b6d4', '#84cc16', 
  '#f59e0b', '#a1a1aa'
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const changeTheme = (color: string) => {
    document.documentElement.style.setProperty('--primary-accent', color);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-4 rounded-full accent-border"
      >
        {isOpen ? <X size={24} /> : <Palette size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 glass p-4 rounded-2xl grid grid-cols-3 gap-2"
          >
            {colors.map(color => (
              <button 
                key={color}
                onClick={() => changeTheme(color)}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

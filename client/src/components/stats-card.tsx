import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  color = "#8B4E52",
  bgColor = "#FFD7D5"
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 relative overflow-hidden border border-neutral-edge"
      style={{ 
        boxShadow: '0 4px 20px rgba(47, 42, 58, 0.06), 0 2px 6px rgba(47, 42, 58, 0.04)',
      }}
    >
      <div 
        className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-30"
        style={{ backgroundColor: bgColor }}
      />
      <div className="flex items-center justify-between mb-4 relative">
        <span className="text-ink-light">{icon}</span>
        <span 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div 
        className="text-4xl font-display font-bold mb-1 relative"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-sm text-ink-light font-medium relative">
        {title}
      </div>
    </motion.div>
  );
}

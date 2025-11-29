import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export function StatsCard({ title, value, icon, color = "#DA291C" }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 relative overflow-hidden"
      style={{ 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        borderBottom: `4px solid ${color}`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-marker/40">{icon}</span>
        <span 
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
      </div>
      <div 
        className="text-4xl font-display font-bold mb-1"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-sm text-marker/60 font-medium">
        {title}
      </div>
    </motion.div>
  );
}

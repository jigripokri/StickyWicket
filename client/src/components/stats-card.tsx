import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export function StatsCard({ title, value, icon, color = "neon-cyan" }: StatsCardProps) {
  const colorMap: Record<string, string> = {
    "neon-cyan": "#00D4FF",
    "neon-pink": "#FF3366",
    "neon-green": "#00FF94",
    "neon-yellow": "#FFE566",
    "neon-purple": "#B366FF",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="studio-panel p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-tungsten-warm/60">{icon}</span>
        <span className="status-light active"></span>
      </div>
      <div 
        className="text-3xl font-display font-bold mb-1"
        style={{ color: colorMap[color] || colorMap["neon-cyan"] }}
      >
        {value}
      </div>
      <div className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
        {title}
      </div>
    </motion.div>
  );
}

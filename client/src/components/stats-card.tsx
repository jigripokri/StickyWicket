import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 border border-sketch-border"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-ink/40">{icon}</span>
      </div>
      <div className="text-4xl font-display font-bold text-ink mb-1">
        {value}
      </div>
      <div className="text-sm text-ink/50 font-medium">
        {title}
      </div>
    </motion.div>
  );
}

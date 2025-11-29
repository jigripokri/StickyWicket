import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/stats-card";
import { Users, Eye, Blocks, Globe, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "./home";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface Analytics {
  totalVisitors: number;
  pageViews: number;
  avgTimeOnSite: string;
  viewsByDay: Array<{ date: string; views: number }>;
  topProjects: Array<{ projectId: number; title: string; clicks: number }>;
  topCountries: Array<{ country: string; views: number }>;
}

const LEGO_COLORS = ['#DA291C', '#0055BF', '#4DBD33', '#FFD700', '#FF6B35'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-craft-paper flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🧱</div>
          <p className="text-marker/60 font-display font-medium">Building your report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-paper">
      {/* Header */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lego-blue/10 rounded-full mb-4">
              <Star className="w-4 h-4 text-lego-blue" />
              <span className="text-sm font-medium text-marker">Stats & Numbers</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-marker mb-2">
              Progress Report
            </h1>
            <p className="text-marker/60">
              See how our toys are doing out in the world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <StatsCard
              title="Total Visitors"
              value={data?.totalVisitors || 0}
              icon={<Users className="h-5 w-5" />}
              color="#DA291C"
            />
            <StatsCard
              title="Page Views"
              value={data?.pageViews || 0}
              icon={<Eye className="h-5 w-5" />}
              color="#0055BF"
            />
            <StatsCard
              title="Active Projects"
              value={projects.length || 0}
              icon={<Blocks className="h-5 w-5" />}
              color="#4DBD33"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-lego-red/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-lego-red" />
                </div>
                <h2 className="font-display text-lg font-bold text-marker">
                  Daily Visitors
                </h2>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={data?.viewsByDay || []}
                    margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
                  >
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                      stroke="#D4C4B0"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                    />
                    <YAxis 
                      stroke="#D4C4B0"
                      fontSize={11}
                      tickCount={5}
                      width={35}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      labelFormatter={formatDate}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #E8DDD0',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: '"Fredoka", sans-serif',
                        color: '#2D2D2D',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#DA291C"
                      strokeWidth={3}
                      dot={{ fill: '#DA291C', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: '#DA291C', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Top Programs Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-lego-blue/10 rounded-lg flex items-center justify-center">
                  <Blocks className="w-5 h-5 text-lego-blue" />
                </div>
                <h2 className="font-display text-lg font-bold text-marker">
                  Most Played
                </h2>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.topProjects || []}
                    margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
                  >
                    <XAxis 
                      dataKey="title"
                      stroke="#D4C4B0"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#D4C4B0"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} plays`, 'Popularity']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #E8DDD0',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: '"Fredoka", sans-serif',
                        color: '#2D2D2D',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="clicks" 
                      radius={[8, 8, 0, 0]}
                    >
                      {(data?.topProjects || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={LEGO_COLORS[index % LEGO_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Countries Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 lg:col-span-2"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-lego-green/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-lego-green" />
                </div>
                <h2 className="font-display text-lg font-bold text-marker">
                  Where Our Friends Are
                </h2>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.topCountries || []}
                    layout="horizontal"
                    margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
                  >
                    <XAxis 
                      dataKey="country"
                      stroke="#D4C4B0"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#D4C4B0"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} visitors`, 'Visitors']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #E8DDD0',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: '"Fredoka", sans-serif',
                        color: '#2D2D2D',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="views" 
                      radius={[8, 8, 0, 0]}
                    >
                      {(data?.topCountries || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={LEGO_COLORS[index % LEGO_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

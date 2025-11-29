import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/stats-card";
import { Users, Eye, Activity, Globe, Mouse, Radio } from "lucide-react";
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

const PROJECT_COLORS = ['#FF3366', '#00D4FF', '#00FF94', '#FFE566', '#B366FF'];
const COUNTRY_COLORS = ['#00D4FF', '#FF3366', '#FFE566', '#00FF94', '#B366FF'];

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
      <div className="min-h-screen bg-studio-dark flex items-center justify-center">
        <div className="text-center">
          <div className="live-indicator mb-4 justify-center">
            <span>Loading Telemetry</span>
          </div>
          <p className="text-tungsten-warm/60">Connecting to studio systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-studio-dark">
      {/* Header */}
      <section className="px-6 py-12 border-b border-studio-steel">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-5 h-5 text-neon-pink" />
              <span className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
                Studio Telemetry
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-tungsten-soft mb-2">
              Control Room
            </h1>
            <p className="text-tungsten-warm/60">
              Real-time analytics and program performance metrics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <StatsCard
              title="Total Visitors"
              value={data?.totalVisitors || 0}
              icon={<Users className="h-5 w-5" />}
              color="neon-cyan"
            />
            <StatsCard
              title="Page Views"
              value={data?.pageViews || 0}
              icon={<Eye className="h-5 w-5" />}
              color="neon-pink"
            />
            <StatsCard
              title="Active Programs"
              value={projects.length || 0}
              icon={<Mouse className="h-5 w-5" />}
              color="neon-green"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="studio-panel p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-neon-cyan" />
                <h2 className="font-display text-lg font-semibold text-tungsten-soft">
                  Traffic Signal
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
                      stroke="#3D3D47"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                    />
                    <YAxis 
                      stroke="#3D3D47"
                      fontSize={11}
                      tickCount={5}
                      width={35}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      labelFormatter={formatDate}
                      contentStyle={{
                        backgroundColor: '#1A1A1F',
                        border: '1px solid #3D3D47',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: '#FFF5E6',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#00D4FF"
                      strokeWidth={2}
                      dot={{ fill: '#00D4FF', r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#00D4FF', strokeWidth: 0 }}
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
              className="studio-panel p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Mouse className="w-5 h-5 text-neon-pink" />
                <h2 className="font-display text-lg font-semibold text-tungsten-soft">
                  Top Programs
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
                      stroke="#3D3D47"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#3D3D47"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} clicks`, 'Engagement']}
                      contentStyle={{
                        backgroundColor: '#1A1A1F',
                        border: '1px solid #3D3D47',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: '#FFF5E6',
                      }}
                    />
                    <Bar 
                      dataKey="clicks" 
                      radius={[4, 4, 0, 0]}
                    >
                      {(data?.topProjects || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PROJECT_COLORS[index % PROJECT_COLORS.length]} />
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
              className="studio-panel p-6 lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-neon-yellow" />
                <h2 className="font-display text-lg font-semibold text-tungsten-soft">
                  Global Reach
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
                      stroke="#3D3D47"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#3D3D47"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} views`, 'Views']}
                      contentStyle={{
                        backgroundColor: '#1A1A1F',
                        border: '1px solid #3D3D47',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: '#FFF5E6',
                      }}
                    />
                    <Bar 
                      dataKey="views" 
                      radius={[4, 4, 0, 0]}
                    >
                      {(data?.topCountries || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]} />
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

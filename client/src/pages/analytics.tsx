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

const PASTEL_COLORS = ['#FFD7D5', '#CFEFF1', '#D4F5E9', '#FFF4B8', '#E3D8FF', '#F3C9E8'];
const PASTEL_DARK = ['#8B4E52', '#3D6B6F', '#3D6B5A', '#7A6B2A', '#5B4B8A', '#7A4B6B'];

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
      <div className="min-h-screen bg-neutral-parchment flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📊</div>
          <p className="text-ink-light font-display font-medium">Building your report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-parchment">
      {/* Header */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-postit-lavender/50 rounded-full mb-4 border border-[#C5B6E8]">
              <Star className="w-4 h-4 text-[#5B4B8A]" />
              <span className="text-sm font-medium text-ink">Stats & Numbers</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
              Progress Report
            </h1>
            <p className="text-ink-light">
              See how our projects are doing out in the world
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
              color="#8B4E52"
              bgColor="#FFD7D5"
            />
            <StatsCard
              title="Page Views"
              value={data?.pageViews || 0}
              icon={<Eye className="h-5 w-5" />}
              color="#3D6B6F"
              bgColor="#CFEFF1"
            />
            <StatsCard
              title="Active Projects"
              value={projects.length || 0}
              icon={<Blocks className="h-5 w-5" />}
              color="#3D6B5A"
              bgColor="#D4F5E9"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-neutral-edge"
              style={{ boxShadow: '0 4px 20px rgba(47, 42, 58, 0.06)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-postit-coral/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#8B4E52]" />
                </div>
                <h2 className="font-display text-lg font-bold text-ink">
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
                      stroke="#B8B2C2"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                    />
                    <YAxis 
                      stroke="#B8B2C2"
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
                        border: '1px solid #E7DFED',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: '"Fredoka", sans-serif',
                        color: '#2F2A3A',
                        boxShadow: '0 4px 20px rgba(47, 42, 58, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#8B4E52"
                      strokeWidth={3}
                      dot={{ fill: '#FFD7D5', r: 4, strokeWidth: 2, stroke: '#8B4E52' }}
                      activeDot={{ r: 6, fill: '#8B4E52', strokeWidth: 0 }}
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
              className="bg-white rounded-2xl p-6 border border-neutral-edge"
              style={{ boxShadow: '0 4px 20px rgba(47, 42, 58, 0.06)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-postit-aqua/30 rounded-xl flex items-center justify-center">
                  <Blocks className="w-5 h-5 text-[#3D6B6F]" />
                </div>
                <h2 className="font-display text-lg font-bold text-ink">
                  Most Visited
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
                      stroke="#B8B2C2"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#B8B2C2"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} visits`, 'Popularity']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E7DFED',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: '"Fredoka", sans-serif',
                        color: '#2F2A3A',
                        boxShadow: '0 4px 20px rgba(47, 42, 58, 0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="clicks" 
                      radius={[8, 8, 0, 0]}
                    >
                      {(data?.topProjects || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} stroke={PASTEL_DARK[index % PASTEL_DARK.length]} strokeWidth={1} />
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
              className="bg-white rounded-2xl p-6 lg:col-span-2 border border-neutral-edge"
              style={{ boxShadow: '0 4px 20px rgba(47, 42, 58, 0.06)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-postit-mint/30 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#3D6B5A]" />
                </div>
                <h2 className="font-display text-lg font-bold text-ink">
                  Where Our Visitors Are
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
                      stroke="#B8B2C2"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      tickMargin={15}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#B8B2C2"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} visitors`, 'Visitors']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E7DFED',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: '"Fredoka", sans-serif',
                        color: '#2F2A3A',
                        boxShadow: '0 4px 20px rgba(47, 42, 58, 0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="views" 
                      radius={[8, 8, 0, 0]}
                    >
                      {(data?.topCountries || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} stroke={PASTEL_DARK[index % PASTEL_DARK.length]} strokeWidth={1} />
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

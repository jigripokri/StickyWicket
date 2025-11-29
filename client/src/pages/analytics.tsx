import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/stats-card";
import { Users, Eye, Activity, Globe, Mouse } from "lucide-react";
import { Card } from "@/components/ui/card";
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

const PROJECT_COLORS = ['#FF6F61', '#3B82F6', '#F4B400', '#E6C4A8', '#2C1C14'];
const COUNTRY_COLORS = ['#FF6F61', '#E6C4A8', '#F4B400', '#3B82F6', '#2C1C14'];

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
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-ink/60 font-medium">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-medium text-ink mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-ink/60">
          Track how visitors interact with your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatsCard
          title="Total Visitors"
          value={data?.totalVisitors || 0}
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Page Views"
          value={data?.pageViews || 0}
          icon={<Eye className="h-5 w-5" />}
        />
        <StatsCard
          title="Active Projects"
          value={projects.length || 0}
          icon={<Mouse className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-white border-clay/20">
          <h2 className="font-display text-xl font-medium text-ink mb-6 flex items-center gap-3">
            <Activity className="h-5 w-5 text-coral" />
            Daily Traffic
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data?.viewsByDay || []}
                margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
              >
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#E6C4A8"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  tickMargin={15}
                />
                <YAxis 
                  stroke="#E6C4A8"
                  fontSize={11}
                  tickCount={5}
                  width={35}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  labelFormatter={formatDate}
                  contentStyle={{
                    backgroundColor: '#FDF8F3',
                    border: '1px solid #E6C4A8',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: '"Nunito Sans", sans-serif',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#FF6F61"
                  strokeWidth={2}
                  dot={{ fill: '#FF6F61', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#FF6F61', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white border-clay/20">
          <h2 className="font-display text-xl font-medium text-ink mb-6 flex items-center gap-3">
            <Mouse className="h-5 w-5 text-sky" />
            Popular Projects
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.topProjects || []}
                margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
              >
                <XAxis 
                  dataKey="title"
                  stroke="#E6C4A8"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  tickMargin={15}
                  interval={0}
                />
                <YAxis 
                  stroke="#E6C4A8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`${value} clicks`, 'Clicks']}
                  contentStyle={{
                    backgroundColor: '#FDF8F3',
                    border: '1px solid #E6C4A8',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: '"Nunito Sans", sans-serif',
                  }}
                />
                <Bar 
                  dataKey="clicks" 
                  radius={[6, 6, 0, 0]}
                >
                  {(data?.topProjects || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PROJECT_COLORS[index % PROJECT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white border-clay/20 lg:col-span-2">
          <h2 className="font-display text-xl font-medium text-ink mb-6 flex items-center gap-3">
            <Globe className="h-5 w-5 text-sunflower" />
            Visitors by Country
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.topCountries || []}
                layout="horizontal"
                margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
              >
                <XAxis 
                  dataKey="country"
                  stroke="#E6C4A8"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  tickMargin={15}
                  interval={0}
                />
                <YAxis 
                  stroke="#E6C4A8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`${value} views`, 'Views']}
                  contentStyle={{
                    backgroundColor: '#FDF8F3',
                    border: '1px solid #E6C4A8',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: '"Nunito Sans", sans-serif',
                  }}
                />
                <Bar 
                  dataKey="views" 
                  radius={[6, 6, 0, 0]}
                >
                  {(data?.topCountries || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

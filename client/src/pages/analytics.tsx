import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/stats-card";
import { Users, Eye, Activity, Clock, Globe, Mouse } from "lucide-react";
import { Card } from "@/components/ui/card";
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

// Define a set of visually distinct colors for the charts
const PROJECT_COLORS = ['#34D399', '#60A5FA', '#F472B6', '#FBBF24', '#A78BFA'];
const COUNTRY_COLORS = ['#F87171', '#FB923C', '#FBBF24', '#34D399', '#60A5FA'];

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
    return <div className="container mx-auto px-4 py-12">Loading analytics...</div>;
  }

  console.log('Analytics Data:', {
    viewsByDay: data?.viewsByDay,
    topProjects: data?.topProjects,
    topCountries: data?.topCountries
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Visitors"
          value={data?.totalVisitors || 0}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Page Views"
          value={data?.pageViews || 0}
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Avg. Time on Site"
          value={data?.avgTimeOnSite || "0:00"}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Active Projects"
          value={data?.topProjects?.length || 0}
          icon={<Mouse className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Daily Traffic (Last 7 Days)
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data?.viewsByDay || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
              >
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#888888"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tickMargin={20}
                />
                <YAxis 
                  stroke="#888888"
                  fontSize={12}
                  tickCount={5}
                  width={40}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  labelFormatter={formatDate}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#BAE1FF"
                  strokeWidth={2}
                  dot={{ fill: '#BAE1FF', r: 3 }}
                  activeDot={{ r: 5, fill: '#92CEFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Mouse className="h-5 w-5" />
            Most Clicked Projects
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.topProjects || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
              >
                <XAxis 
                  dataKey="title"
                  stroke="#888888"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tickMargin={20}
                  interval={0}
                />
                <YAxis 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`${value} clicks`, 'Clicks']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                />
                <Bar 
                  dataKey="clicks" 
                  radius={[4, 4, 0, 0]}
                >
                  {
                    (data?.topProjects || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PROJECT_COLORS[index % PROJECT_COLORS.length]} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6 lg:col-span-2">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Top Countries
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.topCountries || []}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
              >
                <XAxis 
                  dataKey="country"
                  stroke="#888888"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tickMargin={20}
                  interval={0}
                />
                <YAxis 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`${value} views`, 'Views']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                />
                <Bar 
                  dataKey="views" 
                  radius={[4, 4, 0, 0]}
                >
                  {
                    (data?.topCountries || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Analytics {
  totalVisitors: number;
  pageViews: number;
  avgTimeOnSite: string;
  viewsByHour: { hour: string; views: number }[];
  viewsByDay: { date: string; views: number }[];
  topProjects: { projectId: number; title: string; clicks: number }[];
  topCountries: { country: string; views: number }[];
}

const COLORS = ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFB3F7'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  });
}

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12">Loading analytics...</div>;
  }

  // Process country data to handle nulls
  const countryData = data?.topCountries
    ?.filter(country => country.country !== null)
    ?.map(country => ({
      ...country,
      country: country.country || "Unknown"
    })) || [];

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Hourly Traffic
          </h2>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data?.viewsByHour || []}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={formatDate}
                  stroke="#888888"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#888888"
                  fontSize={12}
                  width={30}
                />
                <Tooltip 
                  labelFormatter={formatDate}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#FFB3BA"
                  strokeWidth={2}
                  dot={{ fill: '#FFB3BA', r: 3 }}
                  activeDot={{ r: 5, fill: '#FF8DA1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Daily Traffic
          </h2>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data?.viewsByDay || []}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#888888"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#888888"
                  fontSize={12}
                  width={30}
                />
                <Tooltip 
                  labelFormatter={formatDate}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Mouse className="h-5 w-5" />
            Most Clicked Projects
          </h2>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.topProjects || []}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis 
                  type="number"
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis 
                  type="category" 
                  dataKey="title" 
                  width={120}
                  stroke="#888888"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                  }}
                />
                <Bar dataKey="clicks" fill="#BAFFC9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Top Countries
          </h2>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center">
            {countryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    dataKey="views"
                    nameKey="country"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => entry.country}
                    labelLine={true}
                  >
                    {countryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground text-center">
                No country data available
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
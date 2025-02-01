import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/stats-card";
import { Users, Eye, LineChart, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Analytics {
  totalVisitors: number;
  pageViews: number;
  avgTimeOnSite: string;
  viewsOverTime: { date: string; views: number }[];
}

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          Views Over Time
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data?.viewsOverTime || []}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

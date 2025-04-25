"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { WaterDropIcon } from "@/components/ui/water-drop-icon";
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();

  const chartConfig = {
    "Water Level": {
      label: "Water Level",
      color: "hsl(var(--primary))",
    },
    "Tanker Deliveries": {
      label: "Tanker Deliveries",
      color: "hsl(var(--accent))",
    },
  };

  const chartData = [
    { name: "Jan", "Water Level": 2400, "Tanker Deliveries": 2400 },
    { name: "Feb", "Water Level": 1398, "Tanker Deliveries": 2210 },
    { name: "Mar", "Water Level": 9800, "Tanker Deliveries": 2290 },
    { name: "Apr", "Water Level": 3908, "Tanker Deliveries": 2000 },
    { name: "May", "Water Level": 4800, "Tanker Deliveries": 2181 },
    { name: "Jun", "Water Level": 3800, "Tanker Deliveries": 2500 },
    { name: "Jul", "Water Level": 4300, "Tanker Deliveries": 2100 },
    { name: "Aug", "Water Level": 2400, "Tanker Deliveries": 2400 },
    { name: "Sep", "Water Level": 1398, "Tanker Deliveries": 2210 },
    { name: "Oct", "Water Level": 9800, "Tanker Deliveries": 2290 },
    { name: "Nov", "Water Level": 3908, "Tanker Deliveries": 2000 },
    { name: "Dec", "Water Level": 4800, "Tanker Deliveries": 2181 },
  ];

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing authentication tokens
    router.push('/'); // Redirect to the home page after logout
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-border h-16 flex items-center justify-between px-4">
        <WaterDropIcon className="h-8 w-8 text-primary" />
        <span className="text-lg font-semibold">Admin Dashboard</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <main className="flex flex-1 p-4 sm:p-6">
        <div className="container mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {/* Water Level and Tanker Deliveries Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Water Level vs Tanker Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ChartLegend>
                  <ChartLegendContent />
                </ChartLegend>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="waterLevelGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="deliveryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <Tooltip />
                  <Area type="monotone" dataKey="Water Level" stroke="hsl(var(--primary))" fill="url(#waterLevelGradient)" />
                  <Area type="monotone" dataKey="Tanker Deliveries" stroke="hsl(var(--accent))" fill="url(#deliveryGradient)" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Deliveries */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Deliveries</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ScrollArea className="h-full">
                <div className="flex flex-col space-y-2">
                  {/* Example Delivery Items */}
                  <div className="flex justify-between">
                    <span>Delivery #1</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Delivery #2</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Delivery #3</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Delivery #4</span>
                    <Badge variant="destructive">Cancelled</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Delivery #5</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Delivery #6</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Delivery #7</span>
                    <Badge variant="destructive">Cancelled</Badge>
                  </div>
                  {/* Add more delivery items here */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* System Statistics */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>System Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span>Total Residents:</span>
                  <p className="text-lg font-semibold">150</p>
                </div>
                <div>
                  <span>Active Drivers:</span>
                  <p className="text-lg font-semibold">25</p>
                </div>
                <div>
                  <span>Total Deliveries:</span>
                  <p className="text-lg font-semibold">500</p>
                </div>
                <div>
                  <span>Average Rating:</span>
                  <p className="text-lg font-semibold">4.5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ScrollArea className="h-full">
                <div className="flex flex-col space-y-2">
                  {/* Example Notification Items */}
                  <div>New resident joined!</div>
                  <Separator />
                  <div>Tanker delivery completed.</div>
                  <Separator />
                  <div>Low water level detected.</div>
                  <Separator />
                  {/* Add more notification items here */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

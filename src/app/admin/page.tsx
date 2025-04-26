"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { WaterDropIcon } from "@/components/ui/water-drop-icon";
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

// Dummy data for recent deliveries (replace with database fetch)
interface Delivery {
  id: number;
  status: 'pending' | 'complete' | 'cancelled';
  volumeRequested: number;
  volumeDelivered: number;
  driverId: string;
  routeDeviation: number;
  residentIp: string;
}

const AdminPage = () => {
  const router = useRouter();

  const [recentDeliveries, setRecentDeliveries] = useState<Delivery[]>([
    { id: 1, status: 'complete', volumeRequested: 1000, volumeDelivered: 1000, driverId: 'Driver123', routeDeviation: 0, residentIp: '192.168.1.1' },
    { id: 2, status: 'complete', volumeRequested: 1500, volumeDelivered: 1500, driverId: 'Driver456', routeDeviation: 0, residentIp: '192.168.1.2' },
    { id: 3, status: 'pending', volumeRequested: 800, volumeDelivered: 0, driverId: 'Driver789', routeDeviation: 0, residentIp: '192.168.1.3' },
    { id: 4, status: 'cancelled', volumeRequested: 1200, volumeDelivered: 0, driverId: 'Driver123', routeDeviation: 0, residentIp: '192.168.1.4' },
    { id: 5, status: 'complete', volumeRequested: 900, volumeDelivered: 900, driverId: 'Driver456', routeDeviation: 0, residentIp: '192.168.1.5' },
    { id: 6, status: 'pending', volumeRequested: 1100, volumeDelivered: 0, driverId: 'Driver789', routeDeviation: 0, residentIp: '192.168.1.6' },
    { id: 7, status: 'cancelled', volumeRequested: 700, volumeDelivered: 0, driverId: 'Driver123', routeDeviation: 0, residentIp: '192.168.1.7' },
  ]);

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

  const getStatusBadgeColor = (status: Delivery['status']) => {
    switch (status) {
      case 'complete':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
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
                  {recentDeliveries.map(delivery => (
                    <div key={delivery.id}>
                      <div className="flex justify-between">
                        <span>Delivery #{delivery.id}</span>
                        <Badge variant={getStatusBadgeColor(delivery.status)}>{delivery.status}</Badge>
                      </div>
                      <Separator />
                    </div>
                  ))}
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

          {/* Anomaly Detection */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mismatch Alerts */}
                <div>
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Mismatch Alert!</AlertTitle>
                    <AlertDescription>
                      Delivery ID #123: Requested 1000L, delivered 800L.
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Driver Deviation Warnings */}
                <div>
                  <Alert variant="secondary">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Driver Deviation Warning</AlertTitle>
                    <AlertDescription>
                      Driver #456 deviated 5km from assigned route on Delivery ID #789.
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Fraud Detection Patterns */}
                <div>
                  <Alert variant="outline">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Fraud Detection Pattern</AlertTitle>
                    <AlertDescription>
                      Multiple requests from same IP address detected. User: Resident A.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

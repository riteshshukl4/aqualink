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
import { supabaseClient } from "@/lib/supabase";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

  const [recentDeliveries, setRecentDeliveries] = useState<Delivery[]>([]);
  const [totalResidents, setTotalResidents] = useState<number>(0);
  const [activeDrivers, setActiveDrivers] = useState<number>(0);
  const [totalDeliveries, setTotalDeliveries] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [mismatchAlerts, setMismatchAlerts] = useState<any[]>([]); // Replace any with actual type
  const [driverDeviations, setDriverDeviations] = useState<any[]>([]); // Replace any with actual type
  const [fraudPatterns, setFraudPatterns] = useState<any[]>([]); // Replace any with actual type

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch recent deliveries
      const { data: deliveriesData, error: deliveriesError } = await supabaseClient
        .from('deliveries')
        .select('*')
        .order('id', { ascending: false })
        .limit(7);

      if (deliveriesError) {
        console.error('Error fetching recent deliveries:', deliveriesError);
      } else {
        setRecentDeliveries(deliveriesData || []);
      }

      // Fetch system statistics
      const { data: residentsData, error: residentsError } = await supabaseClient
        .from('residents')
        .select('count');
      if (residentsError) {
        console.error('Error fetching total residents:', residentsError);
      } else if (residentsData && residentsData.length > 0) {
        setTotalResidents(residentsData[0].count || 0);
      }

      const { data: driversData, error: driversError } = await supabaseClient
        .from('drivers')
        .select('count');
      if (driversError) {
        console.error('Error fetching active drivers:', driversError);
      } else if (driversData && driversData.length > 0) {
        setActiveDrivers(driversData[0].count || 0);
      }

      const { data: deliveriesCountData, error: deliveriesCountError } = await supabaseClient
        .from('deliveries')
        .select('count');
      if (deliveriesCountError) {
        console.error('Error fetching total deliveries:', deliveriesCountError);
      } else if (deliveriesCountData && deliveriesCountData.length > 0) {
        setTotalDeliveries(deliveriesCountData[0].count || 0);
      }

      const { data: ratingData, error: ratingError } = await supabaseClient
        .from('ratings')
        .select('average');
      if (ratingError) {
        console.error('Error fetching average rating:', ratingError);
      } else if (ratingData && ratingData.length > 0) {
        setAverageRating(ratingData[0].average || 0);
      }

      // Fetch notifications (example, replace with your actual data source)
      const { data: notificationsData, error: notificationsError } = await supabaseClient
        .from('notifications')
        .select('message')
        .limit(3);

      if (notificationsError) {
        console.error('Error fetching notifications:', notificationsError);
      } else {
        setNotifications(notificationsData ? notificationsData.map(n => n.message) : []);
      }

      // Fetch anomaly detection data (example, replace with your actual queries)
      const { data: mismatchData, error: mismatchError } = await supabaseClient
        .from('mismatched_deliveries')
        .select('*');
      if (mismatchError) {
        console.error('Error fetching mismatch alerts:', mismatchError);
      } else {
        setMismatchAlerts(mismatchData || []);
      }

      const { data: deviationData, error: deviationError } = await supabaseClient
        .from('driver_deviations')
        .select('*');
      if (deviationError) {
        console.error('Error fetching driver deviations:', deviationError);
      } else {
        setDriverDeviations(deviationData || []);
      }

      const { data: fraudData, error: fraudError } = await supabaseClient
        .from('fraud_patterns')
        .select('*');
      if (fraudError) {
        console.error('Error fetching fraud patterns:', fraudError);
      } else {
        setFraudPatterns(fraudData || []);
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

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
                  <p className="text-lg font-semibold">{totalResidents}</p>
                </div>
                <div>
                  <span>Active Drivers:</span>
                  <p className="text-lg font-semibold">{activeDrivers}</p>
                </div>
                <div>
                  <span>Total Deliveries:</span>
                  <p className="text-lg font-semibold">{totalDeliveries}</p>
                </div>
                <div>
                  <span>Average Rating:</span>
                  <p className="text-lg font-semibold">{averageRating}</p>
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
                  {notifications.map((notification, index) => (
                    <div key={index}>
                      {notification}
                      <Separator />
                    </div>
                  ))}
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
                {mismatchAlerts.map((mismatch) => (
                  <div key={mismatch.id}>
                    <Alert variant="destructive">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Mismatch Alert!</AlertTitle>
                      <AlertDescription>
                        Delivery ID #{mismatch.delivery_id}: Requested {mismatch.volume_requested}L, delivered {mismatch.volume_delivered}L.
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}

                {/* Driver Deviation Warnings */}
                {driverDeviations.map((deviation) => (
                  <div key={deviation.id}>
                    <Alert variant="secondary">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Driver Deviation Warning</AlertTitle>
                      <AlertDescription>
                        Driver #{deviation.driver_id} deviated {deviation.route_deviation}km from assigned route on Delivery ID #{deviation.delivery_id}.
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}

                {/* Fraud Detection Patterns */}
                {fraudPatterns.map((pattern) => (
                  <div key={pattern.id}>
                    <Alert variant="outline">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Fraud Detection Pattern</AlertTitle>
                      <AlertDescription>
                        Multiple requests from same IP address detected. User: {pattern.resident_id}.
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

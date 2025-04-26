"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { WaterDropIcon } from "@/components/ui/water-drop-icon";
import { useRouter } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox";
import { supabaseClient } from "@/lib/supabase";

// Define the structure for a water request
interface WaterRequest {
  id: number;
  resident: string;
  address: string;
  amount: number;
  urgency: 'high' | 'medium' | 'low';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}

const DriverPage = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<WaterRequest[]>([]);
  const [routeOptimization, setRouteOptimization] = useState(false);
  const [todaysDeliveries, setTodaysDeliveries] = useState<WaterRequest[]>([]);
  const [driverName, setDriverName] = useState<string>('John Doe'); // Default driver name

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDriverData = async () => {
    try {
      // Fetch pending water requests
      const { data: pendingRequests, error: pendingError } = await supabaseClient
        .from('water_requests')
        .select('*')
        .eq('status', 'pending')
        .order('urgency', { ascending: false });

      if (pendingError) {
        console.error('Error fetching pending water requests:', pendingError);
      } else {
        setRequests(pendingRequests || []);
      }

      // Fetch today's deliveries
      const today = new Date().toISOString().slice(0, 10);
      const { data: deliveries, error: deliveriesError } = await supabaseClient
        .from('water_requests')
        .select('*')
        .eq('status', 'completed')
        .gte('updated_at', today)
        .lt('updated_at', `${today}T23:59:59`);

      if (deliveriesError) {
        console.error('Error fetching today\'s deliveries:', deliveriesError);
      } else {
        setTodaysDeliveries(deliveries || []);
      }

      // Fetch driver information (replace 'driver_id' with the actual driver ID)
      const driverId = 'driver123'; // Replace with the actual driver ID
      const { data: driverData, error: driverError } = await supabaseClient
        .from('drivers')
        .select('name')
        .eq('id', driverId)
        .single();

      if (driverError) {
        console.error('Error fetching driver information:', driverError);
      } else if (driverData) {
        setDriverName(driverData.name || 'John Doe');
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing authentication tokens
    router.push('/'); // Redirect to the home page after logout
  };

  const acceptRequest = async (id: number) => {
    try {
      const { error } = await supabaseClient
        .from('water_requests')
        .update({ status: 'accepted' })
        .eq('id', id);

      if (error) {
        console.error('Error accepting request:', error);
        // Optionally, display an error message to the user
      } else {
        // Update the local state to reflect the change
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      // Optionally, display an error message to the user
    }
  };

  const rejectRequest = async (id: number) => {
    try {
      const { error } = await supabaseClient
        .from('water_requests')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) {
        console.error('Error rejecting request:', error);
        // Optionally, display an error message to the user
      } else {
        // Update the local state to reflect the change
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      // Optionally, display an error message to the user
    }
  };

  // Function to determine badge color based on urgency
  const getUrgencyBadgeColor = (urgency: WaterRequest['urgency']) => {
    switch (urgency) {
      case 'high':
        return 'destructive'; // Red
      case 'medium':
        return 'secondary'; // Yellow
      case 'low':
        return 'outline'; // Gray
      default:
        return 'default';
    }
  };

  // Prioritize requests based on urgency
  const prioritizedRequests = [...requests].sort((a, b) => {
    const urgencyOrder = { high: 1, medium: 2, low: 3 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-border h-16 flex items-center justify-between px-4">
        <WaterDropIcon className="h-8 w-8 text-primary" />
        <span className="text-lg font-semibold">Driver Dashboard</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <main className="flex flex-1 p-4 sm:p-6">
        <div className="container mx-auto grid gap-4 grid-cols-1 md:grid-cols-2">

          {/* Task List */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Task List</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ScrollArea className="h-full">
                <div className="flex flex-col space-y-2">
                  {prioritizedRequests.map(request => (
                    <div key={request.id}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span>{request.resident} - {request.address}</span>
                          <Badge variant={getUrgencyBadgeColor(request.urgency)}>{request.urgency}</Badge>
                        </div>
                        <div>
                          {request.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => acceptRequest(request.id)}>Accept</Button>
                              <Button variant="destructive" size="sm" onClick={() => rejectRequest(request.id)}>Reject</Button>
                            </>
                          )}
                          {request.status !== 'pending' && (
                            <Badge>{request.status}</Badge>
                          )}
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span>Name:</span>
                <p className="text-lg font-semibold">{driverName}</p>
              </div>
              <Separator className="my-2" />
              <div>
                <span>Vehicle:</span>
                <p className="text-lg font-semibold">Tanker Truck #123</p>
              </div>
              <Separator className="my-2" />
              <div>
                <span>Route Optimization:</span>
                <Checkbox id="route-optimization" checked={routeOptimization} onCheckedChange={(checked) => setRouteOptimization(!!checked)} />
                <label htmlFor="route-optimization" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Enabled
                </label>
              </div>
              <Separator className="my-2" />
              <div>
                <span>Status:</span>
                <Badge variant="secondary">Available</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Today's Delivery History */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Deliveries</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ScrollArea className="h-full">
                <div className="flex flex-col space-y-2">
                  {todaysDeliveries.map(request => (
                    <div key={request.id}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span>{request.resident} - {request.address}</span>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DriverPage;

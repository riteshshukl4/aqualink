"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { WaterDropIcon } from "@/components/ui/water-drop-icon";
import { useRouter } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox";

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
  const [requests, setRequests] = useState<WaterRequest[]>([
    { id: 1, resident: 'Resident A', address: '123 Main St', amount: 1000, urgency: 'high', status: 'pending' },
    { id: 2, resident: 'Resident B', address: '456 Elm St', amount: 1500, urgency: 'medium', status: 'pending' },
    { id: 3, resident: 'Resident C', address: '789 Oak St', amount: 800, urgency: 'low', status: 'pending' },
  ]);
  const [routeOptimization, setRouteOptimization] = useState(false);

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing authentication tokens
    router.push('/'); // Redirect to the home page after logout
  };

  const acceptRequest = (id: number) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
  };

  const rejectRequest = (id: number) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
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
                <p className="text-lg font-semibold">John Doe</p>
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
        </div>
      </main>
    </div>
  );
};

export default DriverPage;

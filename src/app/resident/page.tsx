"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { WaterDropIcon } from "@/components/ui/water-drop-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Badge } from "@/components/ui/badge";

const ResidentPage = () => {
  const [requestStatus, setRequestStatus] = useState<"pending" | "fulfilled" | "none">("none");
  const [isRequesting, setIsRequesting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [details, setDetails] = useState("");
  const router = useRouter();

  const handleWaterRequest = async () => {
    setIsRequesting(true);
    // Simulate an async request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRequestStatus("pending");
    setIsRequesting(false);
    toast({
      title: "Request Submitted",
      description: "Your water request has been submitted and is pending approval.",
    });
  };

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing authentication tokens
    router.push('/'); // Redirect to the home page after logout
  };

  const calculatePrice = () => {
    if (amount) {
      // Base price + (amount * price per liter)
      const price = 5 + (amount * 0.01);
      setEstimatedPrice(price);
    } else {
      setEstimatedPrice(null);
    }
  };

  // Dummy data for request history
  const requestHistory = [
    { id: 1, date: "2024-07-01", amount: 1000, status: "fulfilled" },
    { id: 2, date: "2024-06-15", amount: 1500, status: "fulfilled" },
    { id: 3, date: "2024-05-20", amount: 800, status: "cancelled" },
    { id: 4, date: "2024-04-10", amount: 1200, status: "fulfilled" },
  ];

  // Dummy data for monthly usage graph
  const monthlyUsage = [
    { month: "Jan", liters: 500 },
    { month: "Feb", liters: 700 },
    { month: "Mar", liters: 900 },
    { month: "Apr", liters: 1200 },
    { month: "May", liters: 1000 },
    { month: "Jun", liters: 1500 },
    { month: "Jul", liters: 1100 },
  ];

  // Dummy data for cost breakdown
  const costBreakdown = [
    { month: "Jan", cost: 5.00 },
    { month: "Feb", cost: 7.00 },
    { month: "Mar", cost: 9.00 },
    { month: "Apr", cost: 12.00 },
    { month: "May", cost: 10.00 },
    { month: "Jun", cost: 15.00 },
    { month: "Jul", cost: 11.00 },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-border h-16 flex items-center justify-between px-4">
        <WaterDropIcon className="h-8 w-8 text-primary" />
        <span className="text-lg font-semibold">User Dashboard</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <main className="flex flex-1 p-4 sm:p-6">
        <div className="container mx-auto grid gap-4 grid-cols-1 md:grid-cols-2">

          {/* Water Request Form */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Request Water Tanker</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input type="text" id="address" placeholder="Your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (in liters)</Label>
                  <Input type="number" id="amount" placeholder="e.g., 1000" value={amount === null ? "" : amount.toString()} onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setAmount(isNaN(value) ? null : value);
                  }} onBlur={calculatePrice} />
                </div>
                <div>
                  <Label htmlFor="urgency">Additional Details</Label>
                  <Textarea id="urgency" placeholder="Any specific instructions or urgency details?" value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>
                <Button onClick={handleWaterRequest} disabled={isRequesting}>
                  {isRequesting ? "Submitting..." : "Request Water"}
                </Button>
              </form>
              {estimatedPrice !== null && (
                <div className="mt-4">
                  Estimated Price: ${estimatedPrice.toFixed(2)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Request Status */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              {requestStatus === "none" && (
                <div>No requests submitted yet.</div>
              )}
              {requestStatus === "pending" && (
                <div>Your request is pending approval.</div>
              )}
              {requestStatus === "fulfilled" && (
                <div>Your request has been fulfilled.</div>
              )}
            </CardContent>
          </Card>

          {/* Request History */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Request History</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ScrollArea className="h-full">
                <div className="flex flex-col space-y-2">
                  {requestHistory.map((request) => (
                    <div key={request.id}>
                      <div className="flex justify-between">
                        <span>{request.date} - {request.amount} Liters</span>
                        {request.status === "fulfilled" && <Badge variant="secondary">Fulfilled</Badge>}
                        {request.status === "cancelled" && <Badge variant="destructive">Cancelled</Badge>}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Monthly Usage Graph */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Usage (Liters)</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart width={400} height={300} data={monthlyUsage} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Area type="monotone" dataKey="liters" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart width={400} height={300} data={costBreakdown} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Area type="monotone" dataKey="cost" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ResidentPage;

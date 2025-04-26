"use client";

import { useState, useEffect } from "react";
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
import * as React from 'react';
import { supabaseClient } from "@/lib/supabase";
import { WaterRequests } from "@/models/water_requests";

// Define the structure for a water request
interface WaterRequest {
  id: number;
  date: string;
  amount: number;
  status: 'fulfilled' | 'cancelled';
}

const ResidentPage = () => {
  const [requestStatus, setRequestStatus<"pending" | "fulfilled" | "none">("none");
  const [isRequesting, setIsRequesting(false);
  const [estimatedPrice, setEstimatedPrice<number | null>(null);
  const [address, setAddress("");
  const [amount, setAmount<number | null>(null);
  const [details, setDetails("");
  const router = useRouter();
  const uniqueClipId = React.useMemo(() => `clip-${Math.random().toString(36).substring(2, 15)}`, []);
  const [activeDeliveryOtp, setActiveDeliveryOtp<string | null>(null);
  const [requestHistory, setRequestHistory<WaterRequests[]>([]);
  const [monthlyUsage, setMonthlyUsage< { month: string; liters: number; }[]>([]);
  const [costBreakdown, setCostBreakdown< { month: string; cost: number; }[]>([]);

  useEffect(() => {
    fetchResidentData();
  }, []);

  const fetchResidentData = async () => {
    try {
      // Fetch the current user's ID
      const { data: { user } } = await supabaseClient.auth.getUser();

      if (!user) {
        console.error('User not authenticated.');
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }

      const userId = user.id;

      // Fetch request history
      const { data: historyData, error: historyError } = await supabaseClient
        .from('water_requests')
        .select('*')
        .eq('resident_id', userId) //  RLS: Only fetch requests for the current user
        .order('date', { ascending: false })
        .limit(4);

      if (historyError) {
        console.error('Error fetching request history:', historyError);
      } else {
        setRequestHistory(historyData || []);
      }

      // Fetch monthly usage graph data
      const { data: usageData, error: usageError } = await supabaseClient
        .from('monthly_usage')
        .select('*')
        .eq('resident_id', userId) // RLS:  Only fetch usage for the current user
        .order('month', { ascending: true })
        .limit(7);

      if (usageError) {
        console.error('Error fetching monthly usage:', usageError);
      } else {
        setMonthlyUsage(usageData || []);
      }

      // Fetch cost breakdown data
      const { data: costData, error: costError } = await supabaseClient
        .from('cost_breakdown')
        .select('*')
         .eq('resident_id', userId) // RLS: Only fetch cost data for the current user
        .order('month', { ascending: true })
        .limit(7);

      if (costError) {
        console.error('Error fetching cost breakdown:', costError);
      } else {
        setCostBreakdown(costData || []);
      }

    } catch (error) {
      console.error('Error fetching resident data:', error);
    }
  };

  const handleWaterRequest = async () => {
    setIsRequesting(true);
    try {
      // Add new water request to the database
      const { data, error } = await supabaseClient
        .from('water_requests')
        .insert([{
          address: address,
          amount: amount,
          details: details,
          status: 'pending',
        }]);

      if (error) {
        console.error('Error submitting water request:', error);
        toast({
          title: "Request Failed",
          description: "There was an error submitting your request.",
          variant: "destructive",
        });
      } else {
        setRequestStatus("pending");
        toast({
          title: "Request Submitted",
          description: "Your water request has been submitted and is pending approval.",
        });

        // Generate a sample OTP and store it in state
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setActiveDeliveryOtp(otp);
      }
    } catch (error) {
      console.error('Error submitting water request:', error);
      toast({
        title: "Request Failed",
        description: "There was an error submitting your request.",
        variant: "destructive",
        });
    } finally {
      setIsRequesting(false);
    }
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
              {activeDeliveryOtp && (
                <div className="mt-4">
                  <p>Your delivery is in progress. OTP for verification:</p>
                  <div className="font-bold text-xl">{activeDeliveryOtp}</div>
                </div>
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
              <AreaChart width={400} height={300} data={monthlyUsage} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} clipPath={`url(#${uniqueClipId})`}>
                <defs>
                  <clipPath id={uniqueClipId}>
                    <rect x="0" y="0" width="400" height="300" />
                  </clipPath>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Area type="monotone" dataKey="liters" stroke="#8884d8" fill="#8884d8" clipPath={`url(#${uniqueClipId})`} />
              </AreaChart>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart width={400} height={300} data={costBreakdown} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} clipPath={`url(#${uniqueClipId})`}>
              <defs>
                  <clipPath id={uniqueClipId}>
                    <rect x="0" y="0" width="400" height="300" />
                  </clipPath>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Area type="monotone" dataKey="cost" stroke="#82ca9d" fill="#82ca9d" clipPath={`url(#${uniqueClipId})`} />
              </AreaChart>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ResidentPage;

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ResidentPage = () => {
  const [requestStatus, setRequestStatus] = useState<"pending" | "fulfilled" | "none">("none");
  const [isRequesting, setIsRequesting] = useState(false);

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

  return (
    <div className="flex flex-col h-screen bg-background">
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
                  <Input type="text" id="address" placeholder="Your Address" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (in liters)</Label>
                  <Input type="number" id="amount" placeholder="e.g., 1000" />
                </div>
                <div>
                  <Label htmlFor="urgency">Additional Details</Label>
                  <Textarea id="urgency" placeholder="Any specific instructions or urgency details?" />
                </div>
                <Button onClick={handleWaterRequest} disabled={isRequesting}>
                  {isRequesting ? "Submitting..." : "Request Water"}
                </Button>
              </form>
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
        </div>
      </main>
    </div>
  );
};

export default ResidentPage;

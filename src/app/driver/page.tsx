"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DriverPage = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
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
                  {/* Example Task Items */}
                  <div className="flex justify-between">
                    <span>Task #1: Deliver to Resident A</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Task #2: Deliver to Resident B</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Task #3: Deliver to Resident C</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Separator />
                  {/* Add more task items here */}
                  <div className="flex justify-between">
                    <span>Task #4: Deliver to Resident D</span>
                    <Badge variant="destructive">Cancelled</Badge>
                  </div>
                   <Separator />
                  <div className="flex justify-between">
                    <span>Task #5: Deliver to Resident E</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AuthPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const router = useRouter();

  const handleSendOTP = () => {
    // Add your OTP sending logic here
    setIsVerifying(true);
    toast({
      title: "OTP Sent",
      description: "Please check your phone for the verification code",
    });
  };

  const handleVerifyOTP = () => {
    // Add your OTP verification logic here
    toast({
      title: "Success",
      description: "You have been successfully authenticated",
    });

    if (role === "user") {
      router.push("/resident");
    } else if (role === "driver") {
      router.push("/driver");
    } else if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md relative">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to AquaLink</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => router.push('/')}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {!isVerifying ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="driver">Tanker Driver</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleSendOTP}>
                    Send OTP
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter OTP</label>
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2 justify-center">
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  <Button className="w-full" onClick={handleVerifyOTP}>
                    Verify OTP
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="signup">
              {!isVerifying ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="driver">Tanker Driver</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleSendOTP}>
                    Send OTP
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter OTP</label>
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2 justify-center">
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  <Button className="w-full" onClick={handleVerifyOTP}>
                    Create Account
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}


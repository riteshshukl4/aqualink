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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabaseClient } from "@/lib/supabase";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[\s(0-9-)]*)([\s)0-9-]+)?([\s\-0-9\\/]+)$/
);

const formSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid Phone Number!").length(10, "Phone number must be 10 digits"),
  name: z.string().optional(),
  role: z.enum(["user", "driver", "admin"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      name: "",
      role: "user",
    },
  });

  const handleSendOTP = async (data: FormValues) => {
    // Add your OTP sending logic here
    setIsVerifying(true);

    // Send OTP using Supabase Auth (Email OTP for now)
    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: data.phoneNumber,
    });

    if (error) {
      toast({
        title: "Error Sending OTP",
        description: error.message,
        variant: "destructive",
      });
      setIsVerifying(false);
      return;
    }

    toast({
      title: "OTP Sent",
      description: "Please check your phone for the verification code",
    });
    console.log("Form Data:", data); // For testing
  };

  const handleVerifyOTP = async (data: FormValues) => {
    // Verify OTP using Supabase Auth
    const { data: authData, error } = await supabaseClient.auth.verifyOtp({
      phone: data.phoneNumber,
      token: otp,
      type: 'sms',
    });

    if (error) {
      toast({
        title: "Error Verifying OTP",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "You have been successfully authenticated",
    });

    // Replace with actual authentication logic
    switch (data.role) {
      case "user":
        router.push('/resident');
        break;
      case "driver":
        router.push('/driver');
        break;
      case "admin":
        router.push('/admin');
        break;
      default:
        router.push('/'); // Redirect to home if role is not recognized
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
                <form onSubmit={handleSubmit(handleSendOTP)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="driver">Tanker Driver</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Send OTP
                  </Button>
                </form>
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
                  <Button className="w-full" onClick={() => handleSubmit(handleVerifyOTP)()}>
                    Verify OTP
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="signup">
              {!isVerifying ? (
                <form onSubmit={handleSubmit(handleSendOTP)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="driver">Tanker Driver</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Send OTP
                  </Button>
                </form>
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
                  <Button className="w-full" onClick={() => handleSubmit(handleVerifyOTP)()}>
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


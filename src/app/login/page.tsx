"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (role) {
      router.push(`/${role}`);
    } else {
      alert('Please select a role.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-[350px] bg-card shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Select a role to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Select Role</Label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="resident">Resident</option>
                  <option value="driver">Tanker Driver</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
              <Link href="/signup">
                  <Button variant="ghost">Don't have an account?</Button>
              </Link>
            <Button onClick={handleLogin} disabled={!role}>
              Login as {role || 'Selected Role'}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;

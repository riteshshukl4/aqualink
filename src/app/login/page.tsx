
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold text-teal-500">
          Login
        </h1>

        <div className="mt-8">
          <label className="block mb-2 text-lg font-semibold">Select Role:</label>
          <select
            className="px-4 py-2 border rounded-md text-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="resident">Resident</option>
            <option value="driver">Tanker Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button variant="secondary" className="mt-6 px-8 py-3 text-lg" onClick={handleLogin}>
          Login as {role || 'Selected Role'}
        </Button>
      </main>
    </div>
  );
};

export default LoginPage;

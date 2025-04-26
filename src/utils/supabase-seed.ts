// src/utils/supabase-seed.ts
import supabaseClient from "@/lib/supabase";

// Define the type for water tanker request data
interface WaterTankerRequest {
  id: number;
  resident_id: string;
  location: string;
  requested_volume: number;
  status: "pending" | "accepted" | "completed";
  created_at: Date;
}

// Mock data for initial water tanker requests
const initialWaterTankerRequests: WaterTankerRequest[] = [
  {
    id: 1,
    resident_id: "resident-001",
    location: "123 Main St",
    requested_volume: 500,
    status: "pending",
    created_at: new Date(),
  },
  {
    id: 2,
    resident_id: "resident-002",
    location: "456 Oak Ave",
    requested_volume: 1000,
    status: "accepted",
    created_at: new Date("2024-07-20"),
  },
  {
    id: 3,
    resident_id: "resident-003",
    location: "789 Pine Ln",
    requested_volume: 750,
    status: "completed",
    created_at: new Date("2024-07-15"),
  },
  {
    id: 4,
    resident_id: "resident-004",
    location: "101 Elm Rd",
    requested_volume: 250,
    status: "pending",
    created_at: new Date("2024-07-22"),
  },
  {
    id: 5,
    resident_id: "resident-005",
    location: "202 Maple Dr",
    requested_volume: 1200,
    status: "accepted",
    created_at: new Date("2024-07-18"),
  },
];

/**
 * Inserts initial water tanker request data into the 'water_tanker_requests' table in Supabase.
 * This function uses the supabaseClient to interact with the database.
 */
async function seedWaterTankerRequests(): Promise<void> {
  try {
    const { data, error } = await supabaseClient
      .from("water_tanker_requests")
      .insert(initialWaterTankerRequests);

    if (error) {
      // Log the error if the insertion fails
      console.error("Error seeding water tanker requests:", error);
    } else {
      // Log a success message if the insertion is successful
      console.log("Water tanker requests seeded successfully:", data);
    }
  } catch (error) {
    // Log any unexpected errors during the process
    console.error("An unexpected error occurred:", error);
  }
}

// Raw SQL queries to create tables
const sqlQueries = [
  `
  -- Residents Table
  CREATE TABLE IF NOT EXISTS residents (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      phone_number TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Drivers Table
  CREATE TABLE IF NOT EXISTS drivers (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      phone_number TEXT UNIQUE NOT NULL,
      name TEXT,
      vehicle_number TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Admins Table
  CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      phone_number TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Water Requests Table
  CREATE TABLE IF NOT EXISTS water_requests (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      resident_id UUID REFERENCES residents(id),
      address TEXT,
      amount INTEGER,
      details TEXT,
      status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Deliveries Table
  CREATE TABLE IF NOT EXISTS deliveries (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      request_id UUID REFERENCES water_requests(id),
      driver_id UUID REFERENCES drivers(id),
      volume_delivered INTEGER,
      route_deviation FLOAT,
      resident_ip TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Ratings Table
  CREATE TABLE IF NOT EXISTS ratings (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      delivery_id UUID REFERENCES deliveries(id),
      rating INTEGER,
      comments TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Notifications Table
  CREATE TABLE IF NOT EXISTS notifications (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID, -- Can reference residents, drivers, or admins
      message TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  `,
  `
  -- Monthly Usage Table
  CREATE TABLE IF NOT EXISTS monthly_usage (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      resident_id UUID REFERENCES residents(id),
      month TEXT,
      liters INTEGER
  );
  `,
  `
  -- Cost Breakdown Table
  CREATE TABLE IF NOT EXISTS cost_breakdown (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      resident_id UUID REFERENCES residents(id),
      month TEXT,
      cost FLOAT
  );
  `,
  `
  -- Mismatched Deliveries Table
  CREATE TABLE IF NOT EXISTS mismatched_deliveries (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      delivery_id UUID REFERENCES deliveries(id),
      volume_requested INTEGER,
      volume_delivered INTEGER
  );
  `,
  `
  -- Driver Deviations Table
  CREATE TABLE IF NOT EXISTS driver_deviations (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      delivery_id UUID REFERENCES deliveries(id),
      driver_id UUID REFERENCES drivers(id),
      route_deviation FLOAT
  );
  `,
  `
  -- Fraud Patterns Table
  CREATE TABLE IF NOT EXISTS fraud_patterns (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      resident_id UUID REFERENCES residents(id),
      ip_address TEXT,
      request_count INTEGER
  );
  `,
  `
  -- Enable the UUID extension
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `
];

async function executeSqlQueries(): Promise<void> {
  try {
    for (const query of sqlQueries) {
      const { error } = await supabaseClient.from('residents').select('*').limit(0)
      if (error) {
        const { error: queryError } = await supabaseClient.query(query);
        if (queryError) {
          console.error("Error executing SQL query:", queryError);
        }
      }
    }
    console.log("SQL queries executed successfully");
  } catch (error) {
    console.error("Error executing SQL queries:", error);
  }
}


// Call the function to add data to the database
seedWaterTankerRequests().then(() => {
    executeSqlQueries().then(() => {
        // Indicate that the function has finished
        console.log("Seed function completed");
    });
});

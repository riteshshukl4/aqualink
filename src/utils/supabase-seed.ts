// src/utils/supabase-seed.ts
import { supabaseClient } from "@/lib/firebase";

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


// Call the function to add data to the database
seedWaterTankerRequests().then(() => {
  // Indicate that the function has finished
  console.log("Seed function completed");
});
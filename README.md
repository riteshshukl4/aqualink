# AquaLink - Smart Water Tanker Platform

AquaLink is a full-stack web application designed to streamline the process of requesting, delivering, and monitoring water tankers. This platform caters to Residents, Tanker Drivers, and Admins, providing role-specific interfaces and functionalities.

## Key Features

-   **User Roles**: Residents, Tanker Drivers, and Admins with distinct access levels.
-   **Request Submission**: Residents can submit water tanker requests with details like address, water amount, and urgency.
-   **Driver Task List**: Tanker drivers can view and manage their assigned delivery tasks.
-   **Admin Dashboard**: Admins can monitor all platform activities, track deliveries, and manage users.

## Tech Stack

-   **Frontend**: React.js, Next.js, ShadCN UI
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL
-   **Realtime**: Supabase
-   **Authentication**: Twilio Api
-   **Mapping**: Google Maps API (or OpenStreetMap)

## MVP Flow

1.  Resident submits a water tanker request.
2.  Tanker Driver accepts the request.
3.  Admin monitors the delivery process.
4.  Delivery is marked as complete.
5.  Resident rates the delivery service.

## Optional Stretch Goals

-   SMS alerts for delivery updates (using Twilio API).
-   Anomaly detection script for verifying delivery volumes.
-   Database integration with MongoDB (planned)

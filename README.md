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
-   **Database**: MongoDB (planned)
-   **Realtime**: Firebase/Firestore (planned)
-   **Authentication**: Firebase Authentication
-   **Mapping**: Google Maps API (or OpenStreetMap)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd AquaLink
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Firebase:**

    -   Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    -   Enable Firebase Authentication (Email/Password and Google).
    -   Add your Firebase configuration to a `.env` file:

        ```
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
        ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the application.

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

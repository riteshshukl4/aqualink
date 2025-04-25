# **App Name**: AquaTrack

## Core Features:

- Request Submission: User submits request form with address, water amount, and urgency details.
- Driver Task List: Drivers see a list of requests with accept/reject options.
- Delivery tracking: Display a map showing the location of the delivery and the user's location.
- Default Page: Default page will describe this project and its benefits. It will have an option to login.
- Login Page: The login page will allow us to either login as user, driver or admin.
- Real Time Sync: Everything will be simultaneously linked for real time sync.

## Style Guidelines:

- Primary color: Light blue (#B0E2FF) to represent water and cleanliness.
- Secondary color: White (#FFFFFF) for clean backgrounds and content areas.
- Accent color: Teal (#008080) for interactive elements and highlights.
- Clean and intuitive layouts with clear information hierarchy.
- Consistent and easily recognizable icons for navigation and actions.
- Subtle transitions and animations to enhance user experience.
- Use of libraries like shadcn for entire ui design.

## Original User Request:
Build a full-stack web application called AquaLink – a smart water tanker request, delivery, and monitoring platform using the MERN stack (MongoDB, Express.js, Next.js, Node.js) with Firebase/Firestore for real-time data. Follow these specs:

User Roles:
    Residents (request/track tankers)
    Tanker Drivers (accept/mark deliveries)
    Admin (monitor all data, detect anomalies)

Key Screens:
    User App:
        Login/Signup (Firebase Auth)
        Request form (address, water amount, urgency)
        Live tracking (Google Maps API)
        Delivery history/ratings
    Driver App:
        Task list with accept/reject buttons
        Manual/GPS location logging
    Admin Dashboard:
        Real-time request map (Leaflet.js)
        Anomaly detection (e.g., mismatched delivery volumes)
        CSV export for reports

Tech Stack:
    Frontend: React.js + Material-UI (or Chakra UI)
    Backend: Node.js/Express.js (REST API)
    Auth: Firebase Authentication (Email/Google)
    Maps: Google Maps API (or free OpenStreetMap)

MVP Flow:
    User submits request → Driver accepts → Admin monitors → Delivery marked complete → User rates.

Generate boilerplate code for all layers (frontend components, backend routes, models).
Use modern hooks (React) and async/await (Node.js).
Prioritize clean, modular architecture (e.g., controllers/, models/, routes/).
Include a README.md with setup steps.

Optional Stretch Goals:

Add SMS alerts (Twilio API) for delivery updates.
Anomaly detection script (compare requested vs. delivered amounts).
  
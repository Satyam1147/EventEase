# EventEase - Event Booking Platform

## Overview
EventEase is a full-stack event booking platform built with React and Node.js. Users can browse and book events; admins can manage events.

## Features implemented
- JWT authentication (register/login)
- Role-based access (admin/user)
- Event creation, update, delete (admin)
- Booking logic with max 2 seats and capacity enforcement
- Booking cancellation (if event hasn't started)
- Booking logger middleware
- API docs (Postman collection included)

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth: JWT

## Setup
### Backend
1. `cd backend`
2. `npm install`
3. Set `.env`: `MONGO_URI`, `JWT_SECRET`, `PORT`
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. Set `.env` for API base url if needed
4. `npm run dev`

## API docs
- Postman collection: `/docs/EventEase.postman_collection.json`

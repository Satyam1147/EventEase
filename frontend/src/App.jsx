import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EventsList from './pages/EventsList';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">Events</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/mybookings">My Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

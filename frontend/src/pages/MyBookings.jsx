import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function MyBookings(){
  const [bookings, setBookings] = useState([]);
  useEffect(()=> {
    API.get('/bookings/my').then(res => setBookings(res.data)).catch(err => {
      console.error(err);
      alert('Please login to view bookings.');
    });
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            {b.eventId?.title || 'Event'} • Seats: {b.seats} • Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

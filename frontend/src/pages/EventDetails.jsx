import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function EventDetails(){
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);

  useEffect(()=> {
    API.get(`/events/${id}`).then(res => setEvent(res.data)).catch(console.error);
  }, [id]);

  const handleBook = async () => {
    try{
      const res = await API.post(`/bookings/${id}/book`, { seats });
      alert('Booked! Booking id: ' + res.data._id);
    }catch(err){
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if(!event) return <div>Loading...</div>;
  return (
    <div style={{ padding: 20 }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>When: {new Date(event.startDate).toLocaleString()}</p>
      <p>Capacity: {event.capacity} • Booked: {event.seatsBooked}</p>
      <label>Seats:
        <select value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </label>
      <br/>
      <button onClick={handleBook}>Book</button>
    </div>
  );
}

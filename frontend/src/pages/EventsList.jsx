import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function EventsList(){
  const [events, setEvents] = useState([]);
  useEffect(()=> {
    API.get('/events').then(res => setEvents(res.data)).catch(console.error);
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h2>Events</h2>
      {events.length === 0 && <p>No events found</p>}
      <ul>
        {events.map(e => (
          <li key={e._id} style={{ margin: '10px 0', borderBottom: '1px solid #ddd' }}>
            <Link to={`/events/${e._id}`}><strong>{e.title}</strong></Link><br/>
            {new Date(e.startDate).toLocaleString()} • {e.locationType} • {e.capacity - e.seatsBooked} seats left
          </li>
        ))}
      </ul>
    </div>
  );
}

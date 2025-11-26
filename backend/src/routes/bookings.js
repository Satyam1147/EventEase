const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

// create booking: POST /api/bookings/:eventId/book
router.post('/:eventId/book', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;
  const seats = Math.min(2, Math.max(1, Number(req.body.seats || 1)));

  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    const event = await Event.findById(eventId).session(session);
    if(!event) { await session.abortTransaction(); return res.status(404).json({ message: 'Event not found' }); }

    if(event.seatsBooked + seats > event.capacity){
      await session.abortTransaction();
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = await Booking.create([{ userId, eventId, seats }], { session });
    event.seatsBooked += seats;
    await event.save({ session });
    await session.commitTransaction();
    session.endSession();

    console.log(`[BOOKING] user:${userId} event:${eventId} seats:${seats} at ${new Date().toISOString()}`);
    res.json(booking[0]);
  }catch(err){
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

// get user's bookings
router.get('/my', authMiddleware, async (req, res) => {
  try{
    const bookings = await Booking.find({ userId: req.user.id }).populate('eventId');
    res.json(bookings);
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// cancel booking (if event not started)
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try{
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).json({ message: 'Not found' });
    const event = await Event.findById(booking.eventId);
    if(new Date() >= new Date(event.startDate)) return res.status(400).json({ message: 'Event already started' });

    booking.status = 'Cancelled';
    await booking.save();
    event.seatsBooked = Math.max(0, event.seatsBooked - booking.seats);
    await event.save();
    res.json({ message: 'Cancelled' });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;

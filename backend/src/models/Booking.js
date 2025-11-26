const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  seats: { type: Number, enum: [1,2], default: 1 },
  status: { type: String, enum: ['Confirmed','Cancelled'], default: 'Confirmed' },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);

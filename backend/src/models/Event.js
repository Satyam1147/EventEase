const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  locationType: { type: String, enum: ['Online','In-Person'], default: 'Online' },
  locationDetails: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  capacity: { type: Number, default: 100 },
  seatsBooked: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);

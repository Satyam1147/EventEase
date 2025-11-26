const express = require('express');
const Event = require('../models/Event');
const { authMiddleware, requireRole } = require('../middlewares/auth');
const genEventId = require('../utils/eventId');

const router = express.Router();

// list with simple filters (query params)
router.get('/', async (req, res) => {
  try{
    const { category, locationType } = req.query;
    const filter = {};
    if(category) filter.category = category;
    if(locationType) filter.locationType = locationType;
    const events = await Event.find(filter).sort({ startDate: 1 });
    res.json(events);
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// details
router.get('/:id', async (req, res) => {
  try{
    const event = await Event.findById(req.params.id);
    if(!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// create (admin)
router.post('/', authMiddleware, requireRole('admin'), async (req, res) => {
  try{
    const payload = req.body;
    payload.eventId = genEventId(new Date(payload.startDate || Date.now()));
    payload.createdBy = req.user.id;
    const event = new Event(payload);
    await event.save();
    res.json(event);
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// update (admin)
router.put('/:id', authMiddleware, requireRole('admin'), async (req, res) => {
  try{
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// delete
router.delete('/:id', authMiddleware, requireRole('admin'), async (req, res) => {
  try{
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;

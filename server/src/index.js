import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { getAvailability } from './availability.js';
import { addBooking, bookedSlotIds } from './store.js';

const PORT = process.env.PORT ?? 3001;
const LESSON_LENGTHS = [30, 45, 60];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBooking(body = {}) {
  const str = (value, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

  const booking = {
    slotId: str(body.slotId, 20),
    parentName: str(body.parentName),
    email: str(body.email),
    phone: str(body.phone, 30),
    studentName: str(body.studentName),
    studentAge: str(body.studentAge, 3),
    lessonLength: Number(body.lessonLength),
    zip: str(body.zip, 10),
    notes: str(body.notes, 1000),
  };

  const errors = {};
  if (!booking.slotId) errors.slotId = 'Pick a lesson time.';
  if (!booking.parentName) errors.parentName = 'Your name is required.';
  if (!EMAIL_PATTERN.test(booking.email)) errors.email = 'Enter a valid email address.';
  if (!booking.studentName) errors.studentName = "The student's name is required.";
  if (!LESSON_LENGTHS.includes(booking.lessonLength)) errors.lessonLength = 'Choose a lesson length.';
  if (!/^\d{5}$/.test(booking.zip)) errors.zip = 'Enter a 5-digit zip code.';

  return Object.keys(errors).length ? { errors } : { booking };
}

const app = express();
app.use(express.json({ limit: '10kb' }));

app.get('/api/availability', (req, res) => {
  res.json({ slots: getAvailability(bookedSlotIds()) });
});

app.post('/api/bookings', (req, res) => {
  const { errors, booking } = validateBooking(req.body);
  if (errors) return res.status(400).json({ errors });

  const isOpen = getAvailability(bookedSlotIds()).some((slot) => slot.id === booking.slotId);
  if (!isOpen) {
    return res.status(409).json({ errors: { slotId: 'That time was just taken. Please pick another.' } });
  }

  const saved = { id: crypto.randomUUID(), ...booking, createdAt: new Date().toISOString() };
  addBooking(saved);
  res.status(201).json({ booking: saved });
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// In production, serve the built React app and let it handle routing.
const clientDist = path.join(import.meta.dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('/{*splat}', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

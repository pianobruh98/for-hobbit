// Minimal JSON-file persistence for lesson bookings. Fine for a single small
// server; swap for a real database before handling meaningful traffic.
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(import.meta.dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'bookings.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

const bookings = load();

export function bookedSlotIds() {
  return new Set(bookings.map((booking) => booking.slotId));
}

// Writes synchronously so a check-then-add in a request handler can't
// interleave with another request.
export function addBooking(booking) {
  bookings.push(booking);
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

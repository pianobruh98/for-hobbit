// Stubbed availability. This fakes a weekly teaching schedule until a real
// calendar (Google Calendar, etc.) is wired up. Times are studio-local and kept
// as plain "YYYY-MM-DD" / "HH:MM" strings so they never shift across timezones.

// Start times offered on each weekday (0 = Sunday).
const WEEKLY_SCHEDULE = {
  1: ['15:30', '16:30', '17:30', '18:30'],
  2: ['15:30', '16:30', '17:30'],
  3: ['15:30', '16:30', '17:30', '18:30'],
  4: ['16:00', '17:00', '18:00'],
  6: ['09:00', '10:00', '11:00'],
};

const WEEKS_AHEAD = 6;

// Roughly a third of slots are marked taken so the calendar looks realistic.
// Hashing the slot id keeps the fake data stable between requests.
function isFakeTaken(slotId) {
  let hash = 0;
  for (const char of slotId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % 3 === 0;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Returns open slots from tomorrow through WEEKS_AHEAD, excluding booked ones.
export function getAvailability(bookedSlotIds) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const slots = [];
  for (let offset = 1; offset <= WEEKS_AHEAD * 7; offset++) {
    const day = new Date(today);
    day.setDate(today.getDate() + offset);
    const date = formatDate(day);

    for (const time of WEEKLY_SCHEDULE[day.getDay()] ?? []) {
      const id = `${date}T${time}`;
      if (isFakeTaken(id) || bookedSlotIds.has(id)) continue;
      slots.push({ id, date, time });
    }
  }
  return slots;
}

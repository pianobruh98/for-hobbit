import { useState } from 'react';
import { toDateKey } from '../dates.js';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, n) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

// Month-view calendar. Only dates in `availableDates` (a Set of date keys) are
// selectable. Navigation is limited to the months that contain availability.
export default function Calendar({ availableDates, firstDate, lastDate, selectedDate, onSelect }) {
  const minMonth = startOfMonth(firstDate);
  const maxMonth = startOfMonth(lastDate);
  const [month, setMonth] = useState(minMonth);

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leadingBlanks = month.getDay();
  const todayKey = toDateKey(new Date());

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-nav"
          onClick={() => setMonth(addMonths(month, -1))}
          disabled={month <= minMonth}
          aria-label="Previous month"
        >
          &#8249;
        </button>
        <h3>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h3>
        <button
          type="button"
          className="calendar-nav"
          onClick={() => setMonth(addMonths(month, 1))}
          disabled={month >= maxMonth}
          aria-label="Next month"
        >
          &#8250;
        </button>
      </div>

      <div className="calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}

        {Array.from({ length: leadingBlanks }, (_, i) => (
          <div key={`blank-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const key = toDateKey(new Date(month.getFullYear(), month.getMonth(), i + 1));
          const available = availableDates.has(key);
          const classes = ['calendar-day'];
          if (available) classes.push('is-available');
          if (key === selectedDate) classes.push('is-selected');
          if (key === todayKey) classes.push('is-today');

          return (
            <button
              key={key}
              type="button"
              className={classes.join(' ')}
              disabled={!available}
              aria-pressed={key === selectedDate}
              onClick={() => onSelect(key)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

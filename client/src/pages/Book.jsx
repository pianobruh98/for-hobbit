import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { createBooking, fetchAvailability } from '../api.js';
import Calendar from '../components/Calendar.jsx';
import { LESSON_TIERS } from '../data/tuition.js';
import { formatLongDate, formatTime, parseDateKey } from '../dates.js';

const EMPTY_FORM = {
  parentName: '',
  email: '',
  phone: '',
  studentName: '',
  studentAge: '',
  lessonLength: '',
  zip: '',
  notes: '',
};

function Field({ label, error, ...inputProps }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input {...inputProps} aria-invalid={Boolean(error)} />
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

function Confirmation({ booking }) {
  const [date, time] = booking.slotId.split('T');
  return (
    <main className="site-container">
      <div className="form-card booking-confirmation" role="status">
        <h2>You're on the calendar!</h2>
        <p>
          {booking.studentName}'s first lesson is set for <strong>{formatLongDate(date)}</strong> at{' '}
          <strong>{formatTime(time)}</strong> ({booking.lessonLength} minutes).
        </p>
        <p>I'll reach out to {booking.email} to confirm the details. Talk soon!</p>
        <Link to="/" className="button">
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default function Book() {
  const [slots, setSlots] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotId, setSlotId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchAvailability().then(
      (result) => !ignore && setSlots(result),
      (err) => !ignore && setLoadError(err),
    );
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const slotsByDate = useMemo(() => {
    const map = new Map();
    for (const slot of slots ?? []) {
      if (!map.has(slot.date)) map.set(slot.date, []);
      map.get(slot.date).push(slot);
    }
    return map;
  }, [slots]);

  const availableDates = useMemo(() => new Set(slotsByDate.keys()), [slotsByDate]);
  const timesForDay = slotsByDate.get(selectedDate) ?? [];
  const selectedSlot = slots?.find((slot) => slot.id === slotId);

  const updateField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      setConfirmed(await createBooking({ ...form, slotId }));
    } catch (err) {
      const hasFieldErrors = err.fieldErrors && Object.keys(err.fieldErrors).length > 0;
      setErrors(hasFieldErrors ? err.fieldErrors : { form: 'Something went wrong. Please try again.' });
      if (err.status === 409) {
        setSlotId(null);
        setReloadKey((k) => k + 1);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) return <Confirmation booking={confirmed} />;

  return (
    <>
      <header className="page-header site-container">
        <h1>Book a Lesson</h1>
        <p>Pick a time for your first (free!) lesson, and tell me a little about your student.</p>
      </header>

      <main className="site-container">
        <div className="booking-layout">
          <section className="form-card" aria-label="Choose a time">
            <h2 className="form-card-title">1. Choose a time</h2>

            {loadError && <p className="field-error">Couldn't load availability. Please refresh the page.</p>}
            {!slots && !loadError && <p className="form-notice">Loading availability…</p>}
            {slots?.length === 0 && <p className="form-notice">No openings right now. Check back soon!</p>}

            {slots?.length > 0 && (
              <>
                <Calendar
                  availableDates={availableDates}
                  firstDate={parseDateKey(slots[0].date)}
                  lastDate={parseDateKey(slots.at(-1).date)}
                  selectedDate={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSlotId(null);
                  }}
                />

                {selectedDate && (
                  <div className="time-slots">
                    <h3>{formatLongDate(selectedDate)}</h3>
                    {timesForDay.length === 0 ? (
                      <p className="form-notice">No times left on this day.</p>
                    ) : (
                      <div className="time-slot-list">
                        {timesForDay.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            className={`time-slot${slot.id === slotId ? ' is-selected' : ''}`}
                            aria-pressed={slot.id === slotId}
                            onClick={() => setSlotId(slot.id)}
                          >
                            {formatTime(slot.time)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            {errors.slotId && <p className="field-error">{errors.slotId}</p>}
          </section>

          <form className="form-card" onSubmit={handleSubmit} aria-label="Your details">
            <h2 className="form-card-title">2. Your details</h2>

            <Field label="Parent / guardian name" name="parentName" value={form.parentName} onChange={updateField} error={errors.parentName} autoComplete="name" required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} autoComplete="email" required />
            <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={updateField} error={errors.phone} autoComplete="tel" />

            <div className="form-row">
              <Field label="Student name" name="studentName" value={form.studentName} onChange={updateField} error={errors.studentName} required />
              <Field label="Age (optional)" name="studentAge" type="number" min="3" max="120" value={form.studentAge} onChange={updateField} error={errors.studentAge} />
            </div>

            <Field label="Zip code" name="zip" inputMode="numeric" pattern="\d{5}" maxLength={5} value={form.zip} onChange={updateField} error={errors.zip} autoComplete="postal-code" required />

            <fieldset className="form-field lesson-length">
              <legend>Lesson length</legend>
              {LESSON_TIERS.map((tier) => (
                <label key={tier.minutes} className="lesson-option">
                  <input
                    type="radio"
                    name="lessonLength"
                    value={tier.minutes}
                    checked={form.lessonLength === String(tier.minutes)}
                    onChange={updateField}
                    required
                  />
                  <span>
                    <strong>{tier.minutes} min</strong> &middot; {tier.name} &middot; ${tier.rate}/mo
                  </span>
                </label>
              ))}
              {errors.lessonLength && <span className="field-error">{errors.lessonLength}</span>}
            </fieldset>

            <label className="form-field">
              <span>Anything I should know? (optional)</span>
              <textarea name="notes" rows={3} value={form.notes} onChange={updateField} maxLength={1000} />
            </label>

            <p className="selected-slot">
              {selectedSlot
                ? `First lesson: ${formatLongDate(selectedSlot.date)} at ${formatTime(selectedSlot.time)}`
                : 'Choose a time from the calendar to continue.'}
            </p>

            {errors.form && <p className="field-error">{errors.form}</p>}

            <button type="submit" className="button" disabled={!selectedSlot || submitting}>
              {submitting ? 'Booking…' : 'Book my first lesson'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

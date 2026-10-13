async function request(url, options) {
  const res = await fetch(url, options);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.error ?? `Request failed (${res.status})`);
    err.status = res.status;
    err.fieldErrors = body.errors ?? {};
    throw err;
  }
  return body;
}

export async function fetchAvailability() {
  const { slots } = await request('/api/availability');
  return slots;
}

export async function createBooking(data) {
  const { booking } = await request('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return booking;
}

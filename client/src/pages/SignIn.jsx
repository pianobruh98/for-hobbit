import { useState } from 'react';

// Placeholder. There is no account system yet, so submitting just shows a notice.
export default function SignIn() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <header className="page-header site-container">
        <h1>Sign In</h1>
        <p>Student and family accounts are coming soon.</p>
      </header>

      <main className="site-container">
        <form
          className="form-card signin-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="form-field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input type="password" name="password" autoComplete="current-password" required />
          </label>

          <button type="submit" className="button">
            Sign in
          </button>

          {submitted && (
            <p className="form-notice" role="status">
              Sign-in isn't available yet. Check back soon!
            </p>
          )}
        </form>
      </main>
    </>
  );
}

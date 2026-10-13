import { Link } from 'react-router';
import { LESSON_TIERS } from '../data/tuition.js';

export default function Rates() {
  return (
    <>
      <header className="page-header site-container">
        <h1>Tuition Rates</h1>
        <p>A flat monthly rate. Your first month (four lessons) is free.</p>
      </header>

      <main className="site-container">
        <div className="credentials-grid">
          {LESSON_TIERS.map((tier) => (
            <div key={tier.minutes} className="credential-card rate-card">
              <h4>
                {tier.name} &middot; {tier.minutes} min
              </h4>
              <p className="rate-price">
                ${tier.rate}
                <span> / month</span>
              </p>
              <p>{tier.description}</p>
              <p className="rate-summer">Summer (June–August): ${tier.summerRate} / month</p>
            </div>
          ))}
        </div>

        <p className="page-note">
          Payment deadlines, summer scheduling, and late fees are covered in the{' '}
          <Link to="/policies">studio policies</Link>.
        </p>
        <div className="page-actions">
          <Link to="/book" className="button">
            Book a trial lesson
          </Link>
        </div>
      </main>
    </>
  );
}

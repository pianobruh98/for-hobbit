import { useEffect } from 'react';
import { Link } from 'react-router';
import Hero from '../components/Hero.jsx';
import InfoCard from '../components/InfoCard.jsx';

export default function Home() {
  // Mobile scroll-snapping applies only to the home page.
  useEffect(() => {
    document.documentElement.classList.add('snap-page');
    return () => document.documentElement.classList.remove('snap-page');
  }, []);

  return (
    <>
      <Hero />

      <main className="site-container">
        <section className="vertical-snap" aria-label="Academy Offerings">
          <InfoCard className="card-in-home" badge="Convenience" title="In-Home Lessons">
            <p>
              I drive to you! One less place to commute during the week, and you are always kept in the
              loop with how the lessons are going.
            </p>
          </InfoCard>

          <InfoCard className="card-progress" badge="Trial Lessons" title="First Month Free!">
            <p>
              I teach the first four lessons without charging for tuition. This helps us see if we are a
              good fit for each other.
            </p>
          </InfoCard>

          <InfoCard className="card-events" badge="Performance" title="Progress Oriented">
            <p>
              I have my students participate regularly in music festivals, studio recitals, and local
              competitions for those more advanced. Students gain experience being in front of other
              people and opportunities to play for their families and friends.
            </p>
          </InfoCard>

          <InfoCard
            className="card-curriculum"
            badge="Learning for life"
            title="Call me to set up your first month of lessons!"
          >
            <p>
              All you need is a weighted keyboard or a piano to start nurturing a lifelong love of music.
              Interested in more information? Look at my <Link to="/policies" className="card-link">studio policies</Link>,{' '}
              <Link to="/philosophy" className="card-link">teaching philosophy</Link>, and{' '}
              <Link to="/rates" className="card-link">tuition rates</Link>.
            </p>
            <Link to="/book" className="button card-cta">
              Book a trial lesson
            </Link>
          </InfoCard>
        </section>
      </main>
    </>
  );
}

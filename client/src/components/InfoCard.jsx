import { useEffect, useRef, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

export default function InfoCard({ className, badge, title, children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Mobile-only: trigger a one-time background zoom when the card scrolls in.
  useEffect(() => {
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="v-section-wrapper">
      <article
        ref={ref}
        className={`info-card v-section ${className}${inView ? ' in-view' : ''}`}
        role="group"
        aria-label={title}
      >
        <div className="card-bg-layer"></div>
        <div className="card-content">
          <div className="card-badge">{badge}</div>
          <h2>{title}</h2>
          {children}
        </div>
      </article>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';

const NAV_LINKS = [
  { to: '/about', label: 'About Me' },
  { to: '/philosophy', label: 'Teaching Philosophy' },
  { to: '/policies', label: 'Studio Policies' },
  { to: '/rates', label: 'Tuition Rates' },
  { to: '/book', label: 'Book a Lesson' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const close = () => setOpen(false);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={close}>
          <img src="/logo/logo-dark.svg" alt="Warnick Piano Academy" />
        </Link>

        <div className="nav-actions" ref={menuRef}>
          <Link to="/signin" className="nav-signin" onClick={close}>
            Sign in
          </Link>

          <button
            className={`nav-toggle${open ? ' active' : ''}`}
            aria-label="Toggle Navigation"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="hamburger"></span>
          </button>

          <nav className={`nav-dropdown${open ? ' is-open' : ''}`}>
            <ul className="nav-menu">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} onClick={close}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

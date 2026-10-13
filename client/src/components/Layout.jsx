import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="site-container snap-item">
        <p>&copy; 2026 Warnick Piano Academy</p>
      </footer>
    </>
  );
}

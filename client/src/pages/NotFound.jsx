import { Link } from 'react-router';

export default function NotFound() {
  return (
    <header className="page-header site-container">
      <h1>Page Not Found</h1>
      <p>
        That page doesn't exist. <Link to="/">Head back home</Link>.
      </p>
    </header>
  );
}

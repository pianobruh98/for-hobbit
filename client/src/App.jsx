import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import About from './pages/About.jsx';
import Book from './pages/Book.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Philosophy from './pages/Philosophy.jsx';
import Policies from './pages/Policies.jsx';
import Rates from './pages/Rates.jsx';
import SignIn from './pages/SignIn.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="philosophy" element={<Philosophy />} />
        <Route path="policies" element={<Policies />} />
        <Route path="rates" element={<Rates />} />
        <Route path="book" element={<Book />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './data/BookingContext';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mentors from './pages/Mentors';
import MentorProfile from './pages/MentorProfile';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import BecomeMentor from './pages/BecomeMentor';

function App() {
  return (
    <Router>
      <BookingProvider>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/mentor/:id" element={<MentorProfile />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/become-mentor" element={<BecomeMentor />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FacultyPage from './pages/FacultyPage';

const App: React.FC = () => {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* Additional routes will be added here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
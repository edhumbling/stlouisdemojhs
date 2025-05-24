import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import ContactPage from './pages/ContactPage';
import FacultyPage from './pages/FacultyPage';
import DonationPage from './pages/DonationPage';
import NewsPage from './pages/NewsPage';
import NotFoundPage from './pages/NotFoundPage';
import WhatsAppButton from './components/common/WhatsAppButton';
import FacebookButton from './components/common/FacebookButton';
import ScrollButton from './components/common/ScrollButtonNew';

const App: React.FC = () => {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      {/* Floating buttons */}
      <FacebookButton url="https://www.facebook.com/stlouisdemojhs" />
      <WhatsAppButton url="https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q" />
      <ScrollButton />

      <Routes>
        {/* Main layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="donate" element={<DonationPage />} />
          {/* Additional routes will be added here */}

          {/* Catch-all route for paths within the layout */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Global catch-all route for direct access to non-existent routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
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
import CalendarPage from './pages/CalendarPage';
import AISearchPage from './pages/AISearchPage';
import STEMPage from './pages/STEMPage';
import LearnHubPage from './pages/LearnHubPage';
import AdviceSpeechesPage from './pages/AdviceSpeechesPage';
import GalleryPage from './pages/GalleryPage';
import ApplyNowPage from './pages/ApplyNowPage';
import ScheduleVisitPage from './pages/ScheduleVisitPage';
import PartnerPage from './pages/PartnerPage';
import AlumniPage from './pages/AlumniPage';
import MediaPage from './pages/MediaPage';
import CharacterEducationPage from './pages/CharacterEducationPage';
import STEMEducationPage from './pages/STEMEducationPage';
import CreativeArtsPage from './pages/CreativeArtsPage';
import LanguageCommunicationPage from './pages/LanguageCommunicationPage';
import CoreAcademicPage from './pages/CoreAcademicPage';
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
          <Route path="stem" element={<STEMPage />} />
          <Route path="learnhub" element={<LearnHubPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="ai-search" element={<AISearchPage />} />
          <Route path="advice-speeches" element={<AdviceSpeechesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="apply-now" element={<ApplyNowPage />} />
          <Route path="schedule-visit" element={<ScheduleVisitPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="alumni" element={<AlumniPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="donate" element={<DonationPage />} />

          {/* Academic Area Pages */}
          <Route path="character-education" element={<CharacterEducationPage />} />
          <Route path="stem-education" element={<STEMEducationPage />} />
          <Route path="creative-arts" element={<CreativeArtsPage />} />
          <Route path="language-communication" element={<LanguageCommunicationPage />} />
          <Route path="core-academic" element={<CoreAcademicPage />} />

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
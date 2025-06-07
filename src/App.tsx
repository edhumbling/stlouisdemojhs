import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { HeaderProvider } from './contexts/HeaderContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ContactPage from './pages/ContactPage';
import FacultyPage from './pages/FacultyPage';
import DonationPage from './pages/DonationPage';
import NewsPage from './pages/NewsPage';
import CalendarPage from './pages/CalendarPage';
import AISearchPage from './pages/AISearchPage';
import STEMPage from './pages/STEMPage';
import StudentsHubPage from './pages/StudentsHubPage';
import AdviceSpeechesPage from './pages/AdviceSpeechesPage';
import GalleryPage from './pages/GalleryPage';
import ApplyNowPage from './pages/ApplyNowPage';
import ScheduleVisitPage from './pages/ScheduleVisitPage';
import PartnerPage from './pages/PartnerPage';
import AlumniPage from './pages/AlumniPage';
import SponsorshipPage from './pages/SponsorshipPage'; // Import SponsorshipPage
import MediaPage from './pages/MediaPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SitemapPage from './pages/SitemapPage';
import CharacterEducationPage from './pages/CharacterEducationPage';
import STEMEducationPage from './pages/STEMEducationPage';
import CreativeArtsPage from './pages/CreativeArtsPage';
import LanguageCommunicationPage from './pages/LanguageCommunicationPage';
import CoreAcademicPage from './pages/CoreAcademicPage';
import StaffResourcesPage from './pages/StaffResourcesPage';
import AITeachingGuidePage from './pages/AITeachingGuidePage';
import JHSTextbooksPage from './pages/JHSTextbooksPage';
import DreamHiveResourcesPage from './pages/DreamHiveResourcesPage';
import CareerReelResourcesPage from './pages/CareerReelResourcesPage';
import MoneySmartLinksPage from './pages/MoneySmartLinksPage';
import NotFoundPage from './pages/NotFoundPage';
import PayPalDonatePage from './pages/PayPalDonatePage';
import DonateUSBankPage from './pages/DonateUSBankPage';
import DonateUKBankPage from './pages/DonateUKBankPage';



// Scroll Position Manager Component
const ScrollPositionManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const saveScrollPosition = () => {
      const scrollPosition = window.scrollY;
      const pathname = window.location.pathname;
      sessionStorage.setItem(`scrollPosition_${pathname}`, scrollPosition.toString());
    };

    const restoreScrollPosition = () => {
      const pathname = location.pathname;
      const savedPosition = sessionStorage.getItem(`scrollPosition_${pathname}`);

      if (savedPosition) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'instant'
          });
        });
      } else {
        // Only scroll to top if no saved position (new page visit)
        window.scrollTo(0, 0);
      }
    };

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // Save scroll position periodically while scrolling
    const handleScroll = () => {
      saveScrollPosition();
    };

    // Restore scroll position on page load
    restoreScrollPosition();

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HeaderProvider>
      <Router>
        {/* Scroll Position Manager */}
        <ScrollPositionManager />



        <Routes>
        {/* Main layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="staff-resources" element={<StaffResourcesPage />} />
          <Route path="ai-teaching-guide" element={<AITeachingGuidePage />} />
          <Route path="jhs-textbooks" element={<JHSTextbooksPage />} />
          <Route path="dream-hive-resources" element={<DreamHiveResourcesPage />} />
          <Route path="career-reel-resources" element={<CareerReelResourcesPage />} />
          <Route path="money-smart-links" element={<MoneySmartLinksPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="stem" element={<STEMPage />} />
          <Route path="learnhub" element={<StudentsHubPage />} />
          <Route path="students-hub" element={<StudentsHubPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="ai-search" element={<AISearchPage />} />
          <Route path="advice-speeches" element={<AdviceSpeechesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="apply-now" element={<ApplyNowPage />} />
          <Route path="schedule-visit" element={<ScheduleVisitPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="alumni" element={<AlumniPage />} />
          <Route path="sponsorship" element={<SponsorshipPage />} /> {/* New Route */}
          <Route path="media" element={<MediaPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="donate-paypal" element={<PayPalDonatePage />} />
          <Route path="donate-us-bank" element={<DonateUSBankPage />} />
          <Route path="donate-uk-bank" element={<DonateUKBankPage />} />

          {/* Legal Pages */}
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="sitemap" element={<SitemapPage />} />

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
    </HeaderProvider>
  );
};

export default App;
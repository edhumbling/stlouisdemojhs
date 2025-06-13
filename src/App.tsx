import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import { HeaderProvider } from './contexts/HeaderContext';
import { BetaAccessProvider } from './contexts/BetaAccessContext';
import BetaGate from './components/beta/BetaGate';
import './utils/betaUtils'; // Import beta utilities for development
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
import ThankYouPage from './pages/ThankYouPage';
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
import DonateEuroBankPage from './pages/DonateEuroBankPage';
import SHSDatabasePage from './pages/SHSDatabasePage';
import SHSPdfViewerPage from './pages/SHSPdfViewerPage';
import ResultsPlacementPage from './pages/ResultsPlacementPage';
import TikTokPage from './pages/TikTokPage';
import TikTokSubmissionPage from './pages/TikTokSubmissionPage';
import ScholarshipOpportunitiesPage from './pages/ScholarshipOpportunitiesPage';
import EducationalPathwayGuide from './components/educational/EducationalPathwayGuide';
import EducationalGuidePage from './pages/EducationalGuidePage';
import NursingInstitutionsPage from './pages/NursingInstitutionsPage';
import TeacherTrainingPage from './pages/TeacherTrainingPage';
import LocalUniversitiesPage from './pages/LocalUniversitiesPage';
import ProfessionalInstitutesPage from './pages/ProfessionalInstitutesPage';
import TVETSchoolsPage from './pages/TVETSchoolsPage';
import MilitaryAcademiesPage from './pages/MilitaryAcademiesPage';
import ReligiousSeminariesPage from './pages/ReligiousSeminariesPage';
import ArtCreativeSchoolsPage from './pages/ArtCreativeSchoolsPage';
import AgriculturalCollegesPage from './pages/AgriculturalCollegesPage';
import BusinessSchoolsPage from './pages/BusinessSchoolsPage';
import OnlineUniversitiesPage from './pages/OnlineUniversitiesPage';
import MayamilesAIPage from './pages/MayamilesAIPage';
import SocialPreviewPage from './pages/SocialPreviewPage';
import DonateMonthly10Page from './pages/DonateMonthly10Page';
import DonateMonthly30Page from './pages/DonateMonthly30Page';
import DonateMonthly50Page from './pages/DonateMonthly50Page';
import DonateMonthly100Page from './pages/DonateMonthly100Page';
import DonateMonthly200Page from './pages/DonateMonthly200Page';
import DonateMonthly500Page from './pages/DonateMonthly500Page';
import DonateMonthly1000Page from './pages/DonateMonthly1000Page';

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
  // Cache busting for fresh deployments
  React.useEffect(() => {
    console.log('🚀 St. Louis Demo JHS - Fresh deployment loaded v2024-01-30-001');
    console.log('✅ MayaMiles AI with SuperChat functionality ready');
  }, []);

  return (
    <HelmetProvider>
      <BetaAccessProvider>
        <BetaGate>
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
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="schedule-visit" element={<ScheduleVisitPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="alumni" element={<AlumniPage />} />
          <Route path="sponsorship" element={<SponsorshipPage />} /> {/* New Route */}
          <Route path="media" element={<MediaPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="donate-paypal" element={<PayPalDonatePage />} />
          <Route path="donate-us-bank" element={<DonateUSBankPage />} />
          <Route path="donate-uk-bank" element={<DonateUKBankPage />} />
          <Route path="donate-euro-bank" element={<DonateEuroBankPage />} />

          {/* Monthly Donation Pages */}
          <Route path="donate-monthly-10" element={<DonateMonthly10Page />} />
          <Route path="donate-monthly-30" element={<DonateMonthly30Page />} />
          <Route path="donate-monthly-50" element={<DonateMonthly50Page />} />
          <Route path="donate-monthly-100" element={<DonateMonthly100Page />} />
          <Route path="donate-monthly-200" element={<DonateMonthly200Page />} />
          <Route path="donate-monthly-500" element={<DonateMonthly500Page />} />
          <Route path="donate-monthly-1000" element={<DonateMonthly1000Page />} />
          <Route path="shs-database" element={<SHSDatabasePage />} />
          <Route path="/shs-database/pdf/:pdfId" element={<SHSPdfViewerPage />} />
          <Route path="/results-placement" element={<ResultsPlacementPage />} />
          <Route path="/tiktok" element={<TikTokPage />} />
          <Route path="/tiktok-submit" element={<TikTokSubmissionPage />} />
          <Route path="/scholarship-opportunities" element={<ScholarshipOpportunitiesPage />} />
          <Route path="/educational-pathway-guide" element={<EducationalPathwayGuide />} />
          <Route path="/educational-guide" element={<EducationalGuidePage />} />
          <Route path="/nursing-institutions" element={<NursingInstitutionsPage />} />
          <Route path="/teacher-training" element={<TeacherTrainingPage />} />
          <Route path="/local-universities" element={<LocalUniversitiesPage />} />
          <Route path="/professional-institutes" element={<ProfessionalInstitutesPage />} />
          <Route path="/tvet-schools" element={<TVETSchoolsPage />} />
          <Route path="/military-academies" element={<MilitaryAcademiesPage />} />
          <Route path="/religious-seminaries" element={<ReligiousSeminariesPage />} />
          <Route path="/art-creative-schools" element={<ArtCreativeSchoolsPage />} />
          <Route path="/agricultural-colleges" element={<AgriculturalCollegesPage />} />
          <Route path="/business-schools" element={<BusinessSchoolsPage />} />
          <Route path="/online-universities" element={<OnlineUniversitiesPage />} />

          {/* Social Media Preview Tool */}
          <Route path="/social-preview" element={<SocialPreviewPage />} />

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

        {/* Standalone pages without Layout (no header/footer) */}
        <Route path="/mayamiles-ai" element={<MayamilesAIPage />} />

        {/* Global catch-all route for direct access to non-existent routes */}
        <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Router>
          </HeaderProvider>
        </BetaGate>
      </BetaAccessProvider>
    </HelmetProvider>
  );
};

export default App;
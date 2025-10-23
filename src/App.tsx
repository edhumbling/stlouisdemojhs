import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import { HeaderProvider } from './contexts/HeaderContext';
import { LoadingProvider } from './contexts/LoadingContext';




import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ContactPage from './pages/ContactPage';
import FacultyPage from './pages/FacultyPage';
import DonationPage from './pages/DonationPage';
import DonateOneDollarPage from './pages/DonateOneDollarPage';
import NewsPage from './pages/NewsPage';
import CalendarPage from './pages/CalendarPage';
import AISearchPage from './pages/AISearchPage';

import STEMPage from './pages/STEMPage';
import RoboticsPage from './pages/RoboticsPage';
import SpaceExplorationPage from './pages/SpaceExplorationPage';
import TVETPage from './pages/TVETPage';
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
import MediaFilesPage from './pages/MediaFilesPage';
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
import GiveFeedbackPage from './pages/GiveFeedbackPage';
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
import LeadershipExcellencePage from './pages/LeadershipExcellencePage';
import EnglishLanguagePage from './pages/subjects/EnglishLanguagePage';
import MathematicsPage from './pages/subjects/MathematicsPage';
import IntegratedSciencePage from './pages/subjects/IntegratedSciencePage';
import SocialStudiesPage from './pages/subjects/SocialStudiesPage';
import ReligiousMoralEducationPage from './pages/subjects/ReligiousMoralEducationPage';
import GhanaianLanguagePage from './pages/subjects/GhanaianLanguagePage';
import FrenchPage from './pages/subjects/FrenchPage';
import CareerTechnologyPage from './pages/subjects/CareerTechnologyPage';
import ComputingICTPage from './pages/subjects/ComputingICTPage';
import CreativeArtsDesignPage from './pages/subjects/CreativeArtsDesignPage';
import MusicPage from './pages/subjects/MusicPage';
import DonateMonthly10Page from './pages/DonateMonthly10Page';
import DonateMonthly30Page from './pages/DonateMonthly30Page';
import DonateMonthly50Page from './pages/DonateMonthly50Page';
import DonateMonthly100Page from './pages/DonateMonthly100Page';
import DonateMonthly200Page from './pages/DonateMonthly200Page';
import DonateMonthly500Page from './pages/DonateMonthly500Page';
import DonateMonthly1000Page from './pages/DonateMonthly1000Page';
import DonateMonthly3000Page from './pages/DonateMonthly3000Page';
import DonateMonthly5000Page from './pages/DonateMonthly5000Page';
import PTAPage from './pages/PTAPage';
import DonationThankYouPage from './pages/DonationThankYouPage';
import AILearningPage from './pages/AILearningPage';
import StemDeepLearningPage from './pages/StemDeepLearningPage';
import FinancialLiteracyPage from './pages/FinancialLiteracyPage';
import FinancialLibraryPage from './pages/FinancialLibraryPage';
import FinancialLibraryViewerPage from './pages/FinancialLibraryViewerPage';
import ShopGalleryPage from './pages/ShopGalleryPage';
import CareersListPage from './pages/CareersListPage';
import TechResourcesPage from './pages/TechResourcesPage';
import LoadingTestPage from './pages/LoadingTestPage';
import LouisAIPage from './pages/LouisAIPage';

// Note: Scroll position management is now handled by useEnhancedNavigation hook

const App: React.FC = () => {
  // Clear cache and cookies on page refresh
  React.useEffect(() => {
    const clearWebsiteData = async () => {
      try {
        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
        });

        // Clear localStorage
        localStorage.clear();

        // Clear sessionStorage
        sessionStorage.clear();

        // Clear IndexedDB
        if ('indexedDB' in window) {
          const databases = await indexedDB.databases();
          await Promise.all(
            databases.map(db => {
              if (db.name) {
                return new Promise((resolve, reject) => {
                  const deleteReq = indexedDB.deleteDatabase(db.name);
                  deleteReq.onsuccess = () => resolve(true);
                  deleteReq.onerror = () => reject(deleteReq.error);
                });
              }
            })
          );
        }

        // Clear cache storage if available
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        }

        console.log('🧹 Website cache and cookies cleared on refresh');
      } catch (error) {
        console.warn('⚠️ Some cache clearing operations failed:', error);
      }
    };

    // Only clear on page refresh, not on initial load
    const isRefresh = performance.navigation?.type === 1 || 
                     (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    
    if (isRefresh) {
      clearWebsiteData();
    }

    console.log('🚀 St. Louis Demo JHS - Fresh deployment loaded v2024-01-30-001');
    console.log('✅ MayaMiles AI with SuperChat functionality ready');
  }, []);

  return (
    <HelmetProvider>
      <HeaderProvider>
        <LoadingProvider>
          <Router>
            <Routes>
        {/* Main layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="leadership-excellence" element={<LeadershipExcellencePage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="subject/english-language" element={<EnglishLanguagePage />} />
          <Route path="subject/mathematics" element={<MathematicsPage />} />
          <Route path="subject/integrated-science" element={<IntegratedSciencePage />} />
          <Route path="subject/social-studies" element={<SocialStudiesPage />} />
          <Route path="subject/religious-moral-education" element={<ReligiousMoralEducationPage />} />
          <Route path="subject/ghanaian-language" element={<GhanaianLanguagePage />} />
          <Route path="subject/french" element={<FrenchPage />} />
          <Route path="subject/career-technology" element={<CareerTechnologyPage />} />
          <Route path="subject/computing-ict" element={<ComputingICTPage />} />
          <Route path="subject/creative-arts-design" element={<CreativeArtsDesignPage />} />
          <Route path="subject/music" element={<MusicPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="staff-resources" element={<StaffResourcesPage />} />
          <Route path="ai-teaching-guide" element={<AITeachingGuidePage />} />
          <Route path="jhs-textbooks" element={<JHSTextbooksPage />} />
          <Route path="dream-hive-resources" element={<DreamHiveResourcesPage />} />
          <Route path="career-reel-resources" element={<CareerReelResourcesPage />} />
          <Route path="money-smart-links" element={<MoneySmartLinksPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="givefeedback" element={<GiveFeedbackPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="blog" element={<NewsPage />} />

          <Route path="stem-deep-learning" element={<StemDeepLearningPage />} />
          <Route path="learnhub" element={<StudentsHubPage />} />
          <Route path="students-hub" element={<StudentsHubPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="ai-search" element={<AISearchPage />} />
          <Route path="ai" element={<AILearningPage />} />
          <Route path="advice-speeches" element={<AdviceSpeechesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="apply-now" element={<ApplyNowPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="schedule-visit" element={<ScheduleVisitPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="alumni" element={<AlumniPage />} />
          <Route path="shop" element={<ShopGalleryPage />} />
          <Route path="careers-list" element={<CareersListPage />} />
          <Route path="/tech-resources" element={<TechResourcesPage />} />
          <Route path="loading-test" element={<LoadingTestPage />} />
          <Route path="sponsorship" element={<SponsorshipPage />} /> {/* New Route */}
          <Route path="pta" element={<PTAPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="media-files" element={<MediaFilesPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="donate-one-dollar" element={<DonateOneDollarPage />} />
          <Route path="donate-paypal" element={<PayPalDonatePage />} />
          <Route path="donate-us-bank" element={<DonateUSBankPage />} />
          <Route path="donate-uk-bank" element={<DonateUKBankPage />} />
          <Route path="donate-euro-bank" element={<DonateEuroBankPage />} />


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

          {/* Louis AI Assistant */}
          <Route path="/louis-ai" element={<LouisAIPage />} />

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
        <Route path="/stem" element={<STEMPage />} />
        <Route path="/robotics" element={<RoboticsPage />} />
        <Route path="/space-exploration" element={<SpaceExplorationPage />} />
        <Route path="/tvet" element={<TVETPage />} />
        <Route path="/mayamiles-ai" element={<MayamilesAIPage />} />
        <Route path="/donation-thank-you" element={<DonationThankYouPage />} />

        {/* Financial Education Pages - No Footer */}
        <Route path="/financialliteracy" element={<FinancialLiteracyPage />} />
        <Route path="/financial-library" element={<FinancialLibraryPage />} />
        <Route path="/financial-library/:bookId" element={<FinancialLibraryViewerPage />} />

        {/* Monthly Donation Pages - No Header/Footer */}
        <Route path="/donate-monthly-10" element={<DonateMonthly10Page />} />
        <Route path="/donate-monthly-30" element={<DonateMonthly30Page />} />
        <Route path="/donate-monthly-50" element={<DonateMonthly50Page />} />
        <Route path="/donate-monthly-100" element={<DonateMonthly100Page />} />
        <Route path="/donate-monthly-200" element={<DonateMonthly200Page />} />
        <Route path="/donate-monthly-500" element={<DonateMonthly500Page />} />
        <Route path="/donate-monthly-1000" element={<DonateMonthly1000Page />} />
        <Route path="/donate-monthly-3000" element={<DonateMonthly3000Page />} />
        <Route path="/donate-monthly-5000" element={<DonateMonthly5000Page />} />

        {/* Global catch-all route for direct access to non-existent routes */}
        <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </HeaderProvider>
    </HelmetProvider>
  );
};

export default App;
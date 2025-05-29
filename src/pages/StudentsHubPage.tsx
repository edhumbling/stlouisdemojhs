import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, FileText, Calculator, Languages, X, ArrowLeft, Users, DollarSign, Briefcase, Lightbulb, ExternalLink, AlertCircle, RefreshCw, Smartphone, Palette, Code, Zap, Heart, Rocket, Library, Book, Archive, GraduationCap, Bot, MousePointer, Wind, Globe } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  isInternal?: boolean;
  alternativeUrls?: string[];
  embedStrategy?: 'iframe' | 'external' | 'smart';
  forceExternal?: boolean;
  proxyUrls?: string[];
  customScripts?: boolean;
  isUSSD?: boolean;
}

const StudentsHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [smartLoadingPhase, setSmartLoadingPhase] = useState<'connecting' | 'loading' | 'error' | 'success'>('connecting');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();

  // Control header visibility based on whether we're viewing an individual resource
  useEffect(() => {
    if (selectedResource) {
      // Hide header when viewing individual resource
      setShowHeader(false);
    } else {
      // Show header when viewing main grid
      setShowHeader(true);
    }

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [selectedResource, setShowHeader]);

  const handleMainBack = () => {
    navigate(-1); // Go back to previous page
  };

  // 📚 CATEGORIZED STUDENTS HUB RESOURCES 📚
  // Organized by learning areas for better navigation and discovery
  const resourceCategories = {
    "📚 Academic Resources": [
      {
        id: 1,
        title: "Audiobooks",
        description: "Free audiobooks collection",
        url: "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/browse.html",
        icon: <Mic className="w-5 h-5" />,
        color: "#007AFF"
      },
      {
        id: 2,
        title: "Poetry Archive",
        description: "Children's poetry collection",
        url: "https://childrens.poetryarchive.org/",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#FF3B30"
      },
      {
        id: 17,
        title: "Ebook Library",
        description: "Comprehensive digital library with thousands of free ebooks",
        url: "https://divinemonk.github.io/ebooklibrary/",
        icon: <Library className="w-5 h-5" />,
        color: "#8B5CF6",
        embedStrategy: 'iframe'
      },
      {
        id: 19,
        title: "DBooks Library",
        description: "Free programming and technical books library for developers and students",
        url: "https://www.dbooks.org/",
        icon: <Code className="w-5 h-5" />,
        color: "#059669",
        embedStrategy: 'iframe'
      },
      {
        id: 20,
        title: "Gutenberg Library",
        description: "Classic literature and public domain books - over 70,000 free ebooks",
        url: "https://www.gutenberg.org/ebooks/categories",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#DC2626",
        embedStrategy: 'iframe'
      },
      {
        id: 21,
        title: "Libgen Library",
        description: "Comprehensive digital archive with millions of books, papers, and documents",
        url: "https://libgen.is/",
        icon: <Archive className="w-5 h-5" />,
        color: "#7C2D12",
        embedStrategy: 'iframe'
      },
      {
        id: 22,
        title: "JHS Textbooks",
        description: "Free Junior High School textbooks and notes organized by subject",
        url: "/jhs-textbooks",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#0F766E",
        isInternal: true
      },
      {
        id: 26,
        title: "Dreamhive Resources",
        description: "Professional development guides: resume writing, essay crafting, and email etiquette",
        url: "/dream-hive-resources",
        icon: <Briefcase className="w-5 h-5" />,
        color: "#7C3AED",
        isInternal: true
      },
      {
        id: 27,
        title: "Career Reel Resources",
        description: "Job hunting tools: tracking sheets, resume guides, and career development resources",
        url: "/career-reel-resources",
        icon: <Users className="w-5 h-5" />,
        color: "#DC2626",
        isInternal: true
      }
    ],
    "📝 Exam Preparation": [
      {
        id: 3,
        title: "BECE PASCO",
        description: "BECE past questions",
        url: "https://emmadeeofficial.gumroad.com/l/becepasco",
        icon: <FileText className="w-5 h-5" />,
        color: "#34C759"
      },
      {
        id: 11,
        title: "BECE Pasco 2",
        description: "Alternative BECE past questions database",
        url: "https://www.becepastquestions.com/",
        icon: <FileText className="w-5 h-5" />,
        color: "#7C3AED",
        embedStrategy: 'iframe',
        customScripts: true
      },
      {
        id: 12,
        title: "BECE Pasco Via USSD",
        description: "Access past questions directly on your mobile phone!",
        url: "ussd://dial",
        icon: <Smartphone className="w-5 h-5" />,
        color: "#FF9500",
        isUSSD: true
      },
      {
        id: 4,
        title: "JHS MOCKS",
        description: "JHS mock examinations",
        url: "https://emmadeeofficial.gumroad.com/l/jhsmocks",
        icon: <FileText className="w-5 h-5" />,
        color: "#FF9500"
      }
    ],
    "🧮 STEM Tools": [
      {
        id: 5,
        title: "QWEN Maths",
        description: "AI maths problem solver",
        url: "https://qwen-qwen2-math-demo.hf.space",
        icon: <Calculator className="w-5 h-5" />,
        color: "#5856D6"
      }
    ],
    "🌍 Language & Communication": [
      {
        id: 6,
        title: "KHAYA Translator",
        description: "AI language translator",
        url: "https://translate.ghananlp.org/",
        icon: <Languages className="w-5 h-5" />,
        color: "#AF52DE"
      },
      {
        id: 18,
        title: "Cambridge Dictionary",
        description: "Comprehensive English dictionary with definitions, pronunciation, and examples",
        url: "https://dictionary.cambridge.org/",
        icon: <Book className="w-5 h-5" />,
        color: "#0066CC",
        embedStrategy: 'iframe'
      }
    ],
    "💰 Financial Literacy": [
      {
        id: 8,
        title: "Khan Academy Financial Literacy",
        description: "Learn personal finance and money management",
        url: "https://www.khanacademy.org/college-careers-more/financial-literacy",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#00C896",
        embedStrategy: 'smart',
        alternativeUrls: [
          "https://www.investopedia.com/financial-literacy-4776932",
          "https://www.practicalmoneyskills.com/",
          "https://www.jumpstart.org/",
          "https://www.mymoney.gov/"
        ],
        proxyUrls: [
          "https://web.archive.org/web/20240101000000*/https://www.khanacademy.org/college-careers-more/financial-literacy"
        ]
      },
      {
        id: 28,
        title: "Personal Finance Basics",
        description: "Essential guide to managing your money and building financial security",
        url: "https://drive.google.com/file/d/1Sg8I986nRXGfk3Ir1Eyx6aDyw6F4E6lz/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#059669",
        embedStrategy: 'iframe'
      },
      {
        id: 29,
        title: "Budgeting and Saving",
        description: "Learn how to create budgets and develop smart saving habits",
        url: "https://drive.google.com/file/d/1dwEaBuMyCFvmt0D8go44SpZTxq-PiJUN/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#0EA5E9",
        embedStrategy: 'iframe'
      },
      {
        id: 30,
        title: "Investment Fundamentals",
        description: "Introduction to investing and growing your wealth over time",
        url: "https://drive.google.com/file/d/1wehgmwts4fLxPkVIgjXSDeXNOPMtzFIP/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#8B5CF6",
        embedStrategy: 'iframe'
      },
      {
        id: 31,
        title: "Credit and Debt Management",
        description: "Understanding credit scores, loans, and responsible debt management",
        url: "https://drive.google.com/file/d/1tDhpCsr36husIUKf-OIfUWZZ6GuuAGEh/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#F59E0B",
        embedStrategy: 'iframe'
      },
      {
        id: 32,
        title: "Financial Planning for Students",
        description: "Money management strategies specifically designed for students",
        url: "https://drive.google.com/file/d/11M0ZPnV5OLqRPoqPBoDDcuAJFE11u6QC/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#EF4444",
        embedStrategy: 'iframe'
      },
      {
        id: 33,
        title: "Money Smart Links",
        description: "300+ comprehensive financial education websites and resources directory",
        url: "/money-smart-links",
        icon: <Globe className="w-5 h-5" />,
        color: "#059669",
        isInternal: true
      }
    ],
    "💼 Life Skills & Career": [
      {
        id: 7,
        title: "Advice from Successful People",
        description: "Commencement speeches from leaders",
        url: "/advice-speeches",
        icon: <Users className="w-5 h-5" />,
        color: "#FF6B35",
        isInternal: true
      },
      {
        id: 9,
        title: "Business Skills Chat",
        description: "AI-powered business skills development",
        url: "https://www.nfx.com/chat",
        icon: <Briefcase className="w-5 h-5" />,
        color: "#1E40AF",
        embedStrategy: 'smart',
        alternativeUrls: [
          "https://www.coursera.org/browse/business",
          "https://www.edx.org/learn/business",
          "https://www.futurelearn.com/subjects/business-and-management-courses",
          "https://alison.com/courses/business"
        ],
        proxyUrls: [
          "https://web.archive.org/web/20240101000000*/https://www.nfx.com/chat"
        ]
      },
      {
        id: 10,
        title: "Product Creation Chat",
        description: "Learn product development and creation",
        url: "https://www.lennybot.com/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#F59E0B"
      }
    ],
    "🎨 Creative Tools": [
      {
        id: 13,
        title: "AI Comic Factory",
        description: "Create amazing comics and stories with AI - unleash your creativity!",
        url: "https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory",
        icon: <Palette className="w-5 h-5" />,
        color: "#E91E63",
        openInNewTab: true
      }
    ],
    "💻 Coding": [
      {
        id: 14,
        title: "LlamaCoder",
        description: "AI-powered coding assistant - learn programming with AI guidance!",
        url: "https://llamacoder.together.ai/",
        icon: <Code className="w-5 h-5" />,
        color: "#10B981",
        embedStrategy: 'iframe'
      },
      {
        id: 15,
        title: "Bolt.new",
        description: "Build and deploy full-stack web apps instantly with AI!",
        url: "https://bolt.new/",
        icon: <Zap className="w-5 h-5" />,
        color: "#F59E0B",
        embedStrategy: 'iframe'
      },
      {
        id: 16,
        title: "Lovable",
        description: "Create beautiful web applications with AI-powered development!",
        url: "https://lovable.dev/",
        icon: <Heart className="w-5 h-5" />,
        color: "#EC4899",
        embedStrategy: 'iframe'
      },
      {
        id: 23,
        title: "AI.dev",
        description: "AI-powered development platform for building applications with artificial intelligence!",
        url: "https://ai.dev/",
        icon: <Bot className="w-5 h-5" />,
        color: "#6366F1",
        embedStrategy: 'iframe'
      },
      {
        id: 24,
        title: "Cursor",
        description: "AI-powered code editor that helps you write code faster and smarter!",
        url: "https://cursor.com/",
        icon: <MousePointer className="w-5 h-5" />,
        color: "#000000",
        embedStrategy: 'iframe'
      },
      {
        id: 25,
        title: "Windsurf",
        description: "Advanced AI coding assistant for seamless development experience!",
        url: "https://windsurf.com/",
        icon: <Wind className="w-5 h-5" />,
        color: "#0EA5E9",
        embedStrategy: 'iframe'
      }
    ]
  };

  // Flatten all resources for backward compatibility
  const resources: Resource[] = Object.values(resourceCategories).flat();

  // Smart loading simulation effect
  useEffect(() => {
    if (isLoading && selectedResource?.embedStrategy === 'smart') {
      setSmartLoadingPhase('connecting');
      setLoadingProgress(0);

      // Simulate realistic loading phases
      const phases = [
        { phase: 'connecting', duration: 1500, progress: 25 },
        { phase: 'loading', duration: 2000, progress: 75 },
        { phase: 'error', duration: 1000, progress: 100 }
      ];

      let currentPhaseIndex = 0;

      const runPhase = () => {
        if (currentPhaseIndex < phases.length) {
          const currentPhase = phases[currentPhaseIndex];
          setSmartLoadingPhase(currentPhase.phase as any);

          // Animate progress
          let progress = loadingProgress;
          const progressInterval = setInterval(() => {
            progress += 2;
            setLoadingProgress(Math.min(progress, currentPhase.progress));

            if (progress >= currentPhase.progress) {
              clearInterval(progressInterval);
              currentPhaseIndex++;

              setTimeout(() => {
                if (currentPhaseIndex < phases.length) {
                  runPhase();
                } else {
                  // Show alternatives after loading simulation
                  setIframeError(true);
                  setShowAlternatives(true);
                  setIsLoading(false);
                }
              }, currentPhase.duration);
            }
          }, 50);
        }
      };

      runPhase();
    }
  }, [isLoading, selectedResource]);

  const handleResourceClick = (resource: Resource) => {
    // Handle USSD cards with special modal
    if (resource.isUSSD) {
      setSelectedResource(resource);
      return;
    }

    // Handle resources that should open in new tab
    if (resource.openInNewTab) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (resource.isInternal) {
      navigate(resource.url);
    } else if (resource.embedStrategy === 'smart') {
      // Use smart loading strategy for Financial Literacy and Business Skills Chat
      setIsLoading(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false);
      setSelectedResource(resource);
    } else {
      // Regular iframe loading for all other resources
      setIsLoading(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false);
      setSelectedResource(resource);
    }
  };

  const handleBack = () => {
    setSelectedResource(null);
    setIsLoading(false);
    setIframeError(false);
    setCurrentUrlIndex(0);
    setShowAlternatives(false);
    setLoadingProgress(0);
    setSmartLoadingPhase('connecting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUSSDDial = () => {
    const ussdCode = '*790*700#';

    // Try multiple methods to open the phone app with the USSD code
    try {
      // Method 1: tel: protocol with USSD code (works on most mobile browsers)
      window.location.href = `tel:${encodeURIComponent(ussdCode)}`;
    } catch (error) {
      try {
        // Method 2: Direct tel link
        window.open(`tel:${ussdCode}`, '_self');
      } catch (error2) {
        try {
          // Method 3: Create a temporary link and click it
          const link = document.createElement('a');
          link.href = `tel:${ussdCode}`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error3) {
          // Fallback: Show alert with instructions
          alert(`Please dial ${ussdCode} on your phone to access BECE past questions.`);
        }
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
    setSmartLoadingPhase('success');

    // Inject custom scripts for BECE Past Questions to remove ads and unwanted sections
    if (selectedResource?.customScripts && iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (iframeDoc) {
          // Create and inject custom CSS to hide unwanted elements
          const style = iframeDoc.createElement('style');
          style.textContent = `
            /* NUCLEAR FOOTER REMOVAL - Based on actual website structure */
            footer, .footer, #footer, [class*="footer"], [id*="footer"],
            [class*="Footer"], [id*="Footer"], .site-footer, #site-footer,
            .page-footer, #page-footer, .main-footer, #main-footer,
            .website-footer, #website-footer, .bottom-footer, #bottom-footer,
            .footer-section, .footer-content, .footer-wrapper, .footer-container,
            .footer-area, .footer-widget, .footer-info, .footer-links,
            .copyright, .copyright-text, .copyright-info, .copyright-notice,
            [class*="copyright"], [id*="copyright"], .site-info, .site-credits,
            /* Specific to becepastquestions.com */
            .site-footer-wrapper, .footer-widgets, .footer-bottom,
            .footer-copyright, .site-info-wrapper {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
              overflow: hidden !important;
            }

            /* NUCLEAR AD BLOCKING - Based on actual website analysis */
            .ad, .ads, .advertisement, .advert, .adsense, .google-ads,
            [class*="ad-"], [class*="ads-"], [class*="advert"], [class*="banner"],
            [id*="ad-"], [id*="ads-"], [id*="advert"], [id*="banner"],
            .sidebar-ads, .header-ads, .content-ads, .popup-ad, .inline-ad,
            .sponsored, .promotion, .promo, [class*="sponsor"], [class*="promo"],
            iframe[src*="googlesyndication"], iframe[src*="doubleclick"],
            iframe[src*="googleadservices"], iframe[src*="amazon-adsystem"],
            iframe[src*="adsystem"], .google-auto-placed, .adsbygoogle,
            ins.adsbygoogle, .adsbox, .ad-container, .ad-wrapper, .ad-space,
            .advertisement-container, .ads-container, .banner-container,
            /* Specific ad patterns found on becepastquestions.com */
            div[style*="height: required"], .sticky-sidebar, .advertisment,
            .advertisement-section, [class*="advertisment"], [id*="advertisment"],
            /* Facebook tracking pixel */
            img[src*="facebook.com/tr"], noscript img[src*="facebook.com"],
            /* Generic ad tracking */
            [src*="googletagmanager"], [src*="google-analytics"],
            script[src*="ads"], script[src*="adsystem"],
            /* Ad click tracking */
            [onclick*="Ad Clicks"], [onclick*="Ad Views"],
            /* Newsletter and subscription boxes */
            .newsletter-signup, .email-subscription, .subscribe-box {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
              overflow: hidden !important;
            }

            /* NUCLEAR DISTRACTION REMOVAL - Based on website analysis */
            .recent, .popular, .trending, .related, .suggestions, .recommended,
            [class*="recent"], [class*="popular"], [class*="trending"],
            [class*="related"], [class*="suggest"], [class*="recommend"],
            .sidebar-recent, .sidebar-popular, .widget-recent, .widget-popular,
            .recent-posts, .popular-posts, .related-posts, .more-posts,
            .you-may-like, .similar-content, .other-articles,
            /* Specific to becepastquestions.com sidebar */
            .sidebar, .widget-area, .secondary, aside,
            h3:contains("Recent popular post"), h3:contains("ADVERTISMENT"),
            h3:contains("Social Media"), h3:contains("Quick Links"),
            h3:contains("Newsletter"), h3:contains("Recent Posts"),
            /* Remove entire sidebar sections */
            .sidebar-wrapper, .widget-wrapper, .sidebar-content {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
            }

            /* BRUTE FORCE SOCIAL MEDIA REMOVAL */
            .social-share, .share-buttons, .social-media, .social-icons,
            [class*="social"], [class*="share"], .fb-like, .twitter-share,
            .addthis, .sharethis, .social-widget, .share-widget,
            .facebook-share, .twitter-share, .linkedin-share, .whatsapp-share,
            .social-follow, .follow-us, .social-links {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }

            /* BRUTE FORCE NEWSLETTER/SIGNUP REMOVAL */
            .newsletter, .subscribe, .subscription, .email-signup, .signup-form,
            [class*="newsletter"], [class*="subscribe"], [class*="signup"],
            .email-capture, .lead-magnet, .opt-in, .mailing-list {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }

            /* BRUTE FORCE POPUP/MODAL REMOVAL */
            .modal, .popup, .overlay, [class*="modal"], [class*="popup"],
            .lightbox, .dialog, .alert, .notification, .toast,
            .cookie-notice, .cookie-banner, .gdpr-notice, .privacy-notice,
            [class*="cookie"], [class*="gdpr"], [class*="privacy"],
            .consent-banner, .privacy-banner, .terms-notice {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
            }

            /* BRUTE FORCE SIDEBAR REMOVAL */
            .sidebar, .side-bar, #sidebar, #side-bar, .widget-area,
            .secondary, .aside, aside, .complementary,
            [class*="sidebar"], [id*="sidebar"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }

            /* BRUTE FORCE NAVIGATION CLEANUP */
            .breadcrumb, .breadcrumbs, .nav-breadcrumb, .page-breadcrumb,
            .pagination, .page-numbers, .nav-links, .post-navigation {
              display: none !important;
            }

            /* CLEAN LAYOUT ENFORCEMENT */
            body {
              margin: 0 !important;
              padding: 10px !important;
              background: #ffffff !important;
              overflow-x: hidden !important;
            }

            /* MAIN CONTENT OPTIMIZATION */
            .main, .content, .container, .wrapper, main, article,
            .post-content, .entry-content, .page-content, .single-content {
              max-width: 100% !important;
              margin: 0 auto !important;
              padding: 15px !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }

            /* FORCE HIDE ANY REMAINING BOTTOM ELEMENTS */
            body > *:last-child:not(.main):not(.content):not(.container):not(.wrapper):not(main):not(article) {
              display: none !important;
            }

            /* NUCLEAR OPTION - Hide elements at bottom of page */
            [style*="position: fixed"][style*="bottom"],
            [style*="position: absolute"][style*="bottom"] {
              display: none !important;
            }
          `;

          iframeDoc.head.appendChild(style);

          // Also inject JavaScript to continuously remove ads that might load dynamically
          const script = iframeDoc.createElement('script');
          script.textContent = `
            (function() {
              // NUCLEAR ELEMENT REMOVAL FUNCTION - Enhanced for becepastquestions.com
              function removeUnwantedElements() {
                const selectors = [
                  // FOOTER NUCLEAR REMOVAL
                  'footer', '.footer', '#footer', '[class*="footer"]', '[id*="footer"]',
                  '[class*="Footer"]', '[id*="Footer"]', '.site-footer', '#site-footer',
                  '.page-footer', '#page-footer', '.main-footer', '#main-footer',
                  '.website-footer', '#website-footer', '.bottom-footer', '#bottom-footer',
                  '.footer-section', '.footer-content', '.footer-wrapper', '.footer-container',
                  '.footer-area', '.footer-widget', '.footer-info', '.footer-links',
                  '.copyright', '.copyright-text', '.copyright-info', '.copyright-notice',
                  '[class*="copyright"]', '[id*="copyright"]', '.site-info', '.site-credits',
                  '.site-footer-wrapper', '.footer-widgets', '.footer-bottom', '.footer-copyright',

                  // AD BRUTE FORCE
                  '.ad', '.ads', '.advertisement', '.advert', '.adsense', '.google-ads',
                  '[class*="ad-"]', '[class*="ads-"]', '[class*="advert"]', '[class*="banner"]',
                  '[id*="ad-"]', '[id*="ads-"]', '[id*="advert"]', '[id*="banner"]',
                  '.sidebar-ads', '.header-ads', '.content-ads', '.popup-ad', '.inline-ad',
                  '.sponsored', '.promotion', '.promo', '[class*="sponsor"]', '[class*="promo"]',
                  'iframe[src*="googlesyndication"]', 'iframe[src*="doubleclick"]',
                  'iframe[src*="googleadservices"]', 'iframe[src*="amazon-adsystem"]',
                  'iframe[src*="adsystem"]', '.google-auto-placed', '.adsbygoogle',
                  'ins.adsbygoogle', '.adsbox', '.ad-container', '.ad-wrapper', '.ad-space',
                  '.advertisement-container', '.ads-container', '.banner-container',

                  // DISTRACTION NUCLEAR REMOVAL
                  '.recent', '.popular', '.trending', '.related', '.suggestions', '.recommended',
                  '[class*="recent"]', '[class*="popular"]', '[class*="trending"]',
                  '[class*="related"]', '[class*="suggest"]', '[class*="recommend"]',
                  '.sidebar-recent', '.sidebar-popular', '.widget-recent', '.widget-popular',
                  '.recent-posts', '.popular-posts', '.related-posts', '.more-posts',
                  '.you-may-like', '.similar-content', '.other-articles',
                  // Specific sidebar elements from becepastquestions.com
                  '.sidebar', '.widget-area', '.secondary', 'aside',
                  '.sidebar-wrapper', '.widget-wrapper', '.sidebar-content',

                  // SOCIAL MEDIA BRUTE FORCE
                  '.social-share', '.share-buttons', '.social-media', '.social-icons',
                  '[class*="social"]', '[class*="share"]', '.fb-like', '.twitter-share',
                  '.addthis', '.sharethis', '.social-widget', '.share-widget',
                  '.facebook-share', '.twitter-share', '.linkedin-share', '.whatsapp-share',
                  '.social-follow', '.follow-us', '.social-links',

                  // NEWSLETTER BRUTE FORCE
                  '.newsletter', '.subscribe', '.subscription', '.email-signup', '.signup-form',
                  '[class*="newsletter"]', '[class*="subscribe"]', '[class*="signup"]',
                  '.email-capture', '.lead-magnet', '.opt-in', '.mailing-list',

                  // POPUP BRUTE FORCE
                  '.modal', '.popup', '.overlay', '[class*="modal"]', '[class*="popup"]',
                  '.lightbox', '.dialog', '.alert', '.notification', '.toast',
                  '.cookie-notice', '.cookie-banner', '.gdpr-notice', '.privacy-notice',
                  '[class*="cookie"]', '[class*="gdpr"]', '[class*="privacy"]',
                  '.consent-banner', '.privacy-banner', '.terms-notice',

                  // SIDEBAR BRUTE FORCE
                  '.sidebar', '.side-bar', '#sidebar', '#side-bar', '.widget-area',
                  '.secondary', '.aside', 'aside', '.complementary',
                  '[class*="sidebar"]', '[id*="sidebar"]',

                  // NAVIGATION BRUTE FORCE
                  '.breadcrumb', '.breadcrumbs', '.nav-breadcrumb', '.page-breadcrumb',
                  '.pagination', '.page-numbers', '.nav-links', '.post-navigation'
                ];

                // NUCLEAR REMOVAL - Multiple aggressive methods
                selectors.forEach(selector => {
                  try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                      if (el) {
                        // Method 1: Hide completely
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.opacity = '0';
                        el.style.height = '0';
                        el.style.width = '0';
                        el.style.margin = '0';
                        el.style.padding = '0';
                        el.style.overflow = 'hidden';

                        // Method 2: Move off-screen
                        el.style.position = 'absolute';
                        el.style.left = '-9999px';
                        el.style.top = '-9999px';
                        el.style.zIndex = '-9999';

                        // Method 3: Disable interactions
                        el.style.pointerEvents = 'none';
                        el.style.userSelect = 'none';
                        el.setAttribute('aria-hidden', 'true');

                        // Method 4: Remove from DOM
                        try {
                          el.parentNode && el.parentNode.removeChild(el);
                        } catch (e) {
                          el.remove();
                        }
                      }
                    });
                  } catch (e) {
                    // Ignore errors for invalid selectors
                  }
                });

                // ADDITIONAL AGGRESSIVE TECHNIQUES
                // Remove elements by text content
                const textPatterns = [
                  'ADVERTISMENT', 'Recent popular post', 'Social Media',
                  'Quick Links', 'Newsletter', 'Recent Posts', 'Ad Clicks',
                  'Ad Views', 'Copyright at 2025', 'All Rights Reserved'
                ];

                textPatterns.forEach(pattern => {
                  try {
                    const xpath = \`//\*[contains(text(), '\${pattern}')]\`;
                    const result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (let i = 0; i < result.snapshotLength; i++) {
                      const element = result.snapshotItem(i);
                      if (element && element.parentNode) {
                        // Remove the parent container too
                        const parent = element.closest('div, section, aside, footer, header');
                        if (parent) {
                          parent.remove();
                        } else {
                          element.remove();
                        }
                      }
                    }
                  } catch (e) {
                    // Ignore XPath errors
                  }
                });

                // Remove tracking scripts
                const scripts = document.querySelectorAll('script');
                scripts.forEach(script => {
                  const src = script.src || '';
                  const content = script.textContent || '';
                  if (src.includes('facebook.com') ||
                      src.includes('google-analytics') ||
                      src.includes('googletagmanager') ||
                      content.includes('Ad Clicks') ||
                      content.includes('Ad Views')) {
                    script.remove();
                  }
                });

                // NUCLEAR OPTION: Remove last child if it looks like footer
                try {
                  const lastChild = document.body.lastElementChild;
                  if (lastChild && (
                    lastChild.tagName.toLowerCase() === 'footer' ||
                    lastChild.className.toLowerCase().includes('footer') ||
                    lastChild.id.toLowerCase().includes('footer') ||
                    lastChild.className.toLowerCase().includes('copyright') ||
                    lastChild.textContent.toLowerCase().includes('copyright') ||
                    lastChild.textContent.toLowerCase().includes('all rights reserved')
                  )) {
                    lastChild.remove();
                  }
                } catch (e) {
                  // Ignore errors
                }

                // BRUTE FORCE: Remove elements with footer-like text content
                try {
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    const text = el.textContent.toLowerCase();
                    if (text.includes('copyright') ||
                        text.includes('all rights reserved') ||
                        text.includes('terms of service') ||
                        text.includes('privacy policy') ||
                        (text.includes('©') && text.length < 200)) {
                      el.style.display = 'none';
                      el.remove();
                    }
                  });
                } catch (e) {
                  // Ignore errors
                }
              }

              // AGGRESSIVE CLEANUP SCHEDULE
              // Remove elements immediately
              removeUnwantedElements();

              // Remove elements after DOM is loaded
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeUnwantedElements);
              }

              // Remove after window load
              window.addEventListener('load', removeUnwantedElements);

              // Continuously monitor for new ads/unwanted content
              const observer = new MutationObserver(function(mutations) {
                let shouldClean = false;
                mutations.forEach(function(mutation) {
                  if (mutation.addedNodes.length > 0) {
                    shouldClean = true;
                  }
                });
                if (shouldClean) {
                  setTimeout(removeUnwantedElements, 50);
                }
              });

              observer.observe(document.body, {
                childList: true,
                subtree: true
              });

              // NUCLEAR INTERVALS - Extremely aggressive cleanup
              setInterval(removeUnwantedElements, 500);   // Every 0.5 seconds
              setInterval(removeUnwantedElements, 2000);  // Every 2 seconds
              setInterval(removeUnwantedElements, 5000);  // Every 5 seconds
              setInterval(removeUnwantedElements, 10000); // Every 10 seconds

              // EVENT-BASED CLEANUP
              window.addEventListener('scroll', function() {
                setTimeout(removeUnwantedElements, 50);
              });

              window.addEventListener('resize', function() {
                setTimeout(removeUnwantedElements, 100);
              });

              window.addEventListener('focus', function() {
                setTimeout(removeUnwantedElements, 100);
              });

              // ADDITIONAL NUCLEAR TECHNIQUES
              // Block new script injections
              const originalAppendChild = Node.prototype.appendChild;
              Node.prototype.appendChild = function(child) {
                if (child.tagName === 'SCRIPT') {
                  const src = child.src || '';
                  const content = child.textContent || '';
                  if (src.includes('ads') ||
                      src.includes('facebook.com') ||
                      src.includes('google-analytics') ||
                      content.includes('Ad Clicks') ||
                      content.includes('Ad Views')) {
                    return child; // Block the script
                  }
                }
                return originalAppendChild.call(this, child);
              };

              // Block new iframe injections for ads
              const originalCreateElement = document.createElement;
              document.createElement = function(tagName) {
                const element = originalCreateElement.call(this, tagName);
                if (tagName.toLowerCase() === 'iframe') {
                  const originalSetAttribute = element.setAttribute;
                  element.setAttribute = function(name, value) {
                    if (name === 'src' && (
                        value.includes('googlesyndication') ||
                        value.includes('doubleclick') ||
                        value.includes('adsystem'))) {
                      return; // Block ad iframes
                    }
                    return originalSetAttribute.call(this, name, value);
                  };
                }
                return element;
              };
            })();
          `;

          iframeDoc.body.appendChild(script);

          console.log('Custom scripts injected for BECE Past Questions - ads and unwanted sections blocked');
        }
      } catch (error) {
        console.log('Could not inject custom scripts (cross-origin restriction):', error);
        // This is expected for cross-origin iframes, but we still try
      }
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
    setShowAlternatives(true);
  };

  const handleTryAlternative = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenOriginal = () => {
    if (selectedResource) {
      window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // If a USSD resource is selected, show the USSD modal
  if (selectedResource?.isUSSD) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Header with Back Button */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-900 via-orange-800 to-red-900 py-4 sm:py-5 shadow-2xl border-b border-orange-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setSelectedResource(null)}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-orange-700/70 hover:bg-orange-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-orange-500/50 hover:border-orange-400/70 flex-shrink-0 ring-2 ring-orange-500/20 hover:ring-orange-400/30"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                📱 BECE Pasco Via USSD
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-400/30 relative overflow-hidden mt-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Content */}
          <div className="relative z-10">

            {/* Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                📱 BECE Pasco Via USSD
              </h2>
              <p className="text-orange-100 text-sm">
                Access past questions directly on your mobile phone!
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  🎉 Free Download Available!
                </h3>
                <p className="text-orange-100 text-sm mb-4">
                  Get BECE past questions sent directly to your phone via SMS
                </p>

                {/* USSD Code Display - Clickable */}
                <button
                  onClick={handleUSSDDial}
                  className="w-full bg-black/30 hover:bg-black/40 rounded-lg p-4 mb-4 transition-all duration-200 border border-orange-500/30 hover:border-orange-400/50"
                >
                  <p className="text-orange-200 text-sm mb-2">Tap to dial this code on your mobile phone:</p>
                  <div className="text-3xl font-bold text-white tracking-wider mb-2">
                    *790*700#
                  </div>
                  <div className="text-xs text-orange-300 flex items-center justify-center gap-1">
                    <span>📞</span>
                    <span>Tap to open phone app</span>
                  </div>
                </button>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-300 font-bold">1.</span>
                    <span className="text-orange-100 text-sm">Open your phone's dialer</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-300 font-bold">2.</span>
                    <span className="text-orange-100 text-sm">Type <strong>*790*700#</strong> and press call</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-300 font-bold">3.</span>
                    <span className="text-orange-100 text-sm">You'll receive an <strong>SMS message</strong> with download link</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-300 font-bold">4.</span>
                    <span className="text-orange-100 text-sm">Use the <strong>password</strong> in the SMS to open the files</span>
                  </div>
                </div>

                {/* SMS Info Box */}
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📱</span>
                    <span className="text-green-200 font-semibold text-sm">SMS Delivery</span>
                  </div>
                  <p className="text-green-100 text-xs">
                    You'll receive a text message with:
                  </p>
                  <ul className="text-green-100 text-xs mt-1 space-y-1">
                    <li>• Download link for BECE past questions</li>
                    <li>• Password to unlock the files</li>
                    <li>• Instructions for easy access</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-orange-100 text-sm mb-4">
                ✨ <strong>Dial now!</strong> Get your SMS with download link and password
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleUSSDDial}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  📞 Dial *790*700# Now
                </button>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30"
                >
                  Close
                </button>
              </div>
              <p className="text-orange-200 text-xs mt-3">
                💡 <strong>Tip:</strong> Save the SMS for future access to your files
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a resource is selected, show the iframe view - Full page without footer
  if (selectedResource) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Header - Enhanced Purple Back Button */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0 ring-2 ring-purple-500/20 hover:ring-purple-400/30"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedResource.title}
              </h1>

              {/* Quick access button for smart resources */}
              {selectedResource.embedStrategy === 'smart' && (
                <button
                  onClick={handleOpenOriginal}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Open Original</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area - Full Screen */}
        <div className="absolute inset-0 pt-20 sm:pt-24">
          {!iframeError && selectedResource.embedStrategy !== 'smart' ? (
            <>
              <iframe
                ref={iframeRef}
                src={selectedResource.url}
                className="w-full h-full border-0"
                title={selectedResource.title}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-modals"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />

              {/* Regular Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-medium">Loading {selectedResource.title}...</p>
                    <p className="text-gray-300 text-sm mt-1">Please wait while we load the resource</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Smart Loading or Error State */
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
              {isLoading ? (
                /* Smart Loading Animation */
                <div className="text-center max-w-md">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {smartLoadingPhase === 'connecting' && 'Connecting to External Resource...'}
                    {smartLoadingPhase === 'loading' && 'Loading Content...'}
                    {smartLoadingPhase === 'error' && 'Connection Restricted'}
                  </h3>

                  <p className="text-gray-300 mb-4">
                    {smartLoadingPhase === 'connecting' && 'Establishing secure connection'}
                    {smartLoadingPhase === 'loading' && 'Fetching educational content'}
                    {smartLoadingPhase === 'error' && 'This resource blocks iframe embedding'}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-400">{loadingProgress}% complete</p>
                </div>
              ) : (
                /* Alternative Resources Display */
                <div className="text-center max-w-4xl">
                  <div className="mb-8">
                    <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Resource Access Alternative</h3>
                    <p className="text-gray-300 mb-6">
                      {selectedResource.title} cannot be embedded directly. Choose from these excellent alternatives:
                    </p>
                  </div>

                  {/* Alternative Resources Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {/* Original Resource */}
                    <button
                      onClick={handleOpenOriginal}
                      className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-8 h-8 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Original Resource</h4>
                      <p className="text-sm opacity-90">Open {selectedResource.title} in new tab</p>
                    </button>

                    {/* Alternative Resources */}
                    {selectedResource.alternativeUrls?.slice(0, 5).map((url, index) => (
                      <button
                        key={index}
                        onClick={() => handleTryAlternative(url)}
                        className="p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <BookOpen className="w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Alternative {index + 1}</h4>
                        <p className="text-sm opacity-90">Similar learning resource</p>
                      </button>
                    ))}
                  </div>

                  <p className="text-sm text-gray-400">
                    All resources open in new tabs for the best learning experience
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleMainBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Students Hub
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Categorized Resources */}
          <div className="space-y-8">
            {Object.entries(resourceCategories).map(([categoryName, categoryResources], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {categoryName}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                  <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    {categoryResources.length} {categoryResources.length === 1 ? 'tool' : 'tools'}
                  </span>
                </div>

                {/* Category Resources Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {categoryResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      className="group"
                    >
                      <button
                        onClick={() => handleResourceClick(resource)}
                        className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                      >
                        {/* Smart link indicator */}
                        {resource.embedStrategy === 'smart' && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500/80 rounded-full flex items-center justify-center">
                            <AlertCircle size={12} className="text-white" />
                          </div>
                        )}

                        {/* New tab indicator */}
                        {resource.openInNewTab && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-green-500/80 rounded-full flex items-center justify-center">
                            <ExternalLink size={12} className="text-white" />
                          </div>
                        )}

                        {/* Icon */}
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                          style={{ backgroundColor: resource.color }}
                        >
                          {resource.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
                          {resource.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-300 leading-tight">
                          {resource.description}
                        </p>

                        {/* Smart resource indicator */}
                        {resource.embedStrategy === 'smart' && (
                          <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>Smart Access</span>
                          </div>
                        )}

                        {/* New tab indicator text */}
                        {resource.openInNewTab && (
                          <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                            <ExternalLink size={12} />
                            <span>Opens in New Tab</span>
                          </div>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Footer Message */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-300 mb-2">
              Tap any resource to open it within Students Hub
            </p>
            <div className="flex items-center justify-center text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <AlertCircle size={12} className="text-blue-400" />
                <span>Smart Access - Financial Literacy & Business Skills provide alternatives when blocked</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentsHubPage;

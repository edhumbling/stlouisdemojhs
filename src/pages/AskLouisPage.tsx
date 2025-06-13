import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

const AskLouisPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically inject the ElevenLabs widget script
    const scriptId = 'elevenlabs-convai-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      script.id = scriptId;
      document.body.appendChild(script);
    }
    // Cleanup: Optionally remove the widget when leaving the page
    return () => {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) widget.remove();
    };
  }, []);

  return (
    <div style={{width:'100vw',height:'100vh',background:'#fff',display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      <SEOHead
        title="Ask Louis AI Assistant | St. Louis Demonstration JHS"
        description="Chat with Louis, our AI assistant at St. Louis Demonstration JHS. Get instant answers about school information, admissions, academics, and student services through our intelligent voice assistant."
        keywords="AI assistant, Louis AI, school chatbot, voice assistant, student support, school information, AI help"
        url="/ask-louis"
        type="website"
        pageType="ai-search"
        useGalleryImages={true}
      />
      <div className="w-full bg-gradient-to-r from-green-400 via-green-300 to-yellow-300 shadow-md z-20">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-green-900 font-semibold text-base shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <ArrowLeft size={22} className="text-green-700" />
            <span>Back</span>
          </button>
        </div>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',width:'100vw',height:'calc(100vh - 56px)',paddingBottom:48}}>
        <div style={{width:'100%',display:'flex',justifyContent:'center',pointerEvents:'auto',minWidth:340}}>
          {/* ElevenLabs widget element */}
          <elevenlabs-convai agent-id="fAiPNUtMGChNGFI7nFy4"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default AskLouisPage;

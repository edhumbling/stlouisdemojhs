import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
    <div style={{width:'100vw',height:'100vh',overflow:'hidden',background:'#fff',display:'flex',flexDirection:'column'}}>
      <div style={{height:56,display:'flex',alignItems:'center',padding:'0 16px',background:'linear-gradient(90deg,#39e17a 60%,#ffe600 100%)',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',zIndex:2}}>
        <button onClick={()=>navigate(-1)} style={{background:'none',border:'none',display:'flex',alignItems:'center',cursor:'pointer',padding:0}}>
          <ArrowLeft size={28} style={{marginRight:8}} />
          <span style={{fontWeight:700,fontSize:18}}>Back</span>
        </button>
      </div>
      <div style={{flex:1,position:'relative',width:'100vw',height:'calc(100vh - 56px)',overflow:'hidden'}}>
        <div style={{position:'absolute',left:'50%',bottom:32,transform:'translateX(-50%)',zIndex:10}}>
          {/* ElevenLabs widget element */}
          <elevenlabs-convai agent-id="fAiPNUtMGChNGFI7nFy4"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default AskLouisPage;

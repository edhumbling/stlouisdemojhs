import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AskLouisPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{width:'100vw',height:'100vh',overflow:'hidden',background:'#fff',display:'flex',flexDirection:'column'}}>
      <div style={{height:56,display:'flex',alignItems:'center',padding:'0 16px',background:'linear-gradient(90deg,#39e17a 60%,#ffe600 100%)',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',zIndex:2}}>
        <button onClick={()=>navigate(-1)} style={{background:'none',border:'none',display:'flex',alignItems:'center',cursor:'pointer',padding:0}}>
          <ArrowLeft size={28} style={{marginRight:8}} />
          <span style={{fontWeight:700,fontSize:18}}>Back</span>
        </button>
      </div>
      <iframe
        src="https://elevenlabs.io/app/talk-to?agent_id=fAiPNUtMGChNGFI7nFy4"
        title="Ask Louis Anything"
        style={{flex:1,width:'100vw',border:'none',height:'calc(100vh - 56px)'}}
        allow="microphone;"
      />
    </div>
  );
};

export default AskLouisPage;

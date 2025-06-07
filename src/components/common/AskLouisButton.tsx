import React from 'react';
import { useNavigate } from 'react-router-dom';


const AskLouisButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/ask-louis')}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 10000,
        background: 'linear-gradient(135deg, #39e17a 60%, #ffe600 100%)',
        color: '#222',
        border: 'none',
        borderRadius: 32,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: 18,
        cursor: 'pointer',
        gap: 12
      }}
    >
      <span style={{fontSize:28,marginRight:4}}>💬</span>
      Ask Louis Anything...
    </button>
  );
};

export default AskLouisButton;

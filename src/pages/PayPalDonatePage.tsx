// import React from 'react'; // Already imported with useEffect
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';



import React, { useEffect } from 'react'; // Added useEffect

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();
  const hostedButtonId = 'ZNC2MMZK4TY8N';
  const payPalClientId = 'BAAhJVEsvYgBrqycVi7DVM7piK5vBXGK3eeyoR66Uxgw8nLrJTcbyzTXLct-3FupN-a0jHX9ksCUKUWEZo';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}&components=hosted-buttons&disable-funding=venmo&currency=USD`;
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.id = 'paypal-sdk-script'; // Add an ID to prevent duplicate scripts

    // Check if script already exists
    if (!document.getElementById(script.id)) {
      document.body.appendChild(script);
    }

    return () => {
      // Optional: Clean up the script when the component unmounts
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        // document.body.removeChild(existingScript); // Commented out: PayPal SDK might not like being removed and re-added frequently on navigation
      }
    };
  }, [payPalClientId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#fff' }}>
      <div className="w-full bg-gradient-to-r from-green-400 via-green-300 to-yellow-300 shadow-md z-20">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-green-900 font-semibold text-base shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <ArrowLeft size={22} className="text-green-700" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-semibold text-green-900 ml-4">Donate with PayPal</h1>
            {/* This div will be targeted by PayPal SDK to render the button */}
            <div 
              id={`paypal-hosted-button-${hostedButtonId}`}
              data-paypal-hosted-button-id={hostedButtonId}
              className="ml-4 mt-4"
            ></div>
        </div>
      </div>
      {/* The PayPal SDK will render its own payment flow (e.g., modal or new tab) */}
      {/* The iframe is no longer needed and has been removed. */}
      {/* The page will now primarily show the header and the PayPal button. */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '2rem' }}>
        {/* Content can be added here if needed, or this div can be styled as a placeholder area below the button */}
      </div>
    </div>
  );
};

export default PayPalDonatePage;

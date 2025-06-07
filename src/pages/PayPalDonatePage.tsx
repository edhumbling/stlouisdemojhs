import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Loader from 'lucide-react/dist/esm/icons/loader';

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const hostedButtonId = 'ZNC2MMZK4TY8N';
  const payPalClientId = 'BAAhJVEsvYgBrqycVi7DVM7piK5vBXGK3eeyoR66Uxgw8nLrJTcbyzTXLct-3FupN-a0jHX9ksCUKUWEZo';

  useEffect(() => {
    let isMounted = true;
    let script: HTMLScriptElement | null = null;

    const initializePayPal = () => {
      try {
        // @ts-ignore - PayPal types might not be available
        if (window.paypal && window.paypal.Buttons) {
          // @ts-ignore
          window.paypal.Buttons({
            createOrder: function(_data: any, actions: any) {
              return actions.order.create({
                purchase_units: [{
                  custom_id: hostedButtonId,
                }],
                application_context: {
                  shipping_preference: 'NO_SHIPPING'
                }
              });
            },
            onApprove: function(_data: any, actions: any) {
              return actions.order.capture().then(function(details: any) {
                // Handle successful payment
                console.log('Payment completed:', details);
              });
            },
            onError: function(err: any) {
              console.error('PayPal error:', err);
              if (isMounted) {
                setError('Failed to load PayPal. Please try again or use another payment method.');
                setIsLoading(false);
              }
            },
            onInit: function(_data: any, _actions: any) {
              if (isMounted) {
                setIsLoading(false);
              }
            }
          }).render(`#paypal-button-container`);
        } else {
          // PayPal script not loaded yet, try again
          setTimeout(initializePayPal, 500);
        }
      } catch (err) {
        console.error('Error initializing PayPal:', err);
        if (isMounted) {
          setError('Failed to initialize PayPal. Please refresh the page.');
          setIsLoading(false);
        }
      }
    };

    // Check if PayPal script is already loaded
    // @ts-ignore
    if (window.paypal) {
      initializePayPal();
    } else {
      // Load PayPal script dynamically
      script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}&currency=USD`;
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.id = 'paypal-sdk-script';
      
      script.onload = () => {
        if (isMounted) {
          initializePayPal();
        }
      };
      
      script.onerror = () => {
        if (isMounted) {
          setError('Failed to load PayPal. Please check your connection and try again.');
          setIsLoading(false);
        }
      };

      // Check if script already exists
      if (!document.getElementById(script.id)) {
        document.body.appendChild(script);
      } else if (isMounted) {
        // If script exists but we're still loading, try initializing
        initializePayPal();
      }
    }

    return () => {
      isMounted = false;
      // Don't remove the script as it might be used by other components
    };
  }, [payPalClientId, hostedButtonId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="ml-4 flex items-center">
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                alt="PayPal" 
                className="h-8 w-auto mr-3"
              />
              <h1 className="text-xl font-semibold text-white">Donate with PayPal</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Support Our School</h2>
            <p className="text-gray-600">Your donation helps us provide quality education</p>
          </div>

          {/* Loading State */}
          {isLoading && !error && (
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex items-center justify-center text-gray-500">
                <Loader className="animate-spin mr-2" size={20} />
                <span>Loading payment options...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          )}

          {/* PayPal Button Container */}
          <div id="paypal-button-container" className={`${isLoading || error ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 transition-opacity duration-300'}`}></div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Secure payment processed by PayPal</p>
            <div className="mt-2 flex items-center justify-center space-x-4">
              <span>💳</span>
              <span>🔒</span>
              <span>🔄</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayPalDonatePage;

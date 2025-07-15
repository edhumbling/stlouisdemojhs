import { useState, useCallback } from 'react';
import { paystackService, PaymentData } from '../services/paystackService';

interface UsePaystackReturn {
  isLoading: boolean;
  error: string | null;
  paymentUrl: string | null;
  initializePayment: (paymentData: PaymentData) => Promise<void>;
  verifyPayment: (reference: string) => Promise<boolean>;
  clearError: () => void;
  clearPaymentUrl: () => void;
}

export const usePaystack = (): UsePaystackReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearPaymentUrl = useCallback(() => {
    setPaymentUrl(null);
  }, []);

  const initializePayment = useCallback(async (paymentData: PaymentData) => {
    setIsLoading(true);
    setError(null);
    setPaymentUrl(null);

    try {
      // Validate required fields
      if (!paymentData.email || !paystackService.validateEmail(paymentData.email)) {
        throw new Error('Please provide a valid email address');
      }

      if (!paymentData.amount || paymentData.amount <= 0) {
        throw new Error('Please provide a valid amount');
      }

      // Initialize payment
      const response = await paystackService.initializePayment(paymentData);

      if (response.status && response.data.authorization_url) {
        setPaymentUrl(response.data.authorization_url);
        
        // Automatically redirect to payment page
        window.open(response.data.authorization_url, '_blank');
      } else {
        throw new Error(response.message || 'Failed to initialize payment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Payment initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyPayment = useCallback(async (reference: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await paystackService.verifyPayment(reference);
      
      if (response.status && response.data.status === 'success') {
        return true;
      } else {
        setError('Payment verification failed');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment verification failed';
      setError(errorMessage);
      console.error('Payment verification error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    paymentUrl,
    initializePayment,
    verifyPayment,
    clearError,
    clearPaymentUrl,
  };
};

export default usePaystack;

/**
 * Paystack Payment Service for St. Louis Demonstration JHS
 * Handles payment initialization, verification, and webhook processing
 */

export interface PaymentData {
  email: string;
  amount: number; // Amount in Ghana Cedis
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: {
    donor_name?: string;
    phone?: string;
    donation_type?: string;
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}

export interface PaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaymentVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
    };
  };
}

class PaystackService {
  private readonly baseURL = 'https://api.paystack.co';
  private readonly secretKey: string;
  private readonly publicKey: string;
  private readonly isProduction: boolean;

  constructor() {
    this.secretKey = import.meta.env.PAYSTACK_SECRET_KEY || '';
    this.publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
    this.isProduction = this.secretKey.startsWith('sk_live_');

    if (!this.secretKey) {
      console.error('Paystack secret key not found in environment variables');
      throw new Error('Paystack configuration missing');
    }

    if (!this.publicKey) {
      console.error('Paystack public key not found in environment variables');
      throw new Error('Paystack public key missing');
    }

    // Log environment status (without exposing keys)
    console.log(`Paystack initialized in ${this.isProduction ? 'PRODUCTION' : 'TEST'} mode`);
  }

  /**
   * Get public key for frontend usage
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Check if running in production mode
   */
  isProductionMode(): boolean {
    return this.isProduction;
  }

  /**
   * Generate a unique reference for the transaction
   */
  generateReference(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `STLOUIS_${timestamp}_${random}`;
  }

  /**
   * Initialize a payment transaction
   */
  async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const reference = paymentData.reference || this.generateReference();
      
      const payload = {
        email: paymentData.email,
        amount: Math.round(paymentData.amount * 100), // Convert to pesewas
        currency: paymentData.currency || 'GHS',
        reference,
        callback_url: paymentData.callback_url || `${window.location.origin}/donation-success`,
        metadata: {
          ...paymentData.metadata,
          school_name: 'St. Louis Demonstration JHS',
          donation_purpose: 'School Development Fund',
          custom_fields: [
            {
              display_name: 'School Name',
              variable_name: 'school_name',
              value: 'St. Louis Demonstration JHS'
            },
            {
              display_name: 'Donation Type',
              variable_name: 'donation_type',
              value: paymentData.metadata?.donation_type || 'General Donation'
            },
            ...(paymentData.metadata?.custom_fields || [])
          ]
        }
      };

      const response = await fetch(`${this.baseURL}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw new Error('Failed to initialize payment. Please try again.');
    }
  }

  /**
   * Verify a payment transaction
   */
  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    try {
      const response = await fetch(`${this.baseURL}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment. Please contact support.');
    }
  }

  /**
   * Create a payment page (for reusable links)
   */
  async createPaymentPage(pageData: {
    name: string;
    description: string;
    amount?: number; // Optional for variable amounts
    slug?: string;
    redirect_url?: string;
  }) {
    try {
      const payload = {
        name: pageData.name,
        description: pageData.description,
        amount: pageData.amount ? Math.round(pageData.amount * 100) : undefined,
        slug: pageData.slug,
        redirect_url: pageData.redirect_url || `${window.location.origin}/donation-success`,
        currency: 'GHS',
        custom_fields: [
          {
            display_name: 'Full Name',
            variable_name: 'full_name',
            type: 'text',
            required: true
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone_number',
            type: 'phone',
            required: false
          },
          {
            display_name: 'Message (Optional)',
            variable_name: 'message',
            type: 'text',
            required: false
          }
        ]
      };

      const response = await fetch(`${this.baseURL}/page`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating payment page:', error);
      throw new Error('Failed to create payment page.');
    }
  }

  /**
   * Get all transactions
   */
  async getTransactions(params?: {
    perPage?: number;
    page?: number;
    status?: 'failed' | 'success' | 'abandoned';
    from?: string;
    to?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.perPage) queryParams.append('perPage', params.perPage.toString());
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.from) queryParams.append('from', params.from);
      if (params?.to) queryParams.append('to', params.to);

      const response = await fetch(`${this.baseURL}/transaction?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions.');
    }
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number, currency: string = 'GHS'): string {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number (Ghana format)
   */
  validateGhanaPhone(phone: string): boolean {
    const phoneRegex = /^(\+233|0)[2-9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
}

// Export singleton instance
export const paystackService = new PaystackService();
export default paystackService;

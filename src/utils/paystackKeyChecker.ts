/**
 * Paystack Key Verification Utility
 * Checks if Paystack keys are properly configured and valid
 */

export interface KeyCheckResult {
  isConfigured: boolean;
  isProduction: boolean;
  publicKeyValid: boolean;
  secretKeyValid: boolean;
  errors: string[];
  warnings: string[];
}

export const checkPaystackKeys = (): KeyCheckResult => {
  const result: KeyCheckResult = {
    isConfigured: false,
    isProduction: false,
    publicKeyValid: false,
    secretKeyValid: false,
    errors: [],
    warnings: []
  };

  // Check if environment variables exist
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const secretKey = import.meta.env.PAYSTACK_SECRET_KEY;

  // Validate public key
  if (!publicKey) {
    result.errors.push('VITE_PAYSTACK_PUBLIC_KEY not found in environment variables');
  } else if (!publicKey.startsWith('pk_')) {
    result.errors.push('Invalid public key format. Should start with "pk_"');
  } else {
    result.publicKeyValid = true;
    
    // Check if it's a live key
    if (publicKey.startsWith('pk_live_')) {
      result.isProduction = true;
    } else if (publicKey.startsWith('pk_test_')) {
      result.warnings.push('Using test public key. Switch to live key for production.');
    }
  }

  // Validate secret key
  if (!secretKey) {
    result.errors.push('PAYSTACK_SECRET_KEY not found in environment variables');
  } else if (!secretKey.startsWith('sk_')) {
    result.errors.push('Invalid secret key format. Should start with "sk_"');
  } else {
    result.secretKeyValid = true;
    
    // Check if it's a live key
    if (secretKey.startsWith('sk_live_')) {
      if (!result.isProduction) {
        result.errors.push('Secret key is live but public key is not. Keys must match.');
      }
    } else if (secretKey.startsWith('sk_test_')) {
      if (result.isProduction) {
        result.errors.push('Public key is live but secret key is test. Keys must match.');
      }
      result.warnings.push('Using test secret key. Switch to live key for production.');
    }
  }

  // Validate key lengths (Paystack keys have specific lengths)
  if (publicKey && publicKey.length < 30) {
    result.errors.push('Public key appears to be too short');
  }
  
  if (secretKey && secretKey.length < 30) {
    result.errors.push('Secret key appears to be too short');
  }

  // Check if both keys are configured
  result.isConfigured = result.publicKeyValid && result.secretKeyValid && result.errors.length === 0;

  // Additional production checks
  if (result.isProduction) {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      result.warnings.push('Production keys should only be used with HTTPS');
    }
  }

  return result;
};

/**
 * Test Paystack API connectivity
 */
export const testPaystackConnection = async (): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> => {
  try {
    const secretKey = import.meta.env.PAYSTACK_SECRET_KEY;
    
    if (!secretKey) {
      return {
        success: false,
        message: 'Secret key not configured'
      };
    }

    // Test API connection by fetching banks (doesn't require payment)
    const response = await fetch('https://api.paystack.co/bank', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: 'Paystack API connection successful',
        details: {
          status: data.status,
          banksCount: data.data?.length || 0
        }
      };
    } else {
      return {
        success: false,
        message: `API connection failed: ${response.status} ${response.statusText}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Display key check results in console
 */
export const logKeyCheckResults = (result: KeyCheckResult): void => {
  console.group('🔑 Paystack Key Configuration Check');
  
  if (result.isConfigured) {
    console.log('✅ Keys are properly configured');
    console.log(`🌍 Environment: ${result.isProduction ? 'PRODUCTION (Live)' : 'TEST'}`);
  } else {
    console.log('❌ Key configuration issues found');
  }

  if (result.errors.length > 0) {
    console.group('❌ Errors:');
    result.errors.forEach(error => console.error(`  • ${error}`));
    console.groupEnd();
  }

  if (result.warnings.length > 0) {
    console.group('⚠️ Warnings:');
    result.warnings.forEach(warning => console.warn(`  • ${warning}`));
    console.groupEnd();
  }

  console.log('📊 Key Status:');
  console.log(`  Public Key: ${result.publicKeyValid ? '✅' : '❌'}`);
  console.log(`  Secret Key: ${result.secretKeyValid ? '✅' : '❌'}`);
  
  console.groupEnd();
};

/**
 * Get masked key for safe logging
 */
export const getMaskedKey = (key: string): string => {
  if (!key || key.length < 8) return 'Invalid';
  return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
};

/**
 * Comprehensive Paystack setup verification
 */
export const verifyPaystackSetup = async (): Promise<void> => {
  console.log('🔍 Verifying Paystack setup...');
  
  // Check keys
  const keyResult = checkPaystackKeys();
  logKeyCheckResults(keyResult);

  // Test API connection if keys are valid
  if (keyResult.isConfigured) {
    console.log('🌐 Testing API connection...');
    const connectionResult = await testPaystackConnection();
    
    if (connectionResult.success) {
      console.log('✅ API connection successful');
      console.log(`📊 Details:`, connectionResult.details);
    } else {
      console.error('❌ API connection failed:', connectionResult.message);
    }
  }

  // Log current keys (masked for security)
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const secretKey = import.meta.env.PAYSTACK_SECRET_KEY;
  
  console.log('🔑 Current Keys (masked):');
  console.log(`  Public: ${getMaskedKey(publicKey || '')}`);
  console.log(`  Secret: ${getMaskedKey(secretKey || '')}`);
};

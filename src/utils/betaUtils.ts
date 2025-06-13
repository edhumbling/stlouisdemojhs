/**
 * Beta Testing Utilities
 * Developer tools for managing beta access
 */

export const BetaUtils = {
  /**
   * Grant beta access manually (for testing)
   */
  grantAccess: () => {
    localStorage.setItem('betaAccess', 'granted');
    localStorage.setItem('betaAccessTime', Date.now().toString());
    console.log('✅ Beta access granted manually');
  },

  /**
   * Revoke beta access (for testing)
   */
  revokeAccess: () => {
    localStorage.removeItem('betaAccess');
    localStorage.removeItem('betaAccessTime');
    console.log('❌ Beta access revoked');
    window.location.reload();
  },

  /**
   * Check current beta access status
   */
  checkAccess: () => {
    const betaAccess = localStorage.getItem('betaAccess');
    const betaAccessTime = localStorage.getItem('betaAccessTime');
    
    if (betaAccess === 'granted' && betaAccessTime) {
      const accessTime = parseInt(betaAccessTime);
      const currentTime = Date.now();
      const timeRemaining = (24 * 60 * 60 * 1000) - (currentTime - accessTime);
      
      if (timeRemaining > 0) {
        const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
        const minutesRemaining = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
        console.log(`✅ Beta access active. Time remaining: ${hoursRemaining}h ${minutesRemaining}m`);
        return true;
      } else {
        console.log('⏰ Beta access expired');
        return false;
      }
    } else {
      console.log('❌ No beta access found');
      return false;
    }
  },

  /**
   * Get valid beta codes (for developer reference)
   */
  getValidCodes: () => {
    const codes = [
      'BETA2024STL',
      'DEMO7X9K2',
      'TESTER4M8P',
      'ALPHA3Q7W',
      'PREVIEW5N1',
      'ACCESS8R6T',
      'TRIAL9Y4U'
    ];
    console.log('🔐 Valid beta codes:', codes);
    return codes;
  },

  /**
   * Reset beta access timer (extend for 24 hours from now)
   */
  extendAccess: () => {
    if (localStorage.getItem('betaAccess') === 'granted') {
      localStorage.setItem('betaAccessTime', Date.now().toString());
      console.log('⏰ Beta access extended for 24 hours');
    } else {
      console.log('❌ No active beta access to extend');
    }
  }
};

// Make utilities available in browser console for development
if (typeof window !== 'undefined') {
  (window as any).BetaUtils = BetaUtils;
  console.log('🛠️ BetaUtils available in console. Try: BetaUtils.checkAccess()');
}

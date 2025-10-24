/**
 * Microphone Permission Service
 * Manages microphone permissions and saves user preferences
 */

class MicrophonePermissionService {
  private permissionKey = 'microphone_permission_granted';
  private hasPermission: boolean = false;

  constructor() {
    this.loadPermissionState();
  }

  /**
   * Load permission state from localStorage
   */
  private loadPermissionState(): void {
    try {
      const saved = localStorage.getItem(this.permissionKey);
      this.hasPermission = saved === 'true';
      console.log('🎤 Microphone permission state loaded:', this.hasPermission);
    } catch (error) {
      console.warn('⚠️ Could not load microphone permission state:', error);
      this.hasPermission = false;
    }
  }

  /**
   * Save permission state to localStorage
   */
  private savePermissionState(granted: boolean): void {
    try {
      localStorage.setItem(this.permissionKey, granted.toString());
      this.hasPermission = granted;
      console.log('🎤 Microphone permission state saved:', granted);
    } catch (error) {
      console.warn('⚠️ Could not save microphone permission state:', error);
    }
  }

  /**
   * Check if microphone permission is granted
   */
  public hasMicrophonePermission(): boolean {
    return this.hasPermission;
  }

  /**
   * Request microphone permission
   */
  public async requestMicrophonePermission(): Promise<boolean> {
    try {
      console.log('🎤 Requesting microphone permission...');
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Permission granted
      console.log('✅ Microphone permission granted');
      this.savePermissionState(true);
      
      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      return true;
    } catch (error) {
      console.error('❌ Microphone permission denied:', error);
      this.savePermissionState(false);
      return false;
    }
  }

  /**
   * Check current microphone permission status
   */
  public async checkMicrophonePermission(): Promise<boolean> {
    try {
      // Check if we can query permission status
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        const granted = permission.state === 'granted';
        this.savePermissionState(granted);
        return granted;
      }
      
      // Fallback: try to get user media without requesting
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      this.savePermissionState(true);
      return true;
    } catch (error) {
      console.log('🎤 Microphone permission not granted');
      this.savePermissionState(false);
      return false;
    }
  }

  /**
   * Revoke microphone permission (for testing or user preference)
   */
  public revokeMicrophonePermission(): void {
    this.savePermissionState(false);
    console.log('🎤 Microphone permission revoked');
  }

  /**
   * Get microphone permission status with user-friendly message
   */
  public getPermissionStatus(): {
    hasPermission: boolean;
    message: string;
    canRequest: boolean;
  } {
    return {
      hasPermission: this.hasPermission,
      message: this.hasPermission 
        ? 'Microphone access granted' 
        : 'Microphone access required for voice input',
      canRequest: true
    };
  }

  /**
   * Initialize microphone permission check
   */
  public async initialize(): Promise<boolean> {
    try {
      // First check if we have saved permission
      if (this.hasPermission) {
        // Verify the permission is still valid
        const stillValid = await this.checkMicrophonePermission();
        if (stillValid) {
          console.log('🎤 Microphone permission verified');
          return true;
        } else {
          console.log('🎤 Saved permission no longer valid, requesting again');
          return await this.requestMicrophonePermission();
        }
      } else {
        // No saved permission, check current status
        return await this.checkMicrophonePermission();
      }
    } catch (error) {
      console.error('❌ Error initializing microphone permission:', error);
      return false;
    }
  }
}

// Export singleton instance
const microphonePermissionService = new MicrophonePermissionService();
export default microphonePermissionService;
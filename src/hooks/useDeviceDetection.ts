import { useState, useEffect } from 'react';

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  specificDevice: string;
  screenSize: {
    width: number;
    height: number;
  };
  isTouch: boolean;
  userAgent: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    specificDevice: 'unknown',
    screenSize: { width: 0, height: 0 },
    isTouch: false,
    userAgent: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      let type: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      let specificDevice = 'unknown';

      // iPad Detection (most important for our use case)
      if (/iPad/.test(userAgent) ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        type = 'tablet';

        // Specific iPad models based on screen dimensions
        if (width === 1024 && height === 1366) {
          specificDevice = 'iPad Pro 12.9"';
        } else if (width === 834 && height === 1194) {
          specificDevice = 'iPad Pro 11"';
        } else if (width === 820 && height === 1180) {
          specificDevice = 'iPad Air';
        } else if (width === 768 && height === 1024) {
          specificDevice = 'iPad Mini/Standard';
        } else if (width >= 1024) {
          specificDevice = 'iPad Pro (Large)';
        } else if (width >= 768) {
          specificDevice = 'iPad (Standard)';
        } else {
          specificDevice = 'iPad (Unknown)';
        }
      }
      // Android Tablet Detection
      else if (/Android/.test(userAgent) && !/Mobile/.test(userAgent)) {
        type = 'tablet';
        if (width >= 1200) {
          specificDevice = 'Android Tablet (Large)';
        } else if (width >= 800) {
          specificDevice = 'Android Tablet (Medium)';
        } else {
          specificDevice = 'Android Tablet (Small)';
        }
      }
      // Surface and Windows Tablets
      else if (/Windows NT/.test(userAgent) && isTouch && width >= 768 && width <= 1366) {
        type = 'tablet';
        specificDevice = 'Windows Tablet';
      }
      // Generic tablet detection by screen size and touch
      else if (isTouch && width >= 768 && width <= 1366 && height >= 1024) {
        type = 'tablet';
        specificDevice = 'Generic Tablet';
      }
      // Mobile Detection
      else if (/iPhone|iPod/.test(userAgent) ||
               (/Android/.test(userAgent) && /Mobile/.test(userAgent)) ||
               width < 768) {
        type = 'mobile';

        if (/iPhone/.test(userAgent)) {
          if (width >= 414) {
            specificDevice = 'iPhone Plus/Pro Max';
          } else if (width >= 375) {
            specificDevice = 'iPhone Standard';
          } else {
            specificDevice = 'iPhone Mini/SE';
          }
        } else if (/Android/.test(userAgent)) {
          specificDevice = 'Android Phone';
        } else {
          specificDevice = 'Mobile Device';
        }
      }
      // Desktop Detection
      else {
        type = 'desktop';
        if (width >= 1920) {
          specificDevice = 'Desktop (Large)';
        } else if (width >= 1440) {
          specificDevice = 'Desktop (Medium)';
        } else {
          specificDevice = 'Desktop (Small)';
        }
      }

      console.log('🔍 Device Detection:', {
        type,
        specificDevice,
        width,
        height,
        isTouch,
        userAgent: userAgent.substring(0, 50) + '...'
      });

      setDeviceInfo({
        type,
        specificDevice,
        screenSize: { width, height },
        isTouch,
        userAgent
      });
    };

    // Initial detection
    detectDevice();

    // Re-detect on resize (for orientation changes)
    const handleResize = () => {
      setTimeout(detectDevice, 100); // Small delay to ensure accurate dimensions
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
};

// Helper function to get tablet-specific padding
export const getTabletPadding = (deviceInfo: DeviceInfo): string => {
  if (deviceInfo.type !== 'tablet') return '';

  const { width } = deviceInfo.screenSize;

  // iPad Pro 12.9" (1024x1366) - needs maximum padding to clear header
  if (width >= 1024) {
    return 'pt-56'; // 14rem = 224px - much more padding
  }
  // iPad Air (820x1180) - high padding
  else if (width >= 820) {
    return 'pt-52'; // 13rem = 208px - increased padding
  }
  // iPad Mini/Standard (768x1024) - increased padding
  else if (width >= 768) {
    return 'pt-48'; // 12rem = 192px - increased padding
  }

  return 'pt-44'; // 11rem = 176px fallback - increased
};

// Helper function to get tablet-specific text sizes
export const getTabletTextSizes = (deviceInfo: DeviceInfo) => {
  if (deviceInfo.type !== 'tablet') return null;

  const { width } = deviceInfo.screenSize;

  if (width >= 1024) {
    // iPad Pro - largest tablet text
    return {
      heading: 'text-5xl',
      subtitle: 'text-lg',
      button: 'text-base'
    };
  } else if (width >= 820) {
    // iPad Air - medium tablet text
    return {
      heading: 'text-4xl',
      subtitle: 'text-base',
      button: 'text-sm'
    };
  } else {
    // iPad Mini - smaller tablet text
    return {
      heading: 'text-3xl',
      subtitle: 'text-sm',
      button: 'text-xs'
    };
  }
};

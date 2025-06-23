import { useState, useEffect } from 'react';

export const useCelebrationModal = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const checkCelebrationDate = () => {
      const today = new Date();
      const startDate = new Date('2025-06-23'); // June 23rd, 2025 (today)
      const endDate = new Date('2025-06-24'); // June 24th, 2025 (tomorrow)

      // Check if today is within the celebration period (June 23-24, 2025)
      const isWithinCelebrationPeriod = today >= startDate && today <= endDate;

      // Check if user has already seen the celebration during this period
      const hasSeenCelebration = localStorage.getItem('celebration-seen-2025-06-23-24');

      if (isWithinCelebrationPeriod && !hasSeenCelebration) {
        // Small delay to let the page load first
        setTimeout(() => {
          setShowCelebration(true);
        }, 1500);
      }
    };

    checkCelebrationDate();
  }, []);

  const closeCelebration = () => {
    setShowCelebration(false);
    // Mark as seen for the celebration period
    localStorage.setItem('celebration-seen-2025-06-23-24', 'true');
  };

  return {
    showCelebration,
    closeCelebration
  };
};

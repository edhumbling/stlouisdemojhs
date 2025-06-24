import { useState, useEffect } from 'react';

export const useCelebrationModal = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const checkCelebrationDate = () => {
      const today = new Date();
      const startDate = new Date('2025-06-23'); // June 23rd, 2025
      const endDate = new Date('2025-06-24'); // June 24th, 2025

      console.log('Celebration Check:', {
        today: today.toDateString(),
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        isWithinPeriod: today >= startDate && today <= endDate
      });

      // Check if today is within the celebration period (June 23-24, 2025)
      const isWithinCelebrationPeriod = today >= startDate && today <= endDate;

      // Check if user has already seen the celebration during this period
      const hasSeenCelebration = localStorage.getItem('celebration-seen-2025-06-23-24');

      console.log('Celebration Status:', {
        isWithinPeriod: isWithinCelebrationPeriod,
        hasSeenCelebration: !!hasSeenCelebration,
        shouldShow: isWithinCelebrationPeriod && !hasSeenCelebration
      });

      if (isWithinCelebrationPeriod && !hasSeenCelebration) {
        console.log('Showing celebration modal in 300ms...');
        // Very fast reveal - minimal delay
        setTimeout(() => {
          setShowCelebration(true);
        }, 300);
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

import { useState, useEffect } from 'react';

export const useCelebrationModal = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const checkCelebrationDate = () => {
      const today = new Date();
      const celebrationDate = new Date('2025-06-24'); // June 24th, 2025
      
      // Check if today is the celebration date
      const isToday = today.toDateString() === celebrationDate.toDateString();
      
      // Check if user has already seen the celebration today
      const hasSeenToday = localStorage.getItem('celebration-seen-2025-06-24');
      
      if (isToday && !hasSeenToday) {
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
    // Mark as seen for today
    localStorage.setItem('celebration-seen-2025-06-24', 'true');
  };

  return {
    showCelebration,
    closeCelebration
  };
};

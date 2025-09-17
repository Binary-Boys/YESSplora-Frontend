import { useState, useEffect, useCallback } from 'react';

export const useAutoHide = (hideDelay = 20000) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState(null);

  // Reset timer function
  const resetTimer = useCallback(() => {
    // Clear existing timer
    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    // Show bars if hidden
    setIsVisible(true);

    // Set new timer to hide bars after delay
    const newTimer = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);

    setHideTimer(newTimer);
  }, [hideTimer, hideDelay]);

  // Show bars manually (for touch/click events)
  const showBars = useCallback(() => {
    setIsVisible(true);
    resetTimer();
  }, [resetTimer]);

  // Hide bars manually
  const hideBars = useCallback(() => {
    setIsVisible(false);
    if (hideTimer) {
      clearTimeout(hideTimer);
      setHideTimer(null);
    }
  }, [hideTimer]);

  // Initialize timer on mount and reset on user activity
  useEffect(() => {
    resetTimer();

    // Cleanup timer on unmount
    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, []);

  // Reset timer on any user interaction
  useEffect(() => {
    const handleUserActivity = () => {
      resetTimer();
    };

    // Listen for various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetTimer]);

  return {
    isVisible,
    showBars,
    hideBars,
    resetTimer
  };
};

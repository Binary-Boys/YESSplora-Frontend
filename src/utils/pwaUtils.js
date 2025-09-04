// PWA Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, show update prompt
            showUpdatePrompt();
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('SW registration failed: ', error);
      throw error;
    }
  } else {
    console.log('Service Worker not supported');
  }
};

// PWA Installation Prompt
let deferredPrompt;

export const initializeInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install prompt
    showInstallPrompt();
  });
};

export const showInstallPrompt = () => {
  if (!deferredPrompt) return;
  
  const promptElement = document.getElementById('pwa-install-prompt');
  const installBtn = document.getElementById('pwa-install-btn');
  const dismissBtn = document.getElementById('pwa-dismiss-btn');
  
  if (promptElement) {
    promptElement.style.display = 'block';
    
    installBtn.addEventListener('click', async () => {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // Clear the deferredPrompt variable
      deferredPrompt = null;
      // Hide the prompt
      promptElement.style.display = 'none';
    });
    
    dismissBtn.addEventListener('click', () => {
      promptElement.style.display = 'none';
      deferredPrompt = null;
    });
  }
};

export const showUpdatePrompt = () => {
  // Show update notification
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('YessPLORA Update Available', {
        body: 'A new version is available. Refresh to update.',
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: 'update-available',
        requireInteraction: true,
        actions: [
          {
            action: 'refresh',
            title: 'Refresh Now',
          },
          {
            action: 'dismiss',
            title: 'Later',
          },
        ],
      });
    });
  }
};

// Offline Status Detection
export const initializeOfflineDetection = () => {
  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;
    document.body.classList.toggle('offline', !isOnline);
    
    if (!isOnline) {
      showOfflineNotification();
    } else {
      hideOfflineNotification();
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial check
  updateOnlineStatus();
};

export const showOfflineNotification = () => {
  // Show offline notification
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('YessPLORA Offline', {
        body: 'You are currently offline. Some features may be limited.',
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: 'offline-status',
        requireInteraction: false,
      });
    });
  }
};

export const hideOfflineNotification = () => {
  // Hide offline notification
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.getNotifications({ tag: 'offline-status' }).then((notifications) => {
        notifications.forEach((notification) => {
          notification.close();
        });
      });
    });
  }
};

// Cache Management
export const clearAppCache = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('yessplora-')) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
      console.log('App cache cleared');
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }
};

export const getCacheSize = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage,
        quota: estimate.quota,
        percentage: (estimate.usage / estimate.quota) * 100,
      };
    } catch (error) {
      console.error('Failed to get storage estimate:', error);
      return null;
    }
  }
  return null;
};

// App Lifecycle Events
export const initializeAppLifecycle = () => {
  // Handle app visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // App is hidden
      console.log('App hidden');
    } else {
      // App is visible
      console.log('App visible');
    }
  });

  // Handle beforeunload
  window.addEventListener('beforeunload', (e) => {
    // Save any unsaved data
    console.log('App unloading');
  });

  // Handle page show/hide
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      // Page was loaded from cache
      console.log('Page loaded from cache');
    }
  });

  window.addEventListener('pagehide', (e) => {
    if (e.persisted) {
      // Page is being cached
      console.log('Page being cached');
    }
  });
};

// Network Status
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  return null;
};

// Background Sync
export const registerBackgroundSync = async (tag, data) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register(tag);
      console.log('Background sync registered:', tag);
      return true;
    } catch (error) {
      console.error('Background sync registration failed:', error);
      return false;
    }
  }
  return false;
};

// Push Notifications
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const showNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/logo192.png',
      badge: '/logo192.png',
      ...options,
    });
    
    notification.addEventListener('click', () => {
      window.focus();
      notification.close();
    });
    
    return notification;
  }
  return null;
};


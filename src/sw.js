// Service Worker for YessPLORA PWA
const CACHE_NAME = 'yessplora-v1.0.0';
const STATIC_CACHE = 'yessplora-static-v1.0.0';
const DYNAMIC_CACHE = 'yessplora-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico',
  '/images/campus-map.png',
  '/images/mascot-3d.png',
  '/images/logo.png',
  '/fonts/ClashDisplay-Bold.otf',
  '/fonts/ClashDisplay-Medium.otf',
  '/fonts/ClashDisplay-Semibold.otf',
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/static/') || url.pathname.startsWith('/images/') || url.pathname.startsWith('/fonts/')) {
    // Static assets - Cache First
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
  } else if (url.pathname.startsWith('/qr-codes/')) {
    // QR codes - Cache First with network fallback
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Return a placeholder image if network fails
              return caches.match('/images/qr-placeholder.png');
            });
        })
    );
  } else if (url.pathname.startsWith('/api/')) {
    // API requests - Network First with cache fallback
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((response) => {
              if (response) {
                return response;
              }
              // Return offline response
              return new Response(
                JSON.stringify({ error: 'Offline - No cached data available' }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
        })
    );
  } else {
    // Other requests - Network First
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'qr-scan-sync') {
    event.waitUntil(syncQRScans());
  } else if (event.tag === 'level-complete-sync') {
    event.waitUntil(syncLevelCompletions());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/images/explore-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/close-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('YessPLORA', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync functions
async function syncQRScans() {
  try {
    // Get stored QR scans from IndexedDB
    const qrScans = await getStoredQRScans();
    
    if (qrScans.length > 0) {
      // Send to server
      const response = await fetch('/api/qr-scans/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scans: qrScans }),
      });
      
      if (response.ok) {
        // Clear stored scans
        await clearStoredQRScans();
        console.log('QR scans synced successfully');
      }
    }
  } catch (error) {
    console.error('Failed to sync QR scans:', error);
  }
}

async function syncLevelCompletions() {
  try {
    // Get stored level completions from IndexedDB
    const levelCompletions = await getStoredLevelCompletions();
    
    if (levelCompletions.length > 0) {
      // Send to server
      const response = await fetch('/api/levels/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completions: levelCompletions }),
      });
      
      if (response.ok) {
        // Clear stored completions
        await clearStoredLevelCompletions();
        console.log('Level completions synced successfully');
      }
    }
  } catch (error) {
    console.error('Failed to sync level completions:', error);
  }
}

// IndexedDB helper functions (simplified)
async function getStoredQRScans() {
  // This would interact with IndexedDB
  // For now, return empty array
  return [];
}

async function clearStoredQRScans() {
  // This would clear IndexedDB
  return Promise.resolve();
}

async function getStoredLevelCompletions() {
  // This would interact with IndexedDB
  // For now, return empty array
  return [];
}

async function clearStoredLevelCompletions() {
  // This would clear IndexedDB
  return Promise.resolve();
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});


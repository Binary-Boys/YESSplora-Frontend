// Mock API service for development and testing
class MockApiService {
  constructor() {
    this.baseUrl = 'http://localhost:3001/api'; // Mock backend URL
    this.isOnline = navigator.onLine;
    this.pendingRequests = [];
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processPendingRequests();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Simulate network delay
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // If offline, store request for later
    if (!this.isOnline) {
      this.pendingRequests.push({ url, config });
      throw new Error('Network offline - request queued');
    }

    try {
      await this.delay(); // Simulate network delay
      
      // Mock responses based on endpoint
      const response = this.getMockResponse(endpoint, config);
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get mock response based on endpoint
  getMockResponse(endpoint, config) {
    const method = config.method || 'GET';
    const body = config.body ? JSON.parse(config.body) : {};

    switch (endpoint) {
      case '/auth/login':
        if (method === 'POST') {
          const { ticketId, teamCode } = body;
          if (ticketId && teamCode) {
            return {
              success: true,
              data: {
                token: 'mock-jwt-token',
                team: {
                  id: 'team-001',
                  name: 'Avengers',
                  members: ['Achu', 'Kichu', 'Anju', 'Manju', 'Lechu'],
                  ticketId: ticketId
                }
              }
            };
          } else {
            throw new Error('Invalid credentials');
          }
        }
        break;

      case '/team/profile':
        if (method === 'GET') {
          return {
            success: true,
            data: {
              id: 'team-001',
              name: 'Avengers',
              members: ['Achu', 'Kichu', 'Anju', 'Manju', 'Lechu'],
              ticketId: 'TICKET-001'
            }
          };
        } else if (method === 'PUT') {
          return {
            success: true,
            data: {
              id: 'team-001',
              name: body.name || 'Avengers',
              members: body.members || ['Achu', 'Kichu', 'Anju', 'Manju', 'Lechu'],
              ticketId: 'TICKET-001'
            }
          };
        }
        break;

      case '/game/progress':
        if (method === 'GET') {
          return {
            success: true,
            data: {
              currentLevel: 1,
              completedLevels: [],
              totalScore: 0,
              locationStatus: {
                1: { completed: false, score: 0, type: 'software' },
                2: { completed: false, score: 0, type: 'software' },
                3: { completed: false, score: 0, type: 'software' },
                4: { completed: false, score: 0, type: 'software' },
                5: { completed: false, score: 0, type: 'physical' },
                6: { completed: false, score: 0, type: 'physical' },
                7: { completed: false, score: 0, type: 'physical' },
                8: { completed: false, score: 0, type: 'physical' },
                9: { completed: false, score: 0, type: 'special' }
              }
            }
          };
        } else if (method === 'PUT') {
          return {
            success: true,
            data: body
          };
        }
        break;

      case '/game/complete-location':
        if (method === 'POST') {
          const { locationId, score, type } = body;
          return {
            success: true,
            data: {
              locationId,
              score,
              type,
              completed: true,
              timestamp: new Date().toISOString()
            }
          };
        }
        break;

      case '/game/update-score':
        if (method === 'POST') {
          const { locationId, score } = body;
          return {
            success: true,
            data: {
              locationId,
              score,
              updated: true,
              timestamp: new Date().toISOString()
            }
          };
        }
        break;

      case '/qr/validate':
        if (method === 'POST') {
          const { qrData, location } = body;
          // Mock QR validation
          if (qrData.includes('software')) {
            return {
              success: true,
              data: {
                type: 'software_game',
                gameId: 'game-001',
                level: 1,
                redirectUrl: 'https://example.com/game'
              }
            };
          } else if (qrData.includes('volunteer')) {
            return {
              success: true,
              data: {
                type: 'volunteer',
                volunteerId: 'vol-001',
                locationId: 5,
                name: 'John Doe'
              }
            };
          } else {
            return {
              success: true,
              data: {
                type: 'location',
                locationId: 1,
                name: 'Campus Building A'
              }
            };
          }
        }
        break;

      case '/sync/pending':
        if (method === 'POST') {
          return {
            success: true,
            data: {
              synced: body.length,
              timestamp: new Date().toISOString()
            }
          };
        }
        break;

      default:
        return {
          success: true,
          data: { message: 'Mock response' }
        };
    }
  }

  // Process pending requests when back online
  async processPendingRequests() {
    if (this.pendingRequests.length === 0) return;

    console.log(`Processing ${this.pendingRequests.length} pending requests`);
    
    for (const request of this.pendingRequests) {
      try {
        await this.request(request.url, request.config);
      } catch (error) {
        console.error('Failed to process pending request:', error);
      }
    }
    
    this.pendingRequests = [];
  }

  // Authentication methods
  async login(ticketId, teamCode) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ ticketId, teamCode })
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Team methods
  async getTeamProfile() {
    return this.request('/team/profile');
  }

  async updateTeamProfile(teamData) {
    return this.request('/team/profile', {
      method: 'PUT',
      body: JSON.stringify(teamData)
    });
  }

  // Game methods
  async getGameProgress() {
    return this.request('/game/progress');
  }

  async updateGameProgress(progress) {
    return this.request('/game/progress', {
      method: 'PUT',
      body: JSON.stringify(progress)
    });
  }

  async completeLocation(locationId, score, type) {
    return this.request('/game/complete-location', {
      method: 'POST',
      body: JSON.stringify({ locationId, score, type })
    });
  }

  async updateScore(locationId, score) {
    return this.request('/game/update-score', {
      method: 'POST',
      body: JSON.stringify({ locationId, score })
    });
  }

  // QR Code methods
  async validateQRCode(qrData, location) {
    return this.request('/qr/validate', {
      method: 'POST',
      body: JSON.stringify({ qrData, location })
    });
  }

  // Sync methods
  async syncPendingData(pendingData) {
    return this.request('/sync/pending', {
      method: 'POST',
      body: JSON.stringify(pendingData)
    });
  }
}

// Create singleton instance
const mockApi = new MockApiService();

export default mockApi;

// Mock API service for development and testing
class MockApiService {
  constructor() {
    this.baseUrl = 'http://localhost:8000/api'; // Backend URL
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
      case '/leaderboard':
        if (method === 'GET') {
          return {
            success: true,
            data: [
              { teamName: 'Avengers', teamId: 'T-001', teamScore: 920, levelsCleared: 7, eliminated: false },
              { teamName: 'Guardians', teamId: 'T-002', teamScore: 880, levelsCleared: 6, eliminated: false },
              { teamName: 'Wizards', teamId: 'T-003', teamScore: 750, levelsCleared: 5, eliminated: true },
              { teamName: 'Rangers', teamId: 'T-004', teamScore: 640, levelsCleared: 4, eliminated: false },
              { teamName: 'Titans', teamId: 'T-005', teamScore: 500, levelsCleared: 4, eliminated: true }
            ]
          };
        }
        break;
      case '/auth/login':
        if (method === 'POST') {
          const { ticketId, teamCode } = body;
          
          // Check for admin user
          if (ticketId?.toLowerCase() === 'admin' && teamCode?.toLowerCase() === 'killadi') {
            return {
              success: true,
              data: {
                token: 'mock-admin-jwt-token',
                team: {
                  id: 'admin-team',
                  name: 'Admin Team',
                  members: ['Admin'],
                  ticketId: 'admin',
                  teamCode: 'killadi',
                  isAdmin: true
                }
              }
            };
          }
          
          // Validate regular users
          if (ticketId && teamCode) {
            // Check if ticket ID matches team code
            if (ticketId !== teamCode) {
              throw new Error('Team code must match ticket ID');
            }
            
            // Check ticket ID format (YESS25 + 8 characters)
            if (!ticketId.startsWith('YESS25') || ticketId.length !== 14) {
              throw new Error('Invalid ticket ID format');
            }
            
            return {
              success: true,
              data: {
                token: 'mock-jwt-token',
                team: {
                  id: `team-${ticketId}`,
                  name: `Team ${ticketId}`,
                  members: ['Team Lead', 'Member 1', 'Member 2', 'Member 3', 'Member 4'],
                  ticketId: ticketId,
                  teamCode: teamCode,
                  isAdmin: false
                }
              }
            };
          } else {
            throw new Error('Invalid credentials');
          }
        }
        break;

      case '/auth/signup':
        if (method === 'POST') {
          const { teamName, mobileNo, yessTicketId, password, teamMembers } = body;
          
          // Validate ticket ID format
          if (!yessTicketId.startsWith('YESS25') || yessTicketId.length !== 14) {
            throw new Error('Invalid ticket ID format. Must be YESS25 followed by 8 characters.');
          }
          
          // Check if team already exists (mock check)
          if (yessTicketId === 'YESS25EXISTING') {
            throw new Error('Team with this ticket ID already exists');
          }
          
          return {
            success: true,
            data: {
              message: 'Team registered successfully',
              team: {
                id: `team-${yessTicketId}`,
                name: teamName,
                ticketId: yessTicketId,
                teamCode: yessTicketId, // Team code same as ticket ID
                mobileNo: mobileNo,
                members: teamMembers || []
              }
            }
          };
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
  async login(team_id, password) {
    return this.request('/team/login', {
      method: 'POST',
      body: JSON.stringify({ team_id, password })
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Team methods
  async getTeamProfile(team_id) {
    return this.request('/team/add-members', {
      method: 'POST',
      body: JSON.stringify({ team_id })
    });
  }

  async updateTeamProfile(teamData) {
    return this.request('/team/profile', {
      method: 'PUT',
      body: JSON.stringify(teamData)
    });
  }

  async addTeamMembers(team_id, members) {
    return this.request('/team/add-members', {
      method: 'POST',
      body: JSON.stringify({ team_id, members })
    });
  }

  // Game methods
  async getGameProgress(team_id) {
    return this.request('/team/get-score', {
      method: 'GET',
      body: JSON.stringify({ team_id })
    });
  }

  async updateGameProgress(progress) {
    return this.request('/game/progress', {
      method: 'PUT',
      body: JSON.stringify(progress)
    });
  }

  async completeLocation(team_id, level, score) {
    return this.request('/team/update-score', {
      method: 'POST',
      body: JSON.stringify({ 
        team_id, 
        scoreObj: { level, score } 
      })
    });
  }

  async updateScore(team_id, level, score) {
    return this.request('/team/update-score', {
      method: 'POST',
      body: JSON.stringify({ 
        team_id, 
        scoreObj: { level, score } 
      })
    });
  }

  // QR Code methods
  async validateQRCode(qrData, location) {
    return this.request('/qr/validate', {
      method: 'POST',
      body: JSON.stringify({ qrData, location })
    });
  }

  // Leaderboard methods
  async getLeaderboard() {
    return this.request('/team/get-leader-board', {
      method: 'GET'
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

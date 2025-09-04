// API Configuration
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000/api' 
  : 'https://your-backend.com/api';

const apiEndpoints = {
  // Authentication
  auth: {
    register: '/auth/register/',
    adminLogin: '/auth/admin/login/',
    refreshToken: '/auth/refresh/',
    logout: '/auth/logout/'
  },
  
  // Team Management
  teams: {
    list: '/teams/',
    detail: (id) => `/teams/${id}/`,
    create: '/teams/',
    update: (id) => `/teams/${id}/`,
    leaderboard: '/teams/leaderboard/'
  },
  
  // Game Progress
  progress: {
    get: (teamId) => `/progress/${teamId}/`,
    update: (teamId) => `/progress/${teamId}/`,
    levelComplete: '/progress/complete-level/',
    unityGameComplete: '/progress/unity-complete/'
  },
  
  // QR Code Management
  qr: {
    validate: '/qr/validate/',
    scan: '/qr/scan/',
    teamQrs: '/qr/team-codes/',
    stallQrs: '/qr/stall-codes/',
    treasureQrs: '/qr/treasure-codes/'
  },
  
  // Unity Games
  unity: {
    gameStart: '/unity/start/',
    gameComplete: '/unity/complete/',
    gameProgress: (gameId) => `/unity/${gameId}/progress/`,
    leaderboard: (gameId) => `/unity/${gameId}/leaderboard/`
  },
  
  // Statistics
  stats: {
    overview: '/stats/overview/',
    teamStats: (teamId) => `/stats/team/${teamId}/`,
    gameStats: '/stats/games/'
  }
};

// API Client
const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...options
    };
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${errorData.message || response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  },
  
  // Authentication methods
  async registerTeam(teamData) {
    return this.request(apiEndpoints.auth.register, {
      method: 'POST',
      body: JSON.stringify(teamData)
    });
  },

  async adminLogin(credentials) {
    return this.request(apiEndpoints.auth.adminLogin, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    return this.request(apiEndpoints.auth.refreshToken, {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken })
    });
  },

  async logout() {
    return this.request(apiEndpoints.auth.logout, {
      method: 'POST'
    });
  },
  
  // Team management methods
  async getTeams() {
    return this.request(apiEndpoints.teams.list);
  },

  async getTeam(teamId) {
    return this.request(apiEndpoints.teams.detail(teamId));
  },

  async createTeam(teamData) {
    return this.request(apiEndpoints.teams.create, {
      method: 'POST',
      body: JSON.stringify(teamData)
    });
  },

  async updateTeam(teamId, teamData) {
    return this.request(apiEndpoints.teams.update(teamId), {
      method: 'PUT',
      body: JSON.stringify(teamData)
    });
  },

  async getLeaderboard() {
    return this.request(apiEndpoints.teams.leaderboard);
  },
  
  // Game progress methods
  async getProgress(teamId) {
    return this.request(apiEndpoints.progress.get(teamId));
  },

  async updateProgress(teamId, progressData) {
    return this.request(apiEndpoints.progress.update(teamId), {
      method: 'PUT',
      body: JSON.stringify(progressData)
    });
  },

  async completeLevel(levelData) {
    return this.request(apiEndpoints.progress.levelComplete, {
      method: 'POST',
      body: JSON.stringify(levelData)
    });
  },

  async completeUnityGame(gameData) {
    return this.request(apiEndpoints.progress.unityGameComplete, {
      method: 'POST',
      body: JSON.stringify(gameData)
    });
  },
  
  // QR Code methods
  async validateQR(qrCode, teamId) {
    return this.request(apiEndpoints.qr.validate, {
      method: 'POST',
      body: JSON.stringify({ qrCode, teamId })
    });
  },

  async scanQR(scanData) {
    return this.request(apiEndpoints.qr.scan, {
      method: 'POST',
      body: JSON.stringify(scanData)
    });
  },

  async getTeamQRCodes() {
    return this.request(apiEndpoints.qr.teamQrs);
  },

  async getStallQRCodes() {
    return this.request(apiEndpoints.qr.stallQrs);
  },

  async getTreasureQRCodes() {
    return this.request(apiEndpoints.qr.treasureQrs);
  },
  
  // Unity Games methods
  async startUnityGame(gameId, teamId) {
    return this.request(apiEndpoints.unity.gameStart, {
      method: 'POST',
      body: JSON.stringify({ gameId, teamId })
    });
  },

  async completeUnityGame(gameId, score, teamId) {
    return this.request(apiEndpoints.unity.gameComplete, {
      method: 'POST',
      body: JSON.stringify({
        gameId,
        score,
        teamId,
        completedAt: new Date().toISOString()
      })
    });
  },

  async getUnityGameProgress(gameId, teamId) {
    return this.request(apiEndpoints.unity.gameProgress(gameId), {
      method: 'POST',
      body: JSON.stringify({ teamId })
    });
  },

  async getUnityGameLeaderboard(gameId) {
    return this.request(apiEndpoints.unity.leaderboard(gameId));
  },
  
  // Statistics methods
  async getStatsOverview() {
    return this.request(apiEndpoints.stats.overview);
  },

  async getTeamStats(teamId) {
    return this.request(apiEndpoints.stats.teamStats(teamId));
  },

  async getGameStats() {
    return this.request(apiEndpoints.stats.gameStats);
  }
};

// Token management
const tokenManager = {
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getAccessToken() {
    return localStorage.getItem('authToken');
  },

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  },

  clearTokens() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },

  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
};

// Request interceptor for automatic token refresh
const createAuthenticatedClient = () => {
  const originalRequest = apiClient.request.bind(apiClient);
  
  apiClient.request = async (endpoint, options = {}) => {
    const token = tokenManager.getAccessToken();
    
    if (token && tokenManager.isTokenExpired(token)) {
      try {
        const refreshResponse = await apiClient.refreshToken();
        tokenManager.setTokens(refreshResponse.access, refreshResponse.refresh);
      } catch (error) {
        tokenManager.clearTokens();
        throw new Error('Token refresh failed');
      }
    }
    
    return originalRequest(endpoint, options);
  };
  
  return apiClient;
};

export { apiClient, tokenManager, createAuthenticatedClient, apiEndpoints };
export default createAuthenticatedClient();

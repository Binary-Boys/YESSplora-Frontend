// WebSocket service for real-time team progress updates
class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000;
    this.heartbeatInterval = null;
    this.listeners = new Map();
    this.messageQueue = [];
  }

  // Connect to WebSocket server
  connect(teamId, token) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    try {
      // Connect to local backend WebSocket server
      const wsUrl = `ws://localhost:8000?teamId=${teamId}&token=${token}`;
      this.socket = new WebSocket(wsUrl);
      
      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      this.handleConnectionError();
    }
  }

  // Mock WebSocket for development
  connectMock(teamId, token) {
    console.log('Connecting to mock WebSocket...');
    
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Emit connection event
      this.emit('connected', { teamId, token });
      
      // Start heartbeat
      this.startHeartbeat();
      
      // Process queued messages
      this.processMessageQueue();
      
      console.log('Mock WebSocket connected');
    }, 1000);
  }

  // Setup WebSocket event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.onopen = (event) => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      this.emit('connected', event);
      this.startHeartbeat();
      this.processMessageQueue();
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      this.isConnected = false;
      this.stopHeartbeat();
      
      this.emit('disconnected', event);
      
      // Attempt to reconnect if not a clean close
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.attemptReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };
  }

  // Handle incoming messages
  handleMessage(data) {
    const { type, payload } = data;
    
    switch (type) {
      case 'team_progress_update':
        this.emit('teamProgressUpdate', payload);
        break;
      case 'location_completed':
        this.emit('locationCompleted', payload);
        break;
      case 'score_updated':
        this.emit('scoreUpdated', payload);
        break;
      case 'team_member_update':
        this.emit('teamMemberUpdate', payload);
        break;
      case 'game_state_sync':
        this.emit('gameStateSync', payload);
        break;
      case 'pong':
        // Heartbeat response
        break;
      default:
        console.log('Unknown message type:', type, payload);
    }
  }

  // Send message through WebSocket
  send(type, payload) {
    const message = {
      type,
      payload,
      timestamp: new Date().toISOString()
    };

    if (this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      // Queue message for later
      this.messageQueue.push(message);
      console.log('Message queued (WebSocket not connected):', message);
    }
  }

  // Process queued messages
  processMessageQueue() {
    while (this.messageQueue.length > 0 && this.isConnected) {
      const message = this.messageQueue.shift();
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      }
    }
  }

  // Start heartbeat to keep connection alive
  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.send('ping', {});
      }
    }, 30000); // Send ping every 30 seconds
  }

  // Stop heartbeat
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Attempt to reconnect
  attemptReconnect() {
    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(() => {
      // Reconnect to local backend
      this.connect('team-001', 'mock-token');
    }, this.reconnectInterval);
  }

  // Handle connection error
  handleConnectionError() {
    this.isConnected = false;
    this.stopHeartbeat();
    this.emit('error', new Error('Connection failed'));
  }

  // Event listener management
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket event listener:', error);
        }
      });
    }
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Client disconnect');
      this.socket = null;
    }
    
    this.isConnected = false;
    this.stopHeartbeat();
    this.listeners.clear();
    this.messageQueue = [];
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      queuedMessages: this.messageQueue.length
    };
  }

  // Mock data for development
  startMockDataStream() {
    if (!import.meta.env.DEV) return;

    // Simulate periodic updates
    setInterval(() => {
      if (this.isConnected) {
        // Simulate team progress update
        this.emit('teamProgressUpdate', {
          teamId: 'team-001',
          completedLevels: [1, 2],
          totalScore: 150,
          timestamp: new Date().toISOString()
        });
      }
    }, 10000); // Every 10 seconds
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

export default websocketService;

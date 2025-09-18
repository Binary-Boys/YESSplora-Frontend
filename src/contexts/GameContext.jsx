import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  // Team information
  team: {
    name: 'Avengers',
    members: ['Achu', 'Kichu', 'Anju', 'Manju', 'Lechu'],
    id: null,
    ticketId: null
  },
  
  // Authentication
  auth: {
    isAuthenticated: false,
    ticketId: null,
    teamCode: null,
    isAdmin: false
  },
  
  // Game progress
  gameProgress: {
    currentLevel: 1,
    completedLevels: [],
    totalScore: 0,
    locations: {
      software: [1, 2, 3, 4], // 4 software game locations
      physical: [5, 6, 7, 8], // 4 physical game locations
      special: [9] // 1 special location
    },
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
  },
  
  // UI state
  ui: {
    showMinimap: false,
    showProfile: false,
    showQRScanner: false,
    showVolunteerScoring: false,
    showLeaderboard: false,
    showSupport: false,
    showRules: false,
    currentRule: 1,
    highestRuleScanned: 1,
    currentPopup: null
  },
  
  // Network state
  network: {
    isOnline: true,
    pendingSync: []
  }
};

  // Action types
const ActionTypes = {
  // Authentication
  SET_AUTH: 'SET_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  
  // Team management
  SET_TEAM: 'SET_TEAM',
  UPDATE_TEAM_MEMBERS: 'UPDATE_TEAM_MEMBERS',
  
  // Game progress
  UPDATE_GAME_PROGRESS: 'UPDATE_GAME_PROGRESS',
  COMPLETE_LOCATION: 'COMPLETE_LOCATION',
  UPDATE_SCORE: 'UPDATE_SCORE',
  SET_CURRENT_LEVEL: 'SET_CURRENT_LEVEL',
  COMPLETE_MINI_GAME: 'COMPLETE_MINI_GAME',
  
  // UI state
  TOGGLE_MINIMAP: 'TOGGLE_MINIMAP',
  TOGGLE_PROFILE: 'TOGGLE_PROFILE',
  TOGGLE_QR_SCANNER: 'TOGGLE_QR_SCANNER',
  TOGGLE_VOLUNTEER_SCORING: 'TOGGLE_VOLUNTEER_SCORING',
  TOGGLE_LEADERBOARD: 'TOGGLE_LEADERBOARD',
  TOGGLE_SUPPORT: 'TOGGLE_SUPPORT',
  TOGGLE_RULES: 'TOGGLE_RULES',
  SET_CURRENT_RULE: 'SET_CURRENT_RULE',
  SET_HIGHEST_RULE_SCANNED: 'SET_HIGHEST_RULE_SCANNED',
  SET_CURRENT_POPUP: 'SET_CURRENT_POPUP',
  CLOSE_ALL_POPUPS: 'CLOSE_ALL_POPUPS',
  
  // Network
  SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
  ADD_PENDING_SYNC: 'ADD_PENDING_SYNC',
  CLEAR_PENDING_SYNC: 'CLEAR_PENDING_SYNC',
  
  // Local storage
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
  SAVE_TO_STORAGE: 'SAVE_TO_STORAGE'
};

// Reducer
const gameReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH:
      return {
        ...state,
        auth: { ...state.auth, ...action.payload }
      };
      
    case ActionTypes.LOGIN:
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          ticketId: action.payload.ticketId,
          teamCode: action.payload.teamCode,
          isAdmin: action.payload.isAdmin || false
        }
      };
      
    case ActionTypes.LOGOUT:
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          ticketId: null,
          teamCode: null,
          isAdmin: false
        }
      };
      
    case ActionTypes.SET_TEAM:
      return {
        ...state,
        team: { ...state.team, ...action.payload }
      };
      
    case ActionTypes.UPDATE_TEAM_MEMBERS:
      return {
        ...state,
        team: {
          ...state.team,
          members: action.payload
        }
      };
      
    case ActionTypes.UPDATE_GAME_PROGRESS:
      return {
        ...state,
        gameProgress: { ...state.gameProgress, ...action.payload }
      };
      
    case ActionTypes.COMPLETE_LOCATION:
      const { locationId, score, type } = action.payload;
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          locationStatus: {
            ...state.gameProgress.locationStatus,
            [locationId]: {
              completed: true,
              score: score || 0,
              type: type || state.gameProgress.locationStatus[locationId]?.type
            }
          },
          completedLevels: [...state.gameProgress.completedLevels, locationId],
          totalScore: state.gameProgress.totalScore + (score || 0)
        }
      };
      
    case ActionTypes.UPDATE_SCORE:
      const { locationId: locId, newScore } = action.payload;
      const currentLocation = state.gameProgress.locationStatus[locId];
      const scoreDifference = newScore - (currentLocation?.score || 0);
      
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          locationStatus: {
            ...state.gameProgress.locationStatus,
            [locId]: {
              ...currentLocation,
              score: newScore
            }
          },
          totalScore: state.gameProgress.totalScore + scoreDifference
        }
      };
      
    case ActionTypes.SET_CURRENT_LEVEL:
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          currentLevel: action.payload
        }
      };
      
    case ActionTypes.COMPLETE_MINI_GAME:
      const { gameId, score, level } = action.payload;
      const locationId = parseInt(gameId);
      const normalizedScore = Math.min(Math.max(score, 0), 10); // Ensure score is between 0-10
      
      // Log completion to console
      console.log('Mini-game completed:', {
        yessticketId: state.auth.ticketId,
        gameId: gameId,
        level: level,
        score: normalizedScore,
        timestamp: new Date().toISOString()
      });
      
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          locationStatus: {
            ...state.gameProgress.locationStatus,
            [locationId]: {
              completed: true,
              score: normalizedScore,
              type: 'software'
            }
          },
          completedLevels: state.gameProgress.completedLevels.includes(locationId) 
            ? state.gameProgress.completedLevels 
            : [...state.gameProgress.completedLevels, locationId],
          totalScore: state.gameProgress.totalScore + normalizedScore
        }
      };
      
    case ActionTypes.TOGGLE_MINIMAP:
      return {
        ...state,
        ui: {
          ...state.ui,
          showMinimap: !state.ui.showMinimap,
          showProfile: false,
          showQRScanner: false,
          showVolunteerScoring: false,
          currentPopup: state.ui.showMinimap ? null : 'minimap'
        }
      };
      
    case ActionTypes.TOGGLE_PROFILE:
      return {
        ...state,
        ui: {
          ...state.ui,
          showProfile: !state.ui.showProfile,
          showMinimap: false,
          showQRScanner: false,
          showVolunteerScoring: false,
          currentPopup: state.ui.showProfile ? null : 'profile'
        }
      };
      
    case ActionTypes.TOGGLE_QR_SCANNER:
      return {
        ...state,
        ui: {
          ...state.ui,
          showQRScanner: !state.ui.showQRScanner,
          showMinimap: false,
          showProfile: false,
          showVolunteerScoring: false,
          currentPopup: state.ui.showQRScanner ? null : 'qrscanner'
        }
      };
      
    case ActionTypes.TOGGLE_VOLUNTEER_SCORING:
      return {
        ...state,
        ui: {
          ...state.ui,
          showVolunteerScoring: !state.ui.showVolunteerScoring,
          showMinimap: false,
          showProfile: false,
          showQRScanner: false,
          showLeaderboard: false,
          currentPopup: state.ui.showVolunteerScoring ? null : 'volunteer'
        }
      };
      
    case ActionTypes.TOGGLE_LEADERBOARD:
      return {
        ...state,
        ui: {
          ...state.ui,
          showLeaderboard: !state.ui.showLeaderboard,
          showMinimap: false,
          showProfile: false,
          showQRScanner: false,
          showVolunteerScoring: false,
          showSupport: false,
          currentPopup: state.ui.showLeaderboard ? null : 'leaderboard'
        }
      };
      
    case ActionTypes.TOGGLE_SUPPORT:
      return {
        ...state,
        ui: {
          ...state.ui,
          showSupport: !state.ui.showSupport,
          showMinimap: false,
          showProfile: false,
          showQRScanner: false,
          showVolunteerScoring: false,
          showLeaderboard: false,
          showRules: false,
          currentPopup: state.ui.showSupport ? null : 'support'
        }
      };
      
    case ActionTypes.TOGGLE_RULES:
      return {
        ...state,
        ui: {
          ...state.ui,
          showRules: !state.ui.showRules,
          showMinimap: false,
          showProfile: false,
          showQRScanner: false,
          showVolunteerScoring: false,
          showLeaderboard: false,
          showSupport: false,
          currentPopup: state.ui.showRules ? null : 'rules'
        }
      };
      
    case ActionTypes.SET_CURRENT_RULE:
      return {
        ...state,
        ui: {
          ...state.ui,
          currentRule: action.payload
        }
      };
      
    case ActionTypes.SET_HIGHEST_RULE_SCANNED:
      return {
        ...state,
        ui: {
          ...state.ui,
          highestRuleScanned: Math.max(state.ui.highestRuleScanned, action.payload)
        }
      };
      
    case ActionTypes.SET_CURRENT_POPUP:
      return {
        ...state,
        ui: {
          showMinimap: action.payload === 'minimap',
          showProfile: action.payload === 'profile',
          showQRScanner: action.payload === 'qrscanner',
          showVolunteerScoring: action.payload === 'volunteer',
          currentPopup: action.payload
        }
      };
      
    case ActionTypes.CLOSE_ALL_POPUPS:
      return {
        ...state,
        ui: {
          showMinimap: false,
          showProfile: false,
          showQRScanner: false,
          showVolunteerScoring: false,
          showLeaderboard: false,
          showSupport: false,
          showRules: false,
          currentPopup: null
        }
      };
      
    case ActionTypes.SET_ONLINE_STATUS:
      return {
        ...state,
        network: {
          ...state.network,
          isOnline: action.payload
        }
      };
      
    case ActionTypes.ADD_PENDING_SYNC:
      return {
        ...state,
        network: {
          ...state.network,
          pendingSync: [...state.network.pendingSync, action.payload]
        }
      };
      
    case ActionTypes.CLEAR_PENDING_SYNC:
      return {
        ...state,
        network: {
          ...state.network,
          pendingSync: []
        }
      };
      
    case ActionTypes.LOAD_FROM_STORAGE:
      return {
        ...state,
        ...action.payload
      };
      
    default:
      return state;
  }
};

// Context
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('yessplora-game-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: ActionTypes.LOAD_FROM_STORAGE, payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('yessplora-game-state', JSON.stringify(state));
  }, [state]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => dispatch({ type: ActionTypes.SET_ONLINE_STATUS, payload: true });
    const handleOffline = () => dispatch({ type: ActionTypes.SET_ONLINE_STATUS, payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Action creators
  const actions = {
    // Authentication
    setAuth: (authData) => dispatch({ type: ActionTypes.SET_AUTH, payload: authData }),
    login: (ticketId, teamCode, isAdmin = false) => dispatch({ type: ActionTypes.LOGIN, payload: { ticketId, teamCode, isAdmin } }),
    logout: () => dispatch({ type: ActionTypes.LOGOUT }),
    
    // Team management
    setTeam: (teamData) => dispatch({ type: ActionTypes.SET_TEAM, payload: teamData }),
    updateTeamMembers: (members) => dispatch({ type: ActionTypes.UPDATE_TEAM_MEMBERS, payload: members }),
    
    // Game progress
    updateGameProgress: (progress) => dispatch({ type: ActionTypes.UPDATE_GAME_PROGRESS, payload: progress }),
    completeLocation: (locationId, score, type) => dispatch({ 
      type: ActionTypes.COMPLETE_LOCATION, 
      payload: { locationId, score, type } 
    }),
    updateScore: (locationId, newScore) => dispatch({ 
      type: ActionTypes.UPDATE_SCORE, 
      payload: { locationId: locationId, newScore } 
    }),
    setCurrentLevel: (level) => dispatch({ type: ActionTypes.SET_CURRENT_LEVEL, payload: level }),
    completeMiniGame: (gameId, score, level) => dispatch({ 
      type: ActionTypes.COMPLETE_MINI_GAME, 
      payload: { gameId, score, level } 
    }),
    
    // UI state
    toggleMinimap: () => dispatch({ type: ActionTypes.TOGGLE_MINIMAP }),
    toggleProfile: () => dispatch({ type: ActionTypes.TOGGLE_PROFILE }),
    toggleQRScanner: () => dispatch({ type: ActionTypes.TOGGLE_QR_SCANNER }),
    toggleVolunteerScoring: () => dispatch({ type: ActionTypes.TOGGLE_VOLUNTEER_SCORING }),
    toggleLeaderboard: () => dispatch({ type: ActionTypes.TOGGLE_LEADERBOARD }),
    toggleSupport: () => dispatch({ type: ActionTypes.TOGGLE_SUPPORT }),
    toggleRules: () => dispatch({ type: ActionTypes.TOGGLE_RULES }),
  setCurrentRule: (rule) => dispatch({ type: ActionTypes.SET_CURRENT_RULE, payload: rule }),
  setHighestRuleScanned: (rule) => dispatch({ type: ActionTypes.SET_HIGHEST_RULE_SCANNED, payload: rule }),
  setCurrentPopup: (popup) => dispatch({ type: ActionTypes.SET_CURRENT_POPUP, payload: popup }),
  closeAllPopups: () => dispatch({ type: ActionTypes.CLOSE_ALL_POPUPS }),
    
    // Network
    setOnlineStatus: (isOnline) => dispatch({ type: ActionTypes.SET_ONLINE_STATUS, payload: isOnline }),
    addPendingSync: (data) => dispatch({ type: ActionTypes.ADD_PENDING_SYNC, payload: data }),
    clearPendingSync: () => dispatch({ type: ActionTypes.CLEAR_PENDING_SYNC })
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;

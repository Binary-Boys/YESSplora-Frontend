import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

const useGameStore = create(
  persist(
    (set, get) => ({
      // Game state
      isInitialized: false,
      gameStartTime: null,
      gameEndTime: null,
      
      // Game data
      levels: [],
      qrCodes: {
        teams: [],
        stalls: [],
        treasures: [],
      },
      leaderboard: [],
      
      // Game settings
      settings: {
        maxTeams: 30,
        maxStalls: 30,
        maxTreasures: 10,
        pointsPerStall: 5,
        pointsPerTeamQR: 3,
        pointsPerLevel: 10,
      },
      
      // Actions
      initializeGame: () => {
        const levels = [
          {
            id: 1,
            name: "Campus Orientation",
            description: "Explore the campus and find your first checkpoint",
            type: "physical",
            required: "QR scan at main entrance",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 2,
            name: "Digital Challenge",
            description: "Complete the online puzzle challenge",
            type: "software",
            required: "Solve the puzzle",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 3,
            name: "Library Quest",
            description: "Navigate to the library and scan the QR code",
            type: "physical",
            required: "QR scan at library",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 4,
            name: "Code Breaker",
            description: "Decrypt the hidden message",
            type: "software",
            required: "Decrypt the code",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 5,
            name: "Sports Arena",
            description: "Visit the sports complex and complete the challenge",
            type: "physical",
            required: "QR scan at sports complex",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 6,
            name: "Logic Puzzle",
            description: "Solve the mathematical puzzle",
            type: "software",
            required: "Solve the puzzle",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 7,
            name: "Canteen Hunt",
            description: "Find the hidden QR code in the canteen area",
            type: "physical",
            required: "QR scan at canteen",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 8,
            name: "Final Challenge",
            description: "Complete the ultimate software challenge",
            type: "software",
            required: "Complete the challenge",
            points: 10,
            isUnlocked: true,
          },
          {
            id: 9,
            name: "Treasure Hunt Finale",
            description: "Find the ultimate treasure using all your skills",
            type: "treasure",
            required: "Find the treasure QR",
            points: 50,
            isUnlocked: false,
          },
        ];
        
        const qrCodes = {
          teams: Array.from({ length: 30 }, (_, i) => ({
            id: `team_${i + 1}`,
            type: 'team',
            name: `Team ${i + 1}`,
            points: 3,
            description: `Scan ${i + 1} team's QR code`,
          })),
          stalls: Array.from({ length: 30 }, (_, i) => ({
            id: `stall_${i + 1}`,
            type: 'stall',
            name: `Stall ${i + 1}`,
            points: 5,
            description: `Visit stall ${i + 1}`,
            location: `Location ${i + 1}`,
          })),
          treasures: Array.from({ length: 10 }, (_, i) => ({
            id: `treasure_${i + 1}`,
            type: 'treasure',
            name: `Treasure ${i + 1}`,
            points: 10,
            priority: i + 1,
            description: `Find treasure ${i + 1}`,
            location: `Hidden location ${i + 1}`,
          })),
        };
        
        set({
          levels,
          qrCodes,
          isInitialized: true,
          gameStartTime: new Date().toISOString(),
        });
      },
      
      unlockLevel: (levelId) => {
        set((state) => ({
          levels: state.levels.map(level =>
            level.id === levelId
              ? { ...level, isUnlocked: true }
              : level
          ),
        }));
      },
      
      completeLevel: (levelId) => {
        set((state) => ({
          levels: state.levels.map(level =>
            level.id === levelId
              ? { ...level, isCompleted: true }
              : level
          ),
        }));
        
        // Unlock next level if it exists
        const nextLevel = get().levels.find(level => level.id === levelId + 1);
        if (nextLevel) {
          get().unlockLevel(levelId + 1);
        }
        
        // Unlock treasure hunt if all other levels are completed
        const completedLevels = get().levels.filter(level => 
          level.id !== 9 && level.isCompleted
        );
        if (completedLevels.length === 8) {
          get().unlockLevel(9);
        }
      },
      
      scanQRCode: (qrId) => {
        const { qrCodes } = get();
        const qrCode = [...qrCodes.teams, ...qrCodes.stalls, ...qrCodes.treasures]
          .find(qr => qr.id === qrId);
        
        if (!qrCode) {
          toast.error('Invalid QR code');
          return false;
        }
        
        // Check if already scanned
        const { isQRScanned } = useAuthStore.getState();
        if (isQRScanned(qrId)) {
          toast.error('QR code already scanned');
          return false;
        }
        
        // Add points
        const { addPoints, scanQR } = useAuthStore.getState();
        addPoints(qrCode.points);
        scanQR(qrCode);
        
        toast.success(`+${qrCode.points} points! ${qrCode.description}`);
        return true;
      },
      
      updateLeaderboard: (teams) => {
        const sortedTeams = teams
          .sort((a, b) => b.points - a.points)
          .map((team, index) => ({
            ...team,
            rank: index + 1,
          }));
        
        set({ leaderboard: sortedTeams });
      },
      
      getTeamStats: (teamId) => {
        const { levels } = get();
        const { team } = useAuthStore.getState();
        
        if (!team || team.id !== teamId) return null;
        
        const completedLevels = levels.filter(level => 
          team.completedLevels.includes(level.id)
        );
        
        const scannedQRs = team.scannedQRs || [];
        const teamQRs = scannedQRs.filter(qr => qr.type === 'team');
        const stallQRs = scannedQRs.filter(qr => qr.type === 'stall');
        const treasureQRs = scannedQRs.filter(qr => qr.type === 'treasure');
        
        return {
          team,
          points: team.points,
          completedLevels: completedLevels.length,
          totalLevels: levels.length - 1, // Exclude treasure hunt
          scannedQRs: scannedQRs.length,
          teamQRs: teamQRs.length,
          stallQRs: stallQRs.length,
          treasureQRs: treasureQRs.length,
          currentLevel: team.currentLevel,
          rank: get().getTeamRank(teamId),
        };
      },
      
      getTeamRank: (teamId) => {
        const { leaderboard } = get();
        const team = leaderboard.find(t => t.id === teamId);
        return team ? team.rank : null;
      },
      
      getGameProgress: () => {
        const { levels } = get();
        const { team } = useAuthStore.getState();
        
        if (!team) return null;
        
        const completedLevels = levels.filter(level => 
          team.completedLevels.includes(level.id)
        );
        
        const progress = {
          totalLevels: levels.length,
          completedLevels: completedLevels.length,
          percentage: Math.round((completedLevels.length / levels.length) * 100),
          currentLevel: team.currentLevel,
          points: team.points,
        };
        
        return progress;
      },
      
      getAvailableQRs: () => {
        const { qrCodes } = get();
        const { team } = useAuthStore.getState();
        
        if (!team) return [];
        
        const scannedQRIds = team.scannedQRs.map(qr => qr.id);
        
        return [
          ...qrCodes.teams.filter(qr => !scannedQRIds.includes(qr.id)),
          ...qrCodes.stalls.filter(qr => !scannedQRIds.includes(qr.id)),
          ...qrCodes.treasures.filter(qr => !scannedQRIds.includes(qr.id)),
        ];
      },
      
      endGame: () => {
        set({ gameEndTime: new Date().toISOString() });
      },
      
      resetGame: () => {
        set({
          isInitialized: false,
          gameStartTime: null,
          gameEndTime: null,
          levels: [],
          qrCodes: { teams: [], stalls: [], treasures: [] },
          leaderboard: [],
        });
      },
      
      // Utility functions
      getLevelById: (levelId) => {
        const { levels } = get();
        return levels.find(level => level.id === levelId);
      },
      
      getQRById: (qrId) => {
        const { qrCodes } = get();
        return [...qrCodes.teams, ...qrCodes.stalls, ...qrCodes.treasures]
          .find(qr => qr.id === qrId);
      },
      
      getTopTeams: (limit = 10) => {
        const { leaderboard } = get();
        return leaderboard.slice(0, limit);
      },
    }),
    {
      name: 'yessplora-game',
      partialize: (state) => ({
        isInitialized: state.isInitialized,
        gameStartTime: state.gameStartTime,
        gameEndTime: state.gameEndTime,
        levels: state.levels,
        qrCodes: state.qrCodes,
        leaderboard: state.leaderboard,
        settings: state.settings,
      }),
    }
  )
);

export { useGameStore };


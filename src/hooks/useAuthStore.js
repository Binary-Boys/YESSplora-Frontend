import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { validateTeamRegistration } from '../utils/validation';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      isAuthenticated: false,
      isAdmin: false,
      hasCompletedTutorial: false,
      
      // User data
      user: null,
      team: null,
      
      // Team registration data
      registrationData: {
        teamName: '',
        ticketNumber: '',
        members: [
          { name: '', ticketNumber: '' },
          { name: '', ticketNumber: '' },
          { name: '', ticketNumber: '' },
          { name: '', ticketNumber: '' },
          { name: '', ticketNumber: '' }
        ], // Up to 5 members with name and ticketNumber
      },
      
      // Actions
      login: (userData) => {
        set({
          isAuthenticated: true,
          user: userData,
          isAdmin: userData.role === 'admin',
        });
        toast.success('Welcome to YESSplora!');
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          isAdmin: false,
          user: null,
          team: null,
          hasCompletedTutorial: false,
        });
        toast.success('Logged out successfully');
      },
      
      registerTeam: (teamData) => {
        // Use comprehensive validation
        const validation = validateTeamRegistration(teamData);
        
        if (!validation.isValid) {
          // Show first error message
          const firstError = Object.values(validation.errors)[0];
          toast.error(firstError);
          return false;
        }
        
        const { teamName, members } = teamData;
        
        const validMembers = members.filter(member => 
          member.name && member.name.trim() !== '' && 
          member.ticketNumber && member.ticketNumber.trim() !== ''
        );
        
        // Create team object
        const team = {
          id: `team_${Date.now()}`,
          name: teamName.trim(),
          ticketNumber: validMembers[0].ticketNumber.trim(), // Use first member's ticket as team ticket
          members: validMembers.map(member => ({
            name: member.name.trim(),
            ticketNumber: member.ticketNumber.trim()
          })),
          createdAt: new Date().toISOString(),
          points: 0,
          completedLevels: [],
          scannedQRs: [],
          currentLevel: 1,
        };
        
        // Create user object
        const user = {
          id: `user_${Date.now()}`,
          teamId: team.id,
          role: 'player',
          createdAt: new Date().toISOString(),
        };
        
        set({
          isAuthenticated: true,
          user,
          team,
          isAdmin: false,
        });
        
        toast.success(`Team "${teamName}" registered successfully!`);
        return true;
      },
      
      updateRegistrationData: (field, value) => {
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            [field]: value,
          },
        }));
      },
      
      updateTeamMember: (index, field, value) => {
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            members: state.registrationData.members.map((member, i) => 
              i === index ? { ...member, [field]: value } : member
            ),
          },
        }));
      },
      
      completeTutorial: () => {
        set({ hasCompletedTutorial: true });
      },
      
      updateTeam: (updates) => {
        set((state) => ({
          team: {
            ...state.team,
            ...updates,
          },
        }));
      },
      
      addPoints: (points) => {
        set((state) => ({
          team: {
            ...state.team,
            points: (state.team?.points || 0) + points,
          },
        }));
      },
      
      completeLevel: (levelId) => {
        set((state) => ({
          team: {
            ...state.team,
            completedLevels: [...(state.team?.completedLevels || []), levelId],
            currentLevel: Math.max(state.team?.currentLevel || 1, levelId + 1),
          },
        }));
      },
      
      scanQR: (qrData) => {
        set((state) => ({
          team: {
            ...state.team,
            scannedQRs: [...(state.team?.scannedQRs || []), qrData],
          },
        }));
      },
      
      // Admin actions
      adminLogin: (adminData) => {
        set({
          isAuthenticated: true,
          isAdmin: true,
          user: {
            ...adminData,
            role: 'admin',
          },
        });
        toast.success('Admin access granted');
      },
      
      // Team login function
      teamLogin: (teamName, adminTicketNumber) => {
        // Validate inputs
        if (!teamName || !teamName.trim()) {
          toast.error('Team name is required');
          return false;
        }
        
        if (!adminTicketNumber || !adminTicketNumber.trim()) {
          toast.error('Admin ticket number is required');
          return false;
        }
        
        // Validate ticket number format (7 digits)
        if (!/^\d{7}$/.test(adminTicketNumber.trim())) {
          toast.error('Admin ticket number must be exactly 7 digits');
          return false;
        }
        
        // Check if admin ticket number is valid (you can add more validation here)
        // For now, we'll use a simple check - you can modify this as needed
        const validAdminTickets = ['1234567', '0000000', '9999999']; // Add your admin ticket numbers here
        
        if (!validAdminTickets.includes(adminTicketNumber.trim())) {
          toast.error('Invalid admin ticket number');
          return false;
        }
        
        // Create team object for login
        const team = {
          id: `team_${Date.now()}`,
          name: teamName.trim(),
          ticketNumber: adminTicketNumber.trim(),
          members: [
            {
              name: 'Team Leader',
              ticketNumber: adminTicketNumber.trim()
            }
          ],
          createdAt: new Date().toISOString(),
          points: 0,
          completedLevels: [],
          scannedQRs: [],
          currentLevel: 1,
        };
        
        // Create user object
        const user = {
          id: `user_${Date.now()}`,
          teamId: team.id,
          role: 'player',
          createdAt: new Date().toISOString(),
        };
        
        set({
          isAuthenticated: true,
          user,
          team,
          isAdmin: false,
        });
        
        toast.success(`Team "${teamName}" logged in successfully!`);
        return true;
      },
      
      // Utility functions
      isQRScanned: (qrId) => {
        const { team } = get();
        return team?.scannedQRs?.some(qr => qr.id === qrId) || false;
      },
      
      isLevelCompleted: (levelId) => {
        const { team } = get();
        return team?.completedLevels?.includes(levelId) || false;
      },
      
      getTeamRank: () => {
        // This would be calculated based on all teams' data
        // For now, return a placeholder
        return 1;
      },
      
      resetGame: () => {
        set((state) => ({
          team: {
            ...state.team,
            points: 0,
            completedLevels: [],
            scannedQRs: [],
            currentLevel: 1,
          },
          hasCompletedTutorial: false,
        }));
        toast.success('Game progress reset');
      },
    }),
    {
      name: 'yessplora-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        hasCompletedTutorial: state.hasCompletedTutorial,
        user: state.user,
        team: state.team,
        registrationData: state.registrationData,
      }),
    }
  )
);

export { useAuthStore };


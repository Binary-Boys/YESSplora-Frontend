import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../hooks/useAuthStore';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users,
  Star,
  Target,
  Award
} from 'lucide-react';

const LeaderboardScreen = () => {
  const { team } = useAuthStore();
  const [topTeams, setTopTeams] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    // Simulate leaderboard data (replace with actual API call)
    const mockTeams = [
      { id: 'team_1', name: 'Tech Titans', points: 245, rank: 1, members: ['Alice', 'Bob', 'Charlie'] },
      { id: 'team_2', name: 'Code Crushers', points: 230, rank: 2, members: ['David', 'Eve', 'Frank'] },
      { id: 'team_3', name: 'Digital Dragons', points: 215, rank: 3, members: ['Grace', 'Henry', 'Ivy'] },
      { id: 'team_4', name: 'Pixel Pirates', points: 200, rank: 4, members: ['Jack', 'Kate', 'Liam'] },
      { id: 'team_5', name: 'Byte Busters', points: 185, rank: 5, members: ['Mia', 'Noah', 'Olivia'] },
      { id: 'team_6', name: 'Data Dynamos', points: 170, rank: 6, members: ['Paul', 'Quinn', 'Ruby'] },
      { id: 'team_7', name: 'Algorithm Avengers', points: 155, rank: 7, members: ['Sam', 'Tara', 'Uma'] },
      { id: 'team_8', name: 'Binary Bandits', points: 140, rank: 8, members: ['Victor', 'Wendy', 'Xander'] },
      { id: 'team_9', name: 'Cyber Seekers', points: 125, rank: 9, members: ['Yara', 'Zoe', 'Alex'] },
      { id: 'team_10', name: 'Logic Legends', points: 110, rank: 10, members: ['Ben', 'Cara', 'Dan'] },
    ];
    
    setTopTeams(mockTeams);
    
    // Find user's team rank
    if (team) {
      const userTeamRank = mockTeams.find(t => t.id === team.id);
      setUserRank(userTeamRank ? userTeamRank.rank : null);
    }
  }, [team]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default:
        return 'bg-white/70 backdrop-blur-sm border border-white/20';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-display font-bold text-gray-800">Leaderboard</h1>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-accent-500" />
            <span className="text-sm font-medium text-gray-600">
              Top 50 Teams
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          See how your team ranks against others in the treasure hunt
        </p>
      </motion.div>

      {/* User Team Stats */}
      {team && (
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{team.name}</h3>
              <p className="text-sm opacity-90">
                {team.members?.join(', ') || 'No members'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{team.points || 0} pts</div>
              {userRank && (
                <div className="text-sm opacity-90">Rank #{userRank}</div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Teams */}
      <div className="space-y-3">
        {topTeams.map((teamData, index) => (
          <motion.div
            key={teamData.id}
            className={`rounded-xl p-4 transition-all duration-200 hover:shadow-lg ${
              getRankColor(teamData.rank)
            }`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(teamData.rank)}
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    teamData.rank <= 3 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {teamData.rank}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      teamData.rank <= 3 ? 'text-white' : 'text-gray-800'
                    }`}>
                      {teamData.name}
                    </h3>
                    <p className={`text-xs ${
                      teamData.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {teamData.members?.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  teamData.rank <= 3 ? 'text-white' : 'text-gray-800'
                }`}>
                  {teamData.points} pts
                </div>
                <div className={`text-xs ${
                  teamData.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                }`}>
                  Level {Math.floor(teamData.points / 10) + 1}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`w-full rounded-full h-1 mt-3 ${
              teamData.rank <= 3 ? 'bg-white/20' : 'bg-gray-200'
            }`}>
              <div 
                className={`h-1 rounded-full ${
                  teamData.rank <= 3 
                    ? 'bg-white' 
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                }`}
                style={{ width: `${(teamData.points / 300) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        className="mt-8 grid grid-cols-2 gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
          <Users className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">30</div>
          <div className="text-sm text-gray-600">Total Teams</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
          <Target className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">245</div>
          <div className="text-sm text-gray-600">Highest Score</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
          <Star className="w-8 h-8 text-accent-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">9</div>
          <div className="text-sm text-gray-600">Total Levels</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
          <Award className="w-8 h-8 text-success-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">70</div>
          <div className="text-sm text-gray-600">QR Codes</div>
        </div>
      </motion.div>

      {/* Refresh Notice */}
      <motion.div
        className="text-center mt-6 p-4 bg-blue-50 rounded-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p className="text-sm text-blue-600">
          Leaderboard updates every 30 seconds
        </p>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;

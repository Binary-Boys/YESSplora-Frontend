import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import NeonHalo from '../Animation/NeonHalo';
import AdminLoginIcon from './AdminLoginIcon';
import { 
  Users, 
  Shield, 
  ArrowRight, 
  Trophy, 
  MapPin, 
  QrCode,
  Gamepad2,
  Sparkles,
  User,
  Ticket
} from 'lucide-react';

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { registerTeam, teamLogin, updateRegistrationData, updateTeamMember, registrationData } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (activeTab === 'register') {
        const success = registerTeam(registrationData);
        if (success) {
          // Registration successful, redirect to tutorial
          setTimeout(() => {
            navigate('/tutorial');
          }, 1000);
        }
      } else {
        // Handle team login
        const success = teamLogin(registrationData.teamName, registrationData.ticketNumber);
        if (success) {
          // Login successful, redirect to tutorial or home
          setTimeout(() => {
            navigate('/tutorial');
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    updateRegistrationData(field, value);
  };

  const handleMemberChange = (index, field, value) => {
    updateTeamMember(index, field, value);
  };

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      {/* Admin Login Icon */}
      <AdminLoginIcon />
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <NeonHalo intensity={1.2}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-bg-primary rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-8 h-8 text-neutral-light" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  YESSplora
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">Campus Treasure Hunt</p>
              </div>
            </div>
          </NeonHalo>
          
          <p className="text-neutral-light text-opacity-80 text-sm">
            Join the ultimate campus adventure and discover hidden treasures!
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <NeonHalo intensity={0.8}>
            <div className="glass-effect rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-primary-accent mx-auto mb-2" />
              <p className="text-xs font-medium text-neutral-light">9 Levels</p>
            </div>
          </NeonHalo>
          <NeonHalo intensity={0.8}>
            <div className="glass-effect rounded-lg p-4 text-center">
              <QrCode className="w-6 h-6 text-primary-accent mx-auto mb-2" />
              <p className="text-xs font-medium text-neutral-light">70 QR Codes</p>
            </div>
          </NeonHalo>
          <NeonHalo intensity={0.8}>
            <div className="glass-effect rounded-lg p-4 text-center">
              <MapPin className="w-6 h-6 text-primary-accent mx-auto mb-2" />
              <p className="text-xs font-medium text-neutral-light">Campus Map</p>
            </div>
          </NeonHalo>
          <NeonHalo intensity={0.8}>
            <div className="glass-effect rounded-lg p-4 text-center">
              <Gamepad2 className="w-6 h-6 text-primary-accent mx-auto mb-2" />
              <p className="text-xs font-medium text-neutral-light">3D Games</p>
            </div>
          </NeonHalo>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="glass-effect rounded-xl p-1 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex">
            <NeonHalo intensity={1}>
              <button
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'register'
                    ? 'bg-gradient-bg-primary text-neutral-light'
                    : 'text-neutral-light text-opacity-70 hover:text-opacity-100'
                }`}
                onClick={() => setActiveTab('register')}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Team Registration
              </button>
            </NeonHalo>
            <NeonHalo intensity={1}>
              <button
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-gradient-bg-primary text-neutral-light'
                    : 'text-neutral-light text-opacity-70 hover:text-opacity-100'
                }`}
                onClick={() => setActiveTab('login')}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Team Login
              </button>
            </NeonHalo>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'register' ? (
              <>
                {/* Team Name */}
                <div>
                  <label className="block text-neutral-light text-sm font-medium mb-2">
                    Team Name
                  </label>
                  <NeonHalo intensity={0.6}>
                    <input
                      type="text"
                      value={registrationData.teamName || ''}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="Enter your team name"
                      required
                    />
                  </NeonHalo>
                </div>

                {/* Team Members */}
                <div>
                  <label className="block text-neutral-light text-sm font-medium mb-4">
                    Team Members (1-5)
                  </label>
                  <div className="space-y-4">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <NeonHalo key={index} intensity={0.5}>
                        <motion.div
                          className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-bg-primary rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-neutral-light" />
                            </div>
                            <h3 className="text-neutral-light font-medium">
                              Member {index + 1}{index === 0 ? ' (Team Leader)' : ''}
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Member Name */}
                            <div>
                              <label className="block text-neutral-light text-xs font-medium mb-2">
                                Full Name
                              </label>
                              <input
                                type="text"
                                value={registrationData.members[index]?.name || ''}
                                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors text-sm"
                                placeholder={`Enter member ${index + 1} name`}
                                required={index === 0}
                              />
                            </div>
                            
                            {/* Member Ticket Number */}
                            <div>
                              <label className="block text-neutral-light text-xs font-medium mb-2">
                                Ticket Number
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={registrationData.members[index]?.ticketNumber || ''}
                                  onChange={(e) => handleMemberChange(index, 'ticketNumber', e.target.value)}
                                  className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors text-sm pr-10"
                                  placeholder={`1234567`}
                                  required={index === 0}
                                />
                                <Ticket className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-light text-opacity-50" />
                              </div>
                            </div>
                          </div>
                          
                          {index === 0 && (
                            <p className="text-xs text-neutral-light text-opacity-60 mt-2">
                              Team leader is required. Other members are optional.
                            </p>
                          )}
                        </motion.div>
                      </NeonHalo>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Team Login */}
                <div>
                  <label className="block text-neutral-light text-sm font-medium mb-2">
                    Team Name
                  </label>
                  <NeonHalo intensity={0.6}>
                    <input
                      type="text"
                      value={registrationData.teamName || ''}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="Enter your team name"
                      required
                    />
                  </NeonHalo>
                </div>

                {/* Admin Ticket Number */}
                <div>
                  <label className="block text-neutral-light text-sm font-medium mb-2">
                    Admin Ticket Number
                  </label>
                  <NeonHalo intensity={0.6}>
                    <input
                      type="text"
                      value={registrationData.ticketNumber || ''}
                      onChange={(e) => handleInputChange('ticketNumber', e.target.value)}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="1234567"
                      required
                    />
                  </NeonHalo>
                  <p className="text-neutral-light text-opacity-60 text-xs mt-1">
                    Use the admin's 7-digit ticket number to login
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <NeonHalo intensity={1.5}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-bg-primary text-neutral-light rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-neutral-light border-t-transparent rounded-full animate-spin mr-2"></div>
                    {activeTab === 'register' ? 'Registering...' : 'Logging in...'}
                  </div>
                ) : (
                  <>
                    {activeTab === 'register' ? 'Register Team' : 'Login'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </NeonHalo>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-neutral-light text-opacity-60 text-sm">
            By continuing, you agree to our{' '}
            <button type="button" className="text-primary-accent hover:underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary-accent hover:underline">
              Privacy Policy
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;

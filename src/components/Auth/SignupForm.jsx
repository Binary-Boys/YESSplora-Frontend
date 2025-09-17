import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const SignupForm = ({ onBackClick, onSignupSuccess, onRedirectToLogin }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Team Lead, 2: Team Members
  const [teamData, setTeamData] = useState({
    teamName: '',
    mobileNo: '',
    yessTicketId: '',
    password: '',
    confirmPassword: ''
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMemberCount, setSelectedMemberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTeamDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value);
    setSelectedMemberCount(count);
    
    // Create or remove team members based on selection
    const newMembers = [];
    for (let i = 0; i < count; i++) {
      newMembers.push({
        id: i + 1,
        name: '',
        email: '',
        mobile: ''
      });
    }
    setTeamMembers(newMembers);
  };

  const handleMemberChange = (id, field, value) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleNextStep = () => {
    // Validate team lead data
    if (!teamData.teamName.trim() || !teamData.mobileNo.trim() || 
        !teamData.yessTicketId.trim() || !teamData.password.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (teamData.password !== teamData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setCurrentStep(2);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Signup data:', { teamData, teamMembers });
      
      // Redirect to login page instead of directly to game
      if (onRedirectToLogin) {
        onRedirectToLogin();
      }
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        onClick={onBackClick}
        style={{
          background: 'none',
          border: 'none',
          color: theme.colors.accent,
          fontSize: '1.1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '30px',
          transition: theme.transitions.fast
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.8';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '1';
        }}
      >
        ← Back to Login
      </motion.button>

      {/* Signup Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '25px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Form Header */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2
            style={{
              fontSize: '2.2rem',
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.accent,
              marginBottom: '10px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            {currentStep === 1 ? 'Create Team' : 'Add Team Members'}
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: theme.colors.text,
              opacity: 0.9
            }}
          >
            {currentStep === 1 
              ? 'Register as team lead to start your adventure' 
              : 'Add team members to your squad'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '25px',
              color: '#ff6b6b',
              fontSize: '0.95rem',
              textAlign: 'center'
            }}
          >
            {error}
          </motion.div>
        )}

        {currentStep === 1 ? (
          /* Team Lead Information */
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
            {/* Team Name */}
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.accent,
                  marginBottom: '8px'
                }}
              >
                Team Name *
              </label>
              <input
                type="text"
                name="teamName"
                value={teamData.teamName}
                onChange={handleTeamDataChange}
                placeholder="Enter your team name"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.accent;
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.accent,
                  marginBottom: '8px'
                }}
              >
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={teamData.mobileNo}
                onChange={handleTeamDataChange}
                placeholder="Enter your mobile number"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.accent;
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* YESS Ticket ID */}
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.accent,
                  marginBottom: '8px'
                }}
              >
                YESS Ticket ID *
              </label>
              <input
                type="text"
                name="yessTicketId"
                value={teamData.yessTicketId}
                onChange={handleTeamDataChange}
                placeholder="Enter your YESS ticket ID"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.accent;
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.accent,
                  marginBottom: '8px'
                }}
              >
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={teamData.password}
                onChange={handleTeamDataChange}
                placeholder="Create a password"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.accent;
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '35px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.accent,
                  marginBottom: '8px'
                }}
              >
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={teamData.confirmPassword}
                onChange={handleTeamDataChange}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.accent;
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Next Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-button"
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(90deg, #c0c0c0 0%, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%, #c0c0c0 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                color: theme.colors.primary,
                fontSize: '1.1rem',
                fontWeight: theme.typography.fontWeight.bold,
                cursor: 'pointer',
                transition: theme.transitions.fast,
                boxShadow: theme.shadows.neumorphism.raised,
                letterSpacing: '1px'
              }}
            >
              ➡️ Add Team Members
            </motion.button>
          </form>
        ) : (
          /* Team Members */
          <div>
            {/* Member Count Dropdown */}
            <div style={{ marginBottom: '30px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.accent,
                  marginBottom: '12px'
                }}
              >
                Number of Team Members
              </label>
              <select
                value={selectedMemberCount}
                onChange={handleMemberCountChange}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: `2px solid ${theme.colors.accent}55`,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.accent;
                  e.target.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${theme.colors.accent}55`;
                  e.target.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)';
                }}
              >
                <option value={0}>No additional members (Team Lead only)</option>
                <option value={1}>1 team member</option>
                <option value={2}>2 team members</option>
                <option value={3}>3 team members</option>
                <option value={4}>4 team members</option>
              </select>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: theme.colors.textSecondary,
                  opacity: 0.7,
                  marginTop: '8px',
                  textAlign: 'center'
                }}
              >
                You can add up to 4 team members (excluding yourself as team lead)
              </p>
            </div>

            {/* Team Members List */}
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: theme.colors.accent, fontSize: '1.1rem', margin: 0 }}>
                    Team Member {index + 1}
                  </h4>
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: theme.colors.accent,
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: theme.colors.accent,
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile"
                    value={member.mobile}
                    onChange={(e) => handleMemberChange(member.id, 'mobile', e.target.value)}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: theme.colors.accent,
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="shimmer-button"
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '15px',
                border: 'none',
                background: isLoading 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'linear-gradient(90deg, #c0c0c0 0%, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%, #c0c0c0 100%)',
                backgroundSize: '200% 100%',
                animation: isLoading ? 'none' : 'shimmer 2s ease-in-out infinite',
                color: theme.colors.primary,
                fontSize: '1.1rem',
                fontWeight: theme.typography.fontWeight.bold,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: theme.transitions.fast,
                boxShadow: theme.shadows.neumorphism.raised,
                letterSpacing: '1px',
                opacity: isLoading ? 0.7 : 1,
                marginTop: '20px'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid currentColor',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  Creating Team...
                </div>
              ) : (
                '🚀 CREATE TEAM'
              )}
            </motion.button>
          </div>
        )}

        {/* Help Text */}
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <p
            style={{
              fontSize: '0.9rem',
              color: theme.colors.textSecondary,
              opacity: 0.8
            }}
          >
            Team lead can manage all team activities and progress
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;

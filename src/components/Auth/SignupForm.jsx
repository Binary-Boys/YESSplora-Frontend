import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { validateSignupData } from '../../utils/validation';

const SignupForm = ({ onBackClick, onSignupSuccess, onRedirectToLogin }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Team Lead, 2: Team Members
  const [teamData, setTeamData] = useState({
    team_name: '',
    team_id: '',
    password: '',
    confirmPassword: '',
    team_leader: {
      name: '',
      email: '',
      mobile_number: ''
    }
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMemberCount, setSelectedMemberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTeamDataChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('team_leader.')) {
      const field = name.split('.')[1];
      setTeamData(prev => ({
        ...prev,
        team_leader: {
          ...prev.team_leader,
          [field]: value
        }
      }));
    } else {
      setTeamData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (error) setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(true);
      setTimeout(() => setShowPassword(false), 5000);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(true);
      setTimeout(() => setShowConfirmPassword(false), 5000);
    }
  };

  const handleNextStep = async () => {
    // Validate team lead data using the new validation system
    const validation = validateSignupData(teamData);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setError('Please fix the validation errors');
      return;
    }

    // Skip team members step and go directly to registration
    await handleSubmit();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form data
      if (!teamData.team_name.trim()) {
        throw new Error('Team name is required');
      }
      if (!teamData.team_id.trim()) {
        throw new Error('Team ID is required');
      }
      if (!teamData.password.trim()) {
        throw new Error('Password is required');
      }
      if (!teamData.team_leader.name.trim()) {
        throw new Error('Team leader name is required');
      }
      if (!teamData.team_leader.email.trim()) {
        throw new Error('Team leader email is required');
      }
      if (!teamData.team_leader.mobile_number.trim()) {
        throw new Error('Team leader mobile number is required');
      }
      if (teamData.password !== teamData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      console.log('Attempting signup with:', { 
        team_name: teamData.team_name, 
        team_id: teamData.team_id, 
        password: '***',
        team_leader: teamData.team_leader 
      });

      // Call backend API for signup
      const response = await fetch('http://localhost:8000/team/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_name: teamData.team_name,
          team_id: teamData.team_id,
          password: teamData.password,
          team_leader: teamData.team_leader
        })
      });

      const data = await response.json();
      
      console.log('Backend response:', { status: response.status, data });
      
      if (!response.ok) {
        console.error('Signup failed:', data);
        // Handle specific error cases
        if (response.status === 400 && data.message) {
          throw new Error(data.message);
        }
        throw new Error(data.message || 'Registration failed');
      }
      
      console.log('Signup successful:', data);
      
      // Show success message briefly before redirecting
      setError(''); // Clear any previous errors
      alert('Team registered successfully! Redirecting to login...');
      
      // Redirect to login page instead of directly to game
      if (onRedirectToLogin) {
        onRedirectToLogin();
      }
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
            Create Team
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: theme.colors.text,
              opacity: 0.9
            }}
          >
            Register as team lead to start your adventure
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

        {/* Team Lead Information */}
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
                name="team_name"
                value={teamData.team_name}
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

            {/* Team ID */}
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
                Team ID *
              </label>
              <input
                type="text"
                name="team_id"
                value={teamData.team_id}
                onChange={handleTeamDataChange}
                placeholder="Enter your team ID"
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

            {/* Team Leader Name */}
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
                Team Leader Name *
              </label>
              <input
                type="text"
                name="team_leader.name"
                value={teamData.team_leader.name}
                onChange={handleTeamDataChange}
                placeholder="Enter team leader name"
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

            {/* Team Leader Email */}
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
                Team Leader Email *
              </label>
              <input
                type="email"
                name="team_leader.email"
                value={teamData.team_leader.email}
                onChange={handleTeamDataChange}
                placeholder="Enter team leader email"
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

            {/* Team Leader Mobile */}
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
                Team Leader Mobile *
              </label>
              <input
                type="tel"
                name="team_leader.mobile_number"
                value={teamData.team_leader.mobile_number}
                onChange={handleTeamDataChange}
                placeholder="Enter team leader mobile number"
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={teamData.password}
                  onChange={handleTeamDataChange}
                  placeholder="Create a password"
                  style={{
                    width: '100%',
                    padding: '15px 50px 15px 20px',
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
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.colors.accent,
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '5px',
                    borderRadius: '4px',
                    transition: theme.transitions.fast
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={teamData.confirmPassword}
                  onChange={handleTeamDataChange}
                  placeholder="Confirm your password"
                  style={{
                    width: '100%',
                    padding: '15px 50px 15px 20px',
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
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.colors.accent,
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '5px',
                    borderRadius: '4px',
                    transition: theme.transitions.fast
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                  }}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Register Button */}
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
                backgroundImage: 'linear-gradient(90deg, #c0c0c0 0%, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%, #c0c0c0 100%)',
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
                '🚀 REGISTER'
              )}
            </motion.button>
          </form>

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

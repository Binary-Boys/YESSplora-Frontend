import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { validateLoginCredentials, isAdminUser } from '../../utils/validation';

const LoginForm = ({ onBackClick, onLoginSuccess, onSignupClick }) => {
  const [formData, setFormData] = useState({
    team_name: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    try {
      // Validate form data
      if (!formData.team_name.trim()) {
        throw new Error('Team name is required');
      }
      if (!formData.password.trim()) {
        throw new Error('Password is required');
      }

      console.log('Attempting login with:', { team_name: formData.team_name, password: '***' });

      // Call backend API for login
      const response = await fetch('http://localhost:8000/team/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_name: formData.team_name,
          password: formData.password
        })
      });

      const data = await response.json();
      
      console.log('Backend response:', { status: response.status, data });
      
      if (!response.ok) {
        console.error('Login failed:', data);
        throw new Error(data.message || 'Login failed');
      }
      
      console.log('Login successful:', data);
      
      // Persist login state and redirect to main game
      try {
        localStorage.setItem('yess_auth', JSON.stringify({ 
          isAuthenticated: true, 
          team_name: formData.team_name,
          team_id: data.teamID,
          teamID: data.teamID,
          isAdmin: false // Backend doesn't have admin concept yet
        }));
      } catch {}
      
      // Call the success callback to redirect to main game
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
    } catch (err) {
      setError(err.message);
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
        ← Back to Game Info
      </motion.button>

      {/* Login Form */}
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
            Welcome Back
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: theme.colors.text,
              opacity: 0.9
            }}
          >
            Enter your credentials to continue your adventure
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Team Name Input */}
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
              Team Name
            </label>
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleInputChange}
              placeholder="Enter your team name"
              style={{
                width: '100%',
                padding: '15px 20px',
                borderRadius: '12px',
                border: `2px solid ${fieldErrors.team_name ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: theme.colors.accent,
                fontSize: '1rem',
                outline: 'none',
                transition: theme.transitions.fast,
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = fieldErrors.team_id ? 'rgba(255, 0, 0, 0.7)' : theme.colors.accent;
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = fieldErrors.team_id ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            {fieldErrors.team_id && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: '#ff6b6b',
                  fontSize: '0.85rem',
                  marginTop: '5px',
                  paddingLeft: '5px'
                }}
              >
                {fieldErrors.team_id}
              </motion.div>
            )}
          </div>

          {/* Password Input */}
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
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '15px 50px 15px 20px',
                  borderRadius: '12px',
                  border: `2px solid ${fieldErrors.password ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: theme.colors.accent,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: theme.transitions.fast,
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = fieldErrors.password ? 'rgba(255, 0, 0, 0.7)' : theme.colors.accent;
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = fieldErrors.password ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
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
            {fieldErrors.password && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: '#ff6b6b',
                  fontSize: '0.85rem',
                  marginTop: '5px',
                  paddingLeft: '5px'
                }}
              >
                {fieldErrors.password}
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
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
                : undefined,
              backgroundImage: isLoading 
                ? undefined 
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
              opacity: isLoading ? 0.7 : 1
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
                Authenticating...
              </div>
            ) : (
              '🚀 LOGIN & START GAME'
            )}
          </motion.button>
        </form>

        {/* Help Text */}
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <p
            style={{
              fontSize: '0.9rem',
              color: theme.colors.textSecondary,
              opacity: 0.8,
              marginBottom: '15px'
            }}
          >
            Don't have credentials?{' '}
            <a
              href="tel:9778550351"
              style={{
                color: theme.colors.accent,
                textDecoration: 'none',
                fontWeight: theme.typography.fontWeight.semibold,
                transition: theme.transitions.fast
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
                e.target.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
                e.target.style.opacity = '1';
              }}
            >
              Contact your event organizer
            </a>
          </p>
          
          {/* Signup Option */}
          <motion.button
            onClick={onSignupClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'transparent',
              color: theme.colors.accent,
              border: `2px solid ${theme.colors.accent}`,
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: theme.typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: theme.transitions.fast,
              marginTop: '10px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            🆕 Don't have an account? Sign up
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { validateLoginCredentials, isAdminUser } from '../../utils/validation';

const LoginForm = ({ onBackClick, onLoginSuccess, onSignupClick }) => {
  const [formData, setFormData] = useState({
    ticketId: '',
    teamCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    try {
      // Validate credentials using the new validation system
      const validation = validateLoginCredentials(formData.ticketId, formData.teamCode);
      
      if (!validation.isValid) {
        setFieldErrors(validation.errors);
        throw new Error('Please fix the validation errors');
      }

      // Check for admin user
      const isAdmin = isAdminUser(formData.ticketId, formData.teamCode);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login attempt:', { ...formData, isAdmin });
      
      // Persist login state and redirect to main game
      try {
        localStorage.setItem('yess_auth', JSON.stringify({ 
          isAuthenticated: true, 
          ticketId: formData.ticketId,
          teamCode: formData.teamCode,
          isAdmin: isAdmin
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
          {/* Ticket ID Input */}
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
              Ticket ID
            </label>
            <input
              type="text"
              name="ticketId"
              value={formData.ticketId}
              onChange={handleInputChange}
              placeholder="Enter your ticket ID (e.g., YESS25XhyQCCRt)"
              style={{
                width: '100%',
                padding: '15px 20px',
                borderRadius: '12px',
                border: `2px solid ${fieldErrors.ticketId ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: theme.colors.accent,
                fontSize: '1rem',
                outline: 'none',
                transition: theme.transitions.fast,
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = fieldErrors.ticketId ? 'rgba(255, 0, 0, 0.7)' : theme.colors.accent;
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = fieldErrors.ticketId ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            {fieldErrors.ticketId && (
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
                {fieldErrors.ticketId}
              </motion.div>
            )}
          </div>

          {/* Team Code Input */}
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
              Team Code
            </label>
            <input
              type="text"
              name="teamCode"
              value={formData.teamCode}
              onChange={handleInputChange}
              placeholder="Enter your team code (same as ticket ID)"
              style={{
                width: '100%',
                padding: '15px 20px',
                borderRadius: '12px',
                border: `2px solid ${fieldErrors.teamCode ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: theme.colors.accent,
                fontSize: '1rem',
                outline: 'none',
                transition: theme.transitions.fast,
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = fieldErrors.teamCode ? 'rgba(255, 0, 0, 0.7)' : theme.colors.accent;
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = fieldErrors.teamCode ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            {fieldErrors.teamCode && (
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
                {fieldErrors.teamCode}
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
            🆕 Don't have an account? Register your team
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;

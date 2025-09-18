import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { validateTicketId, validateTeamCode, validateLoginCredentials, generateSampleTicketId } from '../../utils/validation';

const ValidationDemo = () => {
  const [ticketId, setTicketId] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [results, setResults] = useState({});

  const handleTest = () => {
    const ticketValidation = validateTicketId(ticketId);
    const teamCodeValidation = validateTeamCode(teamCode, ticketId);
    const loginValidation = validateLoginCredentials(ticketId, teamCode);

    setResults({
      ticketId: ticketValidation,
      teamCode: teamCodeValidation,
      login: loginValidation
    });
  };

  const handleGenerateSample = () => {
    const sample = generateSampleTicketId();
    setTicketId(sample);
    setTeamCode(sample);
  };

  const handleTestAdmin = () => {
    setTicketId('admin');
    setTeamCode('killadi');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <h2 style={{ color: theme.colors.accent, textAlign: 'center', marginBottom: '30px' }}>
        Ticket ID Validation Demo
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: theme.colors.text, marginBottom: '5px' }}>
          Ticket ID:
        </label>
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="Enter ticket ID (e.g., YESS25XhyQCCRt)"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: theme.colors.accent,
            marginBottom: '10px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: theme.colors.text, marginBottom: '5px' }}>
          Team Code:
        </label>
        <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder="Enter team code (should match ticket ID)"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: theme.colors.accent,
            marginBottom: '10px'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={handleTest}
          style={{
            padding: '10px 20px',
            background: theme.colors.accent,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Test Validation
        </button>
        <button
          onClick={handleGenerateSample}
          style={{
            padding: '10px 20px',
            background: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Generate Sample
        </button>
        <button
          onClick={handleTestAdmin}
          style={{
            padding: '10px 20px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Test Admin
        </button>
      </div>

      {results.ticketId && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: theme.colors.accent, marginBottom: '10px' }}>Validation Results:</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Ticket ID:</strong> 
            <span style={{ color: results.ticketId.isValid ? '#4CAF50' : '#f44336', marginLeft: '10px' }}>
              {results.ticketId.isValid ? '✓ Valid' : '✗ Invalid'}
            </span>
            {results.ticketId.error && (
              <div style={{ color: '#f44336', fontSize: '0.9rem', marginTop: '5px' }}>
                {results.ticketId.error}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Team Code:</strong> 
            <span style={{ color: results.teamCode.isValid ? '#4CAF50' : '#f44336', marginLeft: '10px' }}>
              {results.teamCode.isValid ? '✓ Valid' : '✗ Invalid'}
            </span>
            {results.teamCode.error && (
              <div style={{ color: '#f44336', fontSize: '0.9rem', marginTop: '5px' }}>
                {results.teamCode.error}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Login Credentials:</strong> 
            <span style={{ color: results.login.isValid ? '#4CAF50' : '#f44336', marginLeft: '10px' }}>
              {results.login.isValid ? '✓ Valid' : '✗ Invalid'}
            </span>
            {Object.keys(results.login.errors || {}).length > 0 && (
              <div style={{ marginTop: '5px' }}>
                {Object.entries(results.login.errors).map(([field, error]) => (
                  <div key={field} style={{ color: '#f44336', fontSize: '0.9rem' }}>
                    {field}: {error}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
        <h4 style={{ color: theme.colors.accent, marginBottom: '10px' }}>Validation Rules:</h4>
        <ul style={{ color: theme.colors.text, fontSize: '0.9rem', lineHeight: '1.5' }}>
          <li>Ticket ID must start with "YESS25"</li>
          <li>Ticket ID must be exactly 14 characters total</li>
          <li>Last 8 characters can be alphanumeric or symbols</li>
          <li>Team code must match ticket ID exactly</li>
          <li>Special admin user: ticket ID "admin", team code "killadi"</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ValidationDemo;

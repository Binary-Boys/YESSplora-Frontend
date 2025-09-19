// Validation utilities for YESSplora ticket IDs and team codes

/**
 * Validates YESS25 ticket ID format
 * Format: YESS25 + 8 alphanumeric characters/symbols
 * @param {string} ticketId - The ticket ID to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateTicketId = (ticketId) => {
  if (!ticketId || typeof ticketId !== 'string') {
    return { isValid: false, error: 'Ticket ID is required' };
  }

  const trimmedTicketId = ticketId.trim();

  // Check for admin exception
  if (trimmedTicketId.toLowerCase() === 'admin') {
    return { isValid: true, error: null };
  }

  // Check if it starts with YESS25
  if (!trimmedTicketId.startsWith('YESS25')) {
    return { 
      isValid: false, 
      error: 'Ticket ID must start with "YESS25"' 
    };
  }

  // Check total length (YESS25 = 6 chars + 8 chars = 14 total)
  if (trimmedTicketId.length !== 14) {
    return { 
      isValid: false, 
      error: 'Ticket ID must be exactly 14 characters (YESS25 + 8 characters)' 
    };
  }

  // Check the remaining 8 characters are alphanumeric or symbols
  const remainingPart = trimmedTicketId.substring(6); // Get the 8 characters after YESS25
  const validCharRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/;
  
  if (!validCharRegex.test(remainingPart)) {
    return { 
      isValid: false, 
      error: 'Ticket ID suffix must contain only alphanumeric characters and symbols' 
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates team code format
 * Team code should be the same as ticket ID
 * @param {string} teamCode - The team code to validate
 * @param {string} ticketId - The ticket ID to compare against
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateTeamCode = (teamCode, ticketId) => {
  if (!teamCode || typeof teamCode !== 'string') {
    return { isValid: false, error: 'Team code is required' };
  }

  const trimmedTeamCode = teamCode.trim();
  const trimmedTicketId = ticketId ? ticketId.trim() : '';

  // Check for admin exception
  if (trimmedTicketId.toLowerCase() === 'admin' && trimmedTeamCode.toLowerCase() === 'killadi') {
    return { isValid: true, error: null };
  }

  // Team code must match ticket ID
  if (trimmedTeamCode !== trimmedTicketId) {
    return { 
      isValid: false, 
      error: 'Team code must match the ticket ID' 
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates complete login credentials
 * @param {string} ticketId - The ticket ID
 * @param {string} teamCode - The team code
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateLoginCredentials = (ticketId, teamCode) => {
  const ticketValidation = validateTicketId(ticketId);
  const teamCodeValidation = validateTeamCode(teamCode, ticketId);

  const errors = {};
  if (!ticketValidation.isValid) {
    errors.ticketId = ticketValidation.error;
  }
  if (!teamCodeValidation.isValid) {
    errors.teamCode = teamCodeValidation.error;
  }

  return {
    isValid: ticketValidation.isValid && teamCodeValidation.isValid,
    errors
  };
};

/**
 * Validates signup data including ticket ID
 * @param {object} signupData - The signup form data
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateSignupData = (signupData) => {
  const errors = {};

  // Validate required fields
  if (!signupData.team_name?.trim()) {
    errors.team_name = 'Team name is required';
  }

  if (!signupData.team_id?.trim()) {
    errors.team_id = 'Team ID is required';
  }

  if (!signupData.team_leader?.name?.trim()) {
    errors['team_leader.name'] = 'Team leader name is required';
  }

  if (!signupData.team_leader?.email?.trim()) {
    errors['team_leader.email'] = 'Team leader email is required';
  }

  if (!signupData.team_leader?.mobile_number?.trim()) {
    errors['team_leader.mobile_number'] = 'Team leader mobile number is required';
  }

  if (!signupData.password?.trim()) {
    errors.password = 'Password is required';
  }

  if (!signupData.confirmPassword?.trim()) {
    errors.confirmPassword = 'Please confirm your password';
  }

  // Basic team ID validation (no YESS25 format restriction)
  if (signupData.team_id && signupData.team_id.trim().length < 3) {
    errors.team_id = 'Team ID must be at least 3 characters long';
  }

  // Validate password match
  if (signupData.password && signupData.confirmPassword && 
      signupData.password !== signupData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Validate password strength (optional - basic check)
  if (signupData.password && signupData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Checks if the user is the special admin user
 * @param {string} ticketId - The ticket ID
 * @param {string} teamCode - The team code
 * @returns {boolean}
 */
export const isAdminUser = (ticketId, teamCode) => {
  return ticketId?.toLowerCase() === 'admin' && teamCode?.toLowerCase() === 'killadi';
};

/**
 * Generates a sample valid ticket ID for testing
 * @returns {string}
 */
export const generateSampleTicketId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = 'YESS25';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

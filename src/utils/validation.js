// Validation rules for YESSplora registration

export const VALIDATION_RULES = {
  // Name field validation rules
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-'.]+$/,
    required: true,
    messages: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters long',
      maxLength: 'Name cannot exceed 50 characters',
      pattern: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods',
      invalid: 'Please enter a valid name'
    }
  },
  
  // Team name validation rules
  teamName: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
    required: true,
    messages: {
      required: 'Team name is required',
      minLength: 'Team name must be at least 3 characters long',
      maxLength: 'Team name cannot exceed 30 characters',
      pattern: 'Team name can only contain letters, numbers, spaces, hyphens, and underscores',
      invalid: 'Please enter a valid team name'
    }
  },
  
  // Ticket number validation rules
  ticketNumber: {
    minLength: 7,
    maxLength: 7,
    pattern: /^\d{7}$/,
    required: true,
    messages: {
      required: 'Ticket number is required',
      minLength: 'Ticket number must be exactly 7 digits',
      maxLength: 'Ticket number must be exactly 7 digits',
      pattern: 'Ticket number must be exactly 7 digits (e.g., 1234567)',
      invalid: 'Please enter a valid 7-digit ticket number',
      format: 'Ticket number must be exactly 7 digits (e.g., 1234567)'
    }
  }
};

// Validation functions
export const validateField = (fieldName, value) => {
  const rules = VALIDATION_RULES[fieldName];
  if (!rules) return { isValid: true, message: '' };
  
  // Check if required
  if (rules.required && (!value || value.trim() === '')) {
    return { isValid: false, message: rules.messages.required };
  }
  
  // Skip other validations if empty and not required
  if (!value || value.trim() === '') {
    return { isValid: true, message: '' };
  }
  
  const trimmedValue = value.trim();
  
  // Check minimum length
  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return { isValid: false, message: rules.messages.minLength };
  }
  
  // Check maximum length
  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return { isValid: false, message: rules.messages.maxLength };
  }
  
  // Check pattern
  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    return { isValid: false, message: rules.messages.pattern };
  }
  
  // Special validation for ticket numbers
  if (fieldName === 'ticketNumber') {
    return validateTicketNumber(trimmedValue);
  }
  
  return { isValid: true, message: '' };
};

// Special ticket number validation
export const validateTicketNumber = (ticketNumber) => {
  // Check if it's exactly 7 digits
  if (!/^\d{7}$/.test(ticketNumber)) {
    return { 
      isValid: false, 
      message: 'Ticket number must be exactly 7 digits (e.g., 1234567)' 
    };
  }
  
  return { isValid: true, message: '' };
};

// Validate team registration data
export const validateTeamRegistration = (data) => {
  const errors = {};
  
  // Validate team name
  const teamNameValidation = validateField('teamName', data.teamName);
  if (!teamNameValidation.isValid) {
    errors.teamName = teamNameValidation.message;
  }
  
  // Validate members
  const validMembers = data.members.filter(member => 
    member.name && member.name.trim() !== '' && 
    member.ticketNumber && member.ticketNumber.trim() !== ''
  );
  
  if (validMembers.length === 0) {
    errors.members = 'At least one team member is required';
  }
  
  if (validMembers.length > 5) {
    errors.members = 'Maximum 5 team members allowed';
  }
  
  // Validate each member
  data.members.forEach((member, index) => {
    if (member.name && member.name.trim() !== '') {
      const nameValidation = validateField('name', member.name);
      if (!nameValidation.isValid) {
        errors[`member${index}Name`] = nameValidation.message;
      }
    }
    
    if (member.ticketNumber && member.ticketNumber.trim() !== '') {
      const ticketValidation = validateField('ticketNumber', member.ticketNumber);
      if (!ticketValidation.isValid) {
        errors[`member${index}Ticket`] = ticketValidation.message;
      }
    }
  });
  
  // Check for duplicate ticket numbers
  const ticketNumbers = validMembers.map(m => m.ticketNumber.trim());
  const uniqueTicketNumbers = new Set(ticketNumbers);
  if (ticketNumbers.length !== uniqueTicketNumbers.size) {
    errors.duplicateTickets = 'Each team member must have a unique ticket number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format ticket number for display
export const formatTicketNumber = (value) => {
  if (!value) return value;
  
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Return only the first 7 digits
  return cleaned.substring(0, 7);
};

// Sanitize name input
export const sanitizeName = (value) => {
  if (!value) return value;
  
  // Remove extra spaces and trim
  const trimmed = value.trim().replace(/\s+/g, ' ');
  
  // Capitalize first letter of each word
  return trimmed.replace(/\b\w/g, l => l.toUpperCase());
};
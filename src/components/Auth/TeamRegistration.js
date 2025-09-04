import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Users, ArrowLeft, ArrowRight, User, Ticket, AlertCircle } from 'lucide-react';
import { validateField, validateTeamRegistration, formatTicketNumber, sanitizeName } from '../../utils/validation';
import AdminLoginIcon from './AdminLoginIcon';

const TeamRegistration = () => {
  const navigate = useNavigate();
  const { registerTeam, updateRegistrationData, updateTeamMember, registrationData } = useAuthStore();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = validateTeamRegistration(registrationData);
    setErrors(validation.errors);
    
    if (validation.isValid) {
      const success = registerTeam(registrationData);
      if (success) {
        // Registration successful, user will be redirected
      }
    }
  };

  const handleInputChange = (field, value) => {
    updateRegistrationData(field, value);
    
    // Validate field on change
    const validation = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? '' : validation.message
    }));
  };

  const handleMemberChange = (index, field, value) => {
    let processedValue = value;
    
    // Format ticket numbers automatically
    if (field === 'ticketNumber') {
      processedValue = formatTicketNumber(value);
    }
    
    // Sanitize names
    if (field === 'name') {
      processedValue = sanitizeName(value);
    }
    
    updateTeamMember(index, field, processedValue);
    
    // Validate field on change
    const validation = validateField(field, processedValue);
    setErrors(prev => ({
      ...prev,
      [`member${index}${field.charAt(0).toUpperCase() + field.slice(1)}`]: validation.isValid ? '' : validation.message
    }));
  };

  const handleBlur = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const validation = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? '' : validation.message
    }));
  };

  const handleMemberBlur = (index, field, value) => {
    setTouched(prev => ({ ...prev, [`member${index}${field}`]: true }));
    
    const validation = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [`member${index}${field.charAt(0).toUpperCase() + field.slice(1)}`]: validation.isValid ? '' : validation.message
    }));
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
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-bg-primary rounded-2xl flex items-center justify-center mr-4">
              <Users className="w-8 h-8 text-neutral-light" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Team Registration
              </h1>
              <p className="text-sm text-neutral-light text-opacity-80">Join the YESSplora adventure</p>
            </div>
          </div>
          
          <p className="text-neutral-light text-opacity-80 text-sm">
            Register your team to start the treasure hunt!
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-neutral-light text-sm font-medium mb-2">
                Team Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={registrationData.teamName || ''}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  onBlur={(e) => handleBlur('teamName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none transition-colors ${
                    errors.teamName && touched.teamName 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-white border-opacity-20 focus:border-primary-accent'
                  }`}
                  placeholder="Enter your team name (3-30 characters)"
                  required
                />
                {errors.teamName && touched.teamName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.teamName && touched.teamName && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.teamName}
                </p>
              )}
              <p className="text-neutral-light text-opacity-60 text-xs mt-1">
                Use letters, numbers, spaces, hyphens, and underscores only
              </p>
            </div>

            {/* Team Members Section */}
            <div>
              <label className="block text-neutral-light text-sm font-medium mb-4">
                Team Members (1-5 members)
              </label>
              
              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
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
                        <div className="relative">
                          <input
                            type="text"
                            value={registrationData.members[index]?.name || ''}
                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                            onBlur={(e) => handleMemberBlur(index, 'name', e.target.value)}
                            className={`w-full px-3 py-2 bg-white bg-opacity-10 border rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none transition-colors text-sm ${
                              errors[`member${index}Name`] && touched[`member${index}name`]
                                ? 'border-red-400 focus:border-red-400' 
                                : 'border-white border-opacity-20 focus:border-primary-accent'
                            }`}
                            placeholder={`Enter member ${index + 1} name`}
                            required={index === 0}
                          />
                          {errors[`member${index}Name`] && touched[`member${index}name`] && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            </div>
                          )}
                        </div>
                        {errors[`member${index}Name`] && touched[`member${index}name`] && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors[`member${index}Name`]}
                          </p>
                        )}
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
                            onBlur={(e) => handleMemberBlur(index, 'ticketNumber', e.target.value)}
                            className={`w-full px-3 py-2 bg-white bg-opacity-10 border rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none transition-colors text-sm pr-10 ${
                              errors[`member${index}Ticket`] && touched[`member${index}ticketNumber`]
                                ? 'border-red-400 focus:border-red-400' 
                                : 'border-white border-opacity-20 focus:border-primary-accent'
                            }`}
                            placeholder={`1234567`}
                            required={index === 0}
                          />
                          <Ticket className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-light text-opacity-50" />
                        </div>
                        {errors[`member${index}Ticket`] && touched[`member${index}ticketNumber`] && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors[`member${index}Ticket`]}
                          </p>
                        )}
                        <p className="text-neutral-light text-opacity-60 text-xs mt-1">
                          Format: Exactly 7 digits (e.g., 1234567)
                        </p>
                      </div>
                    </div>
                    
                    {index === 0 && (
                      <p className="text-xs text-neutral-light text-opacity-60 mt-2">
                        Team leader is required. Other members are optional.
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* General Validation Errors */}
            {(errors.members || errors.duplicateTickets) && (
              <motion.div
                className="bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <div>
                    {errors.members && (
                      <p className="text-red-400 text-sm font-medium">{errors.members}</p>
                    )}
                    {errors.duplicateTickets && (
                      <p className="text-red-400 text-sm font-medium">{errors.duplicateTickets}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-white bg-opacity-20 text-neutral-light rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-bg-primary text-neutral-light rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Register Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-neutral-light text-opacity-60 text-sm">
            By registering, you agree to our{' '}
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

export default TeamRegistration;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const SupportPopup = () => {
  const { state, actions } = useGame();
  const { ui } = state;

  const handleClose = () => {
    actions.closeAllPopups();
    // Navigate back to home page for consistency
    console.log('Support popup closed - navigating back to home page');
    window.location.href = '/';
  };

  const handleCall = (phoneNumber, name) => {
    console.log(`Calling ${name} at ${phoneNumber}`);
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Support contacts list
  const supportContacts = [
    { name: 'Vidhu Krishnan', phone: '9778550351' },
    { name: 'Adarsh', phone: '8714469001' },
    { name: 'Manas Manoj', phone: '8086336539' },
    { name: 'Haritha', phone: '8590843342' },
    { name: 'Shayan', phone: '8075545914' },
    { name: 'Ajay', phone: '8590955755' },
    { name: 'Krishnendu K V', phone: '8289922048' },
    { name: 'Sahadiya M', phone: '9567626380' }
  ];

  return (
    <AnimatePresence>
      {ui.showSupport && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: theme.zIndex.overlay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: theme.spacing.lg
            }}
            onClick={handleClose}
          >
            {/* Popup Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              style={{
                backgroundColor: theme.colors.surface,
                border: `3px solid ${theme.colors.primary}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.xl,
                width: '90vw',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: theme.shadows['2xl']
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: theme.spacing.md,
                  right: theme.spacing.md,
                  width: '60px',
                  height: '60px',
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.accent,
                  border: `3px solid ${theme.colors.accent}`,
                  borderRadius: theme.borderRadius.full,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: `${parseInt(theme.typography.fontSize['2xl']) * 1.5}px`,
                  fontWeight: theme.typography.fontWeight.bold,
                  zIndex: 10,
                  boxShadow: theme.shadows.lg
                }}
              >
                ×
              </button>

              {/* Title */}
              <h2
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.accent,
                  textAlign: 'center',
                  marginBottom: theme.spacing.lg,
                  marginTop: theme.spacing.sm
                }}
              >
                📞 SUPPORT CONTACTS
              </h2>

              {/* Support Contacts List */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.md
                }}
              >
                {supportContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    style={{
                      backgroundColor: theme.colors.background,
                      border: `2px solid ${theme.colors.border}`,
                      borderRadius: theme.borderRadius.lg,
                      padding: theme.spacing.lg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: theme.shadows.md
                    }}
                    onClick={() => handleCall(contact.phone, contact.name)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = theme.colors.primary;
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = theme.shadows.lg;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = theme.colors.background;
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = theme.shadows.md;
                    }}
                  >
                    {/* Contact Info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.md
                      }}
                    >
                      {/* Phone Icon */}
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: theme.colors.accent,
                          borderRadius: theme.borderRadius.full,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          color: theme.colors.primary,
                          boxShadow: theme.shadows.md
                        }}
                      >
                        📞
                      </div>
                      
                      {/* Name and Phone */}
                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.bold,
                            color: theme.colors.accent,
                            marginBottom: '4px'
                          }}
                        >
                          {contact.name}
                        </div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.textSecondary,
                            fontFamily: 'monospace'
                          }}
                        >
                          +91 {contact.phone}
                        </div>
                      </div>
                    </div>

                    {/* Call Button */}
                    <div
                      style={{
                        fontSize: '20px',
                        color: theme.colors.accent,
                        opacity: 0.7
                      }}
                    >
                      →
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Instructions */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border}`,
                  textAlign: 'center',
                  marginTop: theme.spacing.lg
                }}
              >
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm,
                    margin: 0
                  }}
                >
                  Tap on any contact to call them directly
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SupportPopup;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const ProfilePopup = () => {
  const { state, actions } = useGame();
  const { ui, team, gameProgress, auth } = state;
  const [isEditing, setIsEditing] = useState(false);
  const [editedMembers, setEditedMembers] = useState(team.team_members || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Load team profile data when component mounts
  useEffect(() => {
    const loadTeamProfile = async () => {
      if (auth.team_id || auth.teamID) {
        try {
          setIsLoading(true);
          const team_id = auth.team_id || auth.teamID;
          await actions.loadTeamProfile(team_id);
        } catch (error) {
          console.error('Failed to load team profile:', error);
          setError('Failed to load team profile');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTeamProfile();
  }, [auth.team_id, auth.teamID, actions]);

  // Update editedMembers when team data changes
  useEffect(() => {
    if (team.team_members) {
      setEditedMembers(team.team_members);
    }
  }, [team.team_members]);

  const handleLogout = () => {
    try {
      actions.logout();
    } catch {}
    try {
      localStorage.removeItem('yess_auth');
      // Optional: clear cached game state
      // localStorage.removeItem('yessplora-game-state');
    } catch {}
    actions.closeAllPopups();
    // Redirect to initial screen (Auth)
    window.location.href = '/';
  };

  const handleClose = () => {
    actions.closeAllPopups();
    setIsEditing(false);
    setEditedMembers(team.team_members || []);
    setError('');
    // Navigate back to home page for consistency
    console.log('Profile popup closed - navigating back to home page');
    window.location.href = '/';
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // Save changes
      try {
        setIsLoading(true);
        setError('');
        await actions.updateTeamMembers(editedMembers);
        console.log('Team members updated successfully');
      } catch (error) {
        console.error('Failed to update team members:', error);
        setError('Failed to update team members. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...editedMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setEditedMembers(updatedMembers);
  };

  const handleAddMember = () => {
    if (editedMembers.length < 10) { // Max 10 members
      setEditedMembers([...editedMembers, {
        name: '',
        email: '',
        mobile_number: '',
        role: 'member'
      }]);
    }
  };

  const handleRemoveMember = (index) => {
    if (editedMembers.length > 1) { // Min 1 member
      const updatedMembers = editedMembers.filter((_, i) => i !== index);
      setEditedMembers(updatedMembers);
    }
  };

  return (
    <AnimatePresence>
      {ui.showProfile && (
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
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              zIndex: theme.zIndex.overlay,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'flex-end'
            }}
            onClick={handleClose}
          >
            {/* Sidebar Content - slides in from right */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 320 }}
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                backdropFilter: 'blur(14px)',
                border: `3px solid ${theme.colors.primary}`,
                borderRight: 'none',
                borderTopLeftRadius: theme.borderRadius.xl,
                borderBottomLeftRadius: theme.borderRadius.xl,
                padding: theme.spacing.xl,
                width: '420px',
                maxWidth: '92vw',
                height: '100vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: theme.shadows['2xl']
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button (top-right of panel) */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: theme.spacing.md,
                  right: theme.spacing.md,
                  width: '44px',
                  height: '44px',
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.accent,
                  border: 'none',
                  borderRadius: theme.borderRadius.full,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  zIndex: 10
                }}
                aria-label="Close profile"
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
                  marginTop: theme.spacing.sm,
                  paddingRight: '60px' // room for close button
                }}
              >
                Team Profile
              </h2>

              {/* Loading State */}
              {isLoading && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: theme.spacing.lg,
                    color: theme.colors.textSecondary
                  }}
                >
                  Loading team profile...
                </div>
              )}

              {/* Error State */}
              {error && (
                <div
                  style={{
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md,
                    marginBottom: theme.spacing.lg,
                    color: '#ff6b6b',
                    textAlign: 'center'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Team Name */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`,
                  marginBottom: theme.spacing.lg,
                  textAlign: 'center'
                }}
              >
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.sm
                  }}
                >
                  {team.team_name || 'Loading...'}
                </h3>
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  Team ID: {team.team_id || 'Not assigned'}
                </p>
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  Total Score: {team.total_score || 0} points
                </p>
              </div>

              {/* Team Members Section */}
              <div
                style={{
                  marginBottom: theme.spacing.lg
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: theme.spacing.md
                  }}
                >
                  <h4
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.accent
                    }}
                  >
                    Team Members ({editedMembers.length})
                  </h4>
                  <button
                    onClick={handleEditToggle}
                    style={{
                      backgroundColor: isEditing ? theme.colors.success : theme.colors.primary,
                      color: theme.colors.accent,
                      border: 'none',
                      borderRadius: theme.borderRadius.md,
                      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.medium,
                      cursor: 'pointer',
                      transition: theme.transitions.fast
                    }}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                {/* Members List */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing.sm
                  }}
                >
                  {editedMembers.map((member, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.md,
                        backgroundColor: theme.colors.background,
                        padding: theme.spacing.md,
                        borderRadius: theme.borderRadius.md,
                        border: `1px solid ${theme.colors.border}`
                      }}
                    >
                      {/* Member Avatar */}
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: theme.colors.primary,
                          color: theme.colors.accent,
                          borderRadius: theme.borderRadius.full,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: theme.typography.fontSize.sm,
                          fontWeight: theme.typography.fontWeight.bold,
                          flexShrink: 0
                        }}
                      >
                        {(typeof member === 'string' ? member : member.name || '').charAt(0).toUpperCase()}
                      </div>

                      {/* Member Info */}
                      {isEditing ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
                          <input
                            type="text"
                            value={typeof member === 'string' ? member : member.name || ''}
                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                            style={{
                              backgroundColor: theme.colors.surface,
                              color: theme.colors.text,
                              border: `2px solid ${theme.colors.border}`,
                              borderRadius: theme.borderRadius.sm,
                              padding: theme.spacing.sm,
                              fontSize: theme.typography.fontSize.base,
                              outline: 'none'
                            }}
                            placeholder="Enter member name"
                          />
                          <input
                            type="email"
                            value={typeof member === 'string' ? '' : member.email || ''}
                            onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                            style={{
                              backgroundColor: theme.colors.surface,
                              color: theme.colors.text,
                              border: `2px solid ${theme.colors.border}`,
                              borderRadius: theme.borderRadius.sm,
                              padding: theme.spacing.sm,
                              fontSize: theme.typography.fontSize.sm,
                              outline: 'none'
                            }}
                            placeholder="Enter email (optional)"
                          />
                          <input
                            type="tel"
                            value={typeof member === 'string' ? '' : member.mobile_number || ''}
                            onChange={(e) => handleMemberChange(index, 'mobile_number', e.target.value)}
                            style={{
                              backgroundColor: theme.colors.surface,
                              color: theme.colors.text,
                              border: `2px solid ${theme.colors.border}`,
                              borderRadius: theme.borderRadius.sm,
                              padding: theme.spacing.sm,
                              fontSize: theme.typography.fontSize.sm,
                              outline: 'none'
                            }}
                            placeholder="Enter mobile number (optional)"
                          />
                        </div>
                      ) : (
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: theme.typography.fontSize.base,
                              color: theme.colors.text,
                              fontWeight: theme.typography.fontWeight.medium
                            }}
                          >
                            {typeof member === 'string' ? member : member.name || 'Unknown'}
                          </div>
                          {typeof member === 'object' && member.email && (
                            <div
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.textSecondary
                              }}
                            >
                              {member.email}
                            </div>
                          )}
                          {typeof member === 'object' && member.mobile_number && (
                            <div
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.textSecondary
                              }}
                            >
                              {member.mobile_number}
                            </div>
                          )}
                          {typeof member === 'object' && member.role && (
                            <div
                              style={{
                                fontSize: theme.typography.fontSize.xs,
                                color: member.role === 'leader' ? theme.colors.success : theme.colors.textSecondary,
                                fontWeight: theme.typography.fontWeight.medium
                              }}
                            >
                              {member.role === 'leader' ? '👑 Leader' : '👤 Member'}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Remove Button (only when editing) */}
                      {isEditing && editedMembers.length > 1 && (
                        <button
                          onClick={() => handleRemoveMember(index)}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: theme.colors.error,
                            color: theme.colors.accent,
                            border: 'none',
                            borderRadius: theme.borderRadius.full,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.bold
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add Member Button (only when editing) */}
                  {isEditing && editedMembers.length < 10 && (
                    <button
                      onClick={handleAddMember}
                      style={{
                        backgroundColor: 'transparent',
                        color: theme.colors.primary,
                        border: `2px dashed ${theme.colors.primary}`,
                        borderRadius: theme.borderRadius.md,
                        padding: theme.spacing.md,
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.medium,
                        cursor: 'pointer',
                        transition: theme.transitions.fast,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: theme.spacing.sm
                      }}
                    >
                      <span>+</span>
                      Add Member
                    </button>
                  )}
                </div>
              </div>

              {/* Team Statistics */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`
                }}
              >
                <h4
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.md,
                    textAlign: 'center'
                  }}
                >
                  Team Statistics
                </h4>
                
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing.md
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      padding: theme.spacing.md,
                      backgroundColor: theme.colors.surface,
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`
                    }}
                  >
                    <p
                      style={{
                        fontSize: theme.typography.fontSize['2xl'],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.accent,
                        marginBottom: theme.spacing.xs
                      }}
                    >
                      {gameProgress.completedLevels.length}
                    </p>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.textSecondary
                      }}
                    >
                      Locations Completed
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: 'center',
                      padding: theme.spacing.md,
                      backgroundColor: theme.colors.surface,
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`
                    }}
                  >
                    <p
                      style={{
                        fontSize: theme.typography.fontSize['2xl'],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.accent,
                        marginBottom: theme.spacing.xs
                      }}
                    >
                      {gameProgress.totalScore}
                    </p>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.textSecondary
                      }}
                    >
                      Total Score
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: 'center',
                      padding: theme.spacing.md,
                      backgroundColor: theme.colors.surface,
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`
                    }}
                  >
                    <p
                      style={{
                        fontSize: theme.typography.fontSize['2xl'],
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.accent,
                        marginBottom: theme.spacing.xs
                      }}
                    >
                      {Math.round((gameProgress.completedLevels.length / 9) * 100)}%
                    </p>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.textSecondary
                      }}
                    >
                      Progress
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout Section */}
              <div
                style={{
                  marginTop: theme.spacing.lg,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <button
                  onClick={handleLogout}
                  className="shimmer-button"
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    borderRadius: theme.borderRadius.lg,
                    border: 'none',
                    background: 'linear-gradient(90deg, #ff6b6b 0%, #ff8b8b 50%, #ff6b6b 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite',
                    color: theme.colors.accent,
                    fontWeight: theme.typography.fontWeight.bold,
                    cursor: 'pointer',
                    boxShadow: theme.shadows.neumorphism.raised
                  }}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfilePopup;

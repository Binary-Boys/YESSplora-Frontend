import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';
import api from '../../services/mockApi';

const LeaderboardPopup = () => {
  const { state, actions } = useGame();
  const { ui } = state;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!ui.showLeaderboard) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.getLeaderboard();
        console.log('Leaderboard response:', res);
        if (mounted && res?.leaderboard) {
          setRows(Array.isArray(res.leaderboard) ? res.leaderboard : []);
        } else if (mounted && res?.data?.leaderboard) {
          setRows(Array.isArray(res.data.leaderboard) ? res.data.leaderboard : []);
        }
      } catch (e) {
        console.error('Failed to load leaderboard:', e);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [ui.showLeaderboard]);

  const sorted = useMemo(() => {
    const nonEliminated = rows.filter(r => !r.is_eliminated).sort((a, b) => (b.total_score || 0) - (a.total_score || 0));
    const eliminated = rows.filter(r => r.is_eliminated).sort((a, b) => (b.total_score || 0) - (a.total_score || 0));
    return [...nonEliminated, ...eliminated];
  }, [rows]);

  const handleClose = () => actions.closeAllPopups();

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.getLeaderboard();
      console.log('Leaderboard refresh response:', res);
      if (res?.leaderboard) {
        setRows(Array.isArray(res.leaderboard) ? res.leaderboard : []);
      } else if (res?.data?.leaderboard) {
        setRows(Array.isArray(res.data.leaderboard) ? res.data.leaderboard : []);
      }
    } catch (e) {
      console.error('Failed to refresh leaderboard:', e);
      setError('Failed to refresh leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {ui.showLeaderboard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: theme.zIndex.overlay,
            padding: 'clamp(8px, 2vw, 20px)'
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 'min(96vw, 1100px)',
              maxHeight: '82vh',
              overflow: 'auto',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              backdropFilter: 'blur(14px)',
              border: `2px solid ${theme.colors.primary}`,
              borderRadius: '20px',
              boxShadow: theme.shadows['2xl'],
              zIndex: theme.zIndex.modal,
              padding: 'clamp(16px, 2.5vw, 28px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: isMobile ? 22 : 28 }}>🏆</div>
                <h3 style={{
                  margin: 0,
                  color: theme.colors.accent,
                  fontSize: 'clamp(18px, 2.5vw, 28px)',
                  fontWeight: theme.typography.fontWeight.bold,
                  letterSpacing: 1.2
                }}>
                  Leaderboard
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleRefresh} style={{
                  background: theme.colors.accent,
                  color: theme.colors.primary,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}>Refresh</button>
                <button onClick={handleClose} style={{
                  background: theme.colors.primary,
                  color: theme.colors.accent,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  cursor: 'pointer'
                }}>Close</button>
              </div>
            </div>

            {loading && <div style={{ color: theme.colors.accent, textAlign: 'center', padding: 24 }}>Loading…</div>}
            {error && <div style={{ color: '#ff6b6b', textAlign: 'center', padding: 12 }}>{error}</div>}

            {/* Column labels on desktop */}
            {!isMobile && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 140px 120px 120px',
                color: theme.colors.textSecondary,
                fontSize: 12,
                padding: '6px 10px',
                marginBottom: 6,
                borderBottom: '1px solid rgba(255,255,255,0.15)'
              }}>
                <div style={{ paddingLeft: 6 }}>Rank</div>
                <div>Team</div>
                <div style={{ textAlign: 'right' }}>Score</div>
                <div style={{ textAlign: 'right' }}>Levels</div>
                <div style={{ textAlign: 'right' }}>Status</div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sorted.map((row, idx) => (
                <motion.div
                  key={row.team_id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.02 }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 14,
                    background: row.is_eliminated ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.10)',
                    border: row.is_eliminated ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.18)',
                    opacity: row.is_eliminated ? 0.55 : 1,
                    transition: '150ms ease',
                    boxShadow: row.is_eliminated ? 'none' : '0 6px 18px rgba(0,0,0,0.25)'
                  }}
                  onMouseEnter={(e) => { if (!row.is_eliminated) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {/* Row layout */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '40px 1fr auto' : '56px 1fr 140px 120px 120px',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    {/* Rank badge */}
                    <div style={{
                      width: isMobile ? 32 : 40,
                      height: isMobile ? 32 : 40,
                      borderRadius: 10,
                      background: idx === 0 ? 'linear-gradient(135deg,#FFD70033,#FFD70011)' : idx === 1 ? 'linear-gradient(135deg,#C0C0C033,#C0C0C011)' : idx === 2 ? 'linear-gradient(135deg,#CD7F3233,#CD7F3211)' : 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.accent,
                      fontWeight: 800
                    }}>
                      {idx + 1}
                    </div>

                    {/* Team name */}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: theme.colors.accent, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.team_name}</div>
                      <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>ID: {row.team_id}</div>
                    </div>

                    {/* Score pill */}
                    <div style={{ textAlign: isMobile ? 'right' : 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        borderRadius: 999,
                        background: 'linear-gradient(90deg,#ffffff22,#ffffff11)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: theme.colors.accent,
                        fontWeight: 700
                      }}>
                        {row.total_score || 0}
                      </span>
                    </div>

                    {/* Levels (desktop) */}
                    {!isMobile && (
                      <div style={{ textAlign: 'right', color: theme.colors.accent }}>
                        {row.levels_cleared || 0}
                      </div>
                    )}

                    {/* Status chip (desktop) */}
                    {!isMobile && (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: row.is_eliminated ? 'linear-gradient(90deg,#ff6b6b33,#ff6b6b11)' : 'linear-gradient(90deg,#7CFC0033,#7CFC0011)',
                          border: row.is_eliminated ? '1px solid #ff6b6b55' : '1px solid #7CFC0055',
                          color: row.is_eliminated ? '#ff9a9a' : '#b8ff66',
                          fontWeight: 700
                        }}>
                          {row.is_eliminated ? 'Eliminated' : 'Active'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Secondary line for mobile */}
                  {isMobile && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      <div style={{ color: theme.colors.accent }}>Levels: {row.levels_cleared || 0}</div>
                      <span style={{
                        display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                        background: row.is_eliminated ? 'linear-gradient(90deg,#ff6b6b33,#ff6b6b11)' : 'linear-gradient(90deg,#7CFC0033,#7CFC0011)',
                        border: row.is_eliminated ? '1px solid #ff6b6b55' : '1px solid #7CFC0055',
                        color: row.is_eliminated ? '#ff9a9a' : '#b8ff66', fontWeight: 700
                      }}>
                        {row.is_eliminated ? 'Eliminated' : 'Active'}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}

              {!loading && !error && sorted.length === 0 && (
                <div style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: 24 }}>No data</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeaderboardPopup;

// YessPlora Design System
export const theme = {
  colors: {
    primary: '#580404', // Main red color
    primaryDark: '#3D0303', // Darker red for hover states
    primaryLight: '#7A0505', // Lighter red for active states
    secondary: '#000000', // Black
    accent: '#FFFFFF', // White
    background: '#580404', // Red background
    surface: '#000000', // Black surfaces
    text: '#FFFFFF', // White text
    textSecondary: '#CCCCCC', // Light gray text
    border: '#333333', // Dark gray borders
    success: '#00FF00', // Green for success states
    warning: '#FFA500', // Orange for warnings
    error: '#FF0000', // Red for errors
    info: '#00BFFF' // Blue for info
  },
  
  typography: {
    fontFamily: {
      primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
      mono: '"Fira Code", "Monaco", "Consolas", monospace'
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem' // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem' // 96px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(88, 4, 4, 0.5)' // Red glow effect
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
};

// Component-specific styles
export const componentStyles = {
  button: {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.accent,
      border: `2px solid ${theme.colors.primary}`,
      borderRadius: theme.borderRadius.lg,
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: theme.transitions.fast,
      '&:hover': {
        backgroundColor: theme.colors.primaryDark,
        borderColor: theme.colors.primaryDark,
        boxShadow: theme.shadows.glow
      },
      '&:active': {
        backgroundColor: theme.colors.primaryLight,
        transform: 'translateY(1px)'
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: theme.colors.accent,
      border: `2px solid ${theme.colors.accent}`,
      borderRadius: theme.borderRadius.lg,
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: theme.transitions.fast,
      '&:hover': {
        backgroundColor: theme.colors.accent,
        color: theme.colors.primary,
        boxShadow: theme.shadows.glow
      }
    }
  },
  
  input: {
    base: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      border: `2px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius.md,
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base,
      transition: theme.transitions.fast,
      '&:focus': {
        outline: 'none',
        borderColor: theme.colors.primary,
        boxShadow: `0 0 0 3px ${theme.colors.primary}20`
      },
      '&::placeholder': {
        color: theme.colors.textSecondary
      }
    }
  },
  
  card: {
    base: {
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      boxShadow: theme.shadows.md
    }
  },
  
  popup: {
    base: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.colors.surface,
      border: `2px solid ${theme.colors.primary}`,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.xl,
      boxShadow: theme.shadows['2xl'],
      zIndex: theme.zIndex.modal,
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: theme.zIndex.overlay
    }
  }
};

export default theme;

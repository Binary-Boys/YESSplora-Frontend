// YessPlora Neumorphic Design System
export const theme = {
  colors: {
    // Neumorphic color palette - soft grays
    primary: '#E0E0E0', // Light gray base
    secondary: '#F5F5F5', // Lighter gray
    accent: '#2C2C2C', // Dark text
    background: '#E8E8E8', // Main background
    surface: '#F0F0F0', // Card/button surface
    textPrimary: '#2C2C2C',
    textSecondary: '#666666',
    border: '#D0D0D0',
    success: '#4CAF50', // Green for completed
    info: '#2196F3',    // Blue for in-progress
    warning: '#FF9800', // Orange for upcoming
    error: '#F44336',   // Red for errors
    // Neumorphic shadows
    shadowLight: '#FFFFFF',
    shadowDark: '#BEBEBE',
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
    sm: '0.5rem', // 8px - larger for neumorphic
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '2.5rem', // 40px
    full: '9999px'
  },
  
  // Neumorphic shadows
  shadows: {
    // Inset shadows (pressed/active state)
    inset: `inset 8px 8px 16px ${theme?.colors?.shadowDark || '#BEBEBE'}, inset -8px -8px 16px ${theme?.colors?.shadowLight || '#FFFFFF'}`,
    // Outset shadows (raised state)
    outset: `8px 8px 16px ${theme?.colors?.shadowDark || '#BEBEBE'}, -8px -8px 16px ${theme?.colors?.shadowLight || '#FFFFFF'}`,
    // Soft shadows
    soft: `4px 4px 8px ${theme?.colors?.shadowDark || '#BEBEBE'}, -4px -4px 8px ${theme?.colors?.shadowLight || '#FFFFFF'}`,
    // Large shadows
    large: `12px 12px 24px ${theme?.colors?.shadowDark || '#BEBEBE'}, -12px -12px 24px ${theme?.colors?.shadowLight || '#FFFFFF'}`,
    // Glow effect
    glow: `0 0 20px rgba(44, 44, 44, 0.3)`
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

// Neumorphic component styles
export const componentStyles = {
  button: {
    neumorphic: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      border: 'none',
      borderRadius: theme.borderRadius.lg,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: theme.transitions.fast,
      boxShadow: `8px 8px 16px ${theme.colors.shadowDark}, -8px -8px 16px ${theme.colors.shadowLight}`,
      '&:hover': {
        boxShadow: `4px 4px 8px ${theme.colors.shadowDark}, -4px -4px 8px ${theme.colors.shadowLight}`,
        transform: 'translateY(1px)'
      },
      '&:active': {
        boxShadow: `inset 8px 8px 16px ${theme.colors.shadowDark}, inset -8px -8px 16px ${theme.colors.shadowLight}`,
        transform: 'translateY(2px)'
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        boxShadow: `inset 4px 4px 8px ${theme.colors.shadowDark}, inset -4px -4px 8px ${theme.colors.shadowLight}`
      }
    },
    neumorphicPrimary: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      border: 'none',
      borderRadius: theme.borderRadius.lg,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: theme.transitions.fast,
      boxShadow: `8px 8px 16px ${theme.colors.shadowDark}, -8px -8px 16px ${theme.colors.shadowLight}`,
      '&:hover': {
        boxShadow: `12px 12px 24px ${theme.colors.shadowDark}, -12px -12px 24px ${theme.colors.shadowLight}`,
        transform: 'translateY(-1px)'
      },
      '&:active': {
        boxShadow: `inset 8px 8px 16px ${theme.colors.shadowDark}, inset -8px -8px 16px ${theme.colors.shadowLight}`,
        transform: 'translateY(1px)'
      }
    }
  },
  
  input: {
    neumorphic: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      border: 'none',
      borderRadius: theme.borderRadius.md,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      transition: theme.transitions.fast,
      boxShadow: `inset 4px 4px 8px ${theme.colors.shadowDark}, inset -4px -4px 8px ${theme.colors.shadowLight}`,
      '&:focus': {
        outline: 'none',
        boxShadow: `inset 6px 6px 12px ${theme.colors.shadowDark}, inset -6px -6px 12px ${theme.colors.shadowLight}`
      },
      '&::placeholder': {
        color: theme.colors.textSecondary
      }
    }
  },
  
  card: {
    neumorphic: {
      backgroundColor: theme.colors.surface,
      border: 'none',
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.xl,
      boxShadow: `8px 8px 16px ${theme.colors.shadowDark}, -8px -8px 16px ${theme.colors.shadowLight}`
    }
  },
  
  popup: {
    neumorphic: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.colors.surface,
      border: 'none',
      borderRadius: theme.borderRadius['2xl'],
      padding: theme.spacing['2xl'],
      boxShadow: `12px 12px 24px ${theme.colors.shadowDark}, -12px -12px 24px ${theme.colors.shadowLight}`,
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
      backgroundColor: 'rgba(232, 232, 232, 0.8)',
      zIndex: theme.zIndex.overlay
    }
  }
};

export default theme;
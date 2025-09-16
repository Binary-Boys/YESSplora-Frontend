// Comprehensive theme system with proper scaling
export const theme = {
  colors: {
    primary: '#580404', // Dark red background
    secondary: '#000000', // Black for buttons
    accent: '#FFFFFF', // White for text and borders
    background: '#1A1A1A', // Dark background for popups
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#333333',
    success: '#22C55E',
    info: '#8B5CF6',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  
  // Responsive typography scale
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem',    // 96px
      '9xl': '8rem',    // 128px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Responsive spacing scale
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },
  
  // Border radius scale
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // Shadow scale
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 15px rgba(255, 255, 255, 0.6)',
  },
  
  // Z-index scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    modal: '1000',
    popover: '1010',
    tooltip: '1020',
    overlay: '1030',
  },
  
  // Transition scale
  transitions: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    default: 'all 150ms ease-in-out',
    colors: 'color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
    opacity: 'opacity 150ms ease-in-out',
    shadow: 'box-shadow 150ms ease-in-out',
    transform: 'transform 150ms ease-in-out',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Component-specific scales
  components: {
    button: {
      sizes: {
        sm: {
          height: '2rem',      // 32px
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
        },
        md: {
          height: '2.5rem',    // 40px
          padding: '0.625rem 1.25rem',
          fontSize: '1rem',
        },
        lg: {
          height: '3rem',      // 48px
          padding: '0.75rem 1.5rem',
          fontSize: '1.125rem',
        },
        xl: {
          height: '3.5rem',    // 56px
          padding: '1rem 2rem',
          fontSize: '1.25rem',
        },
        '2xl': {
          height: '4rem',      // 64px
          padding: '1.25rem 2.5rem',
          fontSize: '1.5rem',
        },
      },
    },
    
    header: {
      height: '7.5rem',        // 120px
      padding: '0 2rem',
    },
    
    footer: {
      height: '25rem',         // 400px
      padding: '0 2rem',
    },
    
    minimap: {
      width: '31.25rem',       // 500px
      height: '18.75rem',      // 300px
      imageSize: '18.75rem',   // 300px
    },
    
    camera: {
      width: '25rem',          // 400px
      height: '17.5rem',       // 280px
      emojiSize: '9.375rem',   // 150px
      textSize: '2.5rem',      // 40px
    },
    
    profile: {
      width: '17.5rem',        // 280px
      height: '17.5rem',       // 280px
      emojiSize: '7.5rem',     // 120px
      textSize: '2rem',        // 32px
    },
    
    robot: {
      maxWidth: '31.25rem',    // 500px
      maxHeight: '37.5rem',    // 600px
    },
  },
};

// Utility functions for responsive design
export const getResponsiveValue = (values) => {
  if (typeof values === 'object') {
    return values;
  }
  return values;
};

// Media query helpers
export const mediaQueries = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  '2xl': `@media (min-width: ${theme.breakpoints['2xl']})`,
};

// Animation presets
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideInFromTop: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  },
  slideInFromBottom: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  },
  slideInFromRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
};
export const theme = {
  colors: {
    primary: "#FF0080", // Neon pink
    secondary: "#00FFFF", // Neon cyan
    accent: "#FF4500", // Neon orange
    background: "#0a0a0a", // Deep black
    surface: "#1a1a1a", // Dark gray
    surfaceLight: "#2a2a2a", // Lighter gray
    text: "#ffffff",
    textSecondary: "#cccccc",
    textMuted: "#999999",
    border: "#333333",
    success: "#00ff88",
    successLight: "rgba(0, 255, 136, 0.1)", // Light success background
    error: "#ff4444",
    warning: "#ffaa00",
  },
  gradients: {
    primary: "linear-gradient(135deg, #FF0080 0%, #FF4500 100%)",
    secondary: "linear-gradient(135deg, #00FFFF 0%, #FF0080 100%)",
    dark: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    glow: "radial-gradient(circle, rgba(255,0,128,0.3) 0%, rgba(255,0,128,0) 70%)",
  },
  shadows: {
    small: "0 2px 4px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.4)",
    large: "0 8px 16px rgba(0, 0, 0, 0.5)",
    neon: "0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3)",
    neonCyan:
      "0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
    xxxl: "4rem", // 64px
  },
  typography: {
    fontFamily: {
      primary:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      accent: "'Orbitron', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  animations: {
    duration: {
      fast: "0.2s",
      normal: "0.3s",
      slow: "0.5s",
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  zIndex: {
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
  },
};

export type Theme = typeof theme;

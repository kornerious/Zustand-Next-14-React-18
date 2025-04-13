// Base unit for spacing
const BASE_SPACING = 8;

// Spacing system
export const spacing = {
  // Function to get spacing values
  // Example: spacing(2) => 16px
  get: (multiplier = 1) => `${BASE_SPACING * multiplier}px`,
  
  // Predefined spacing values
  xxs: `${BASE_SPACING * 0.25}px`, // 2px
  xs: `${BASE_SPACING * 0.5}px`,   // 4px
  sm: `${BASE_SPACING * 1}px`,     // 8px
  md: `${BASE_SPACING * 2}px`,     // 16px
  lg: `${BASE_SPACING * 3}px`,     // 24px
  xl: `${BASE_SPACING * 4}px`,     // 32px
  xxl: `${BASE_SPACING * 6}px`,    // 48px
  xxxl: `${BASE_SPACING * 8}px`,   // 64px
  
  // Layout specific spacing
  sectionPadding: {
    desktop: `${BASE_SPACING * 12}px ${BASE_SPACING * 3}px`, // 96px 24px
    tablet: `${BASE_SPACING * 8}px ${BASE_SPACING * 3}px`,   // 64px 24px
    mobile: `${BASE_SPACING * 6}px ${BASE_SPACING * 2}px`,   // 48px 16px
  },
  
  // Container max widths
  containerMaxWidth: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  
  // Component specific spacing
  card: {
    padding: `${BASE_SPACING * 3}px`, // 24px
    gap: `${BASE_SPACING * 2}px`,     // 16px
    borderRadius: `${BASE_SPACING * 1}px`, // 8px
  },
  
  button: {
    paddingX: `${BASE_SPACING * 2}px`, // 16px
    paddingY: `${BASE_SPACING * 1}px`, // 8px
    gap: `${BASE_SPACING * 1}px`,      // 8px
  },
  
  // Grid system
  grid: {
    gutter: `${BASE_SPACING * 3}px`,  // 24px
    margin: `${BASE_SPACING * 2}px`,  // 16px
  },
};

export default spacing; 
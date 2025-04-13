export const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  
  // Font weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  
  // Typography variants
  h1: {
    fontWeight: 700,
    fontSize: '3.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
    
    '@media (max-width:600px)': {
      fontSize: '2.5rem',
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: '3rem',
    lineHeight: 1.25,
    letterSpacing: '-0.03em',
    
    '@media (max-width:600px)': {
      fontSize: '2.5rem',
    },
  },
  h3: {
    fontWeight: 600,
    fontSize: '2.5rem',
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
    
    '@media (max-width:600px)': {
      fontSize: '2rem',
    },
  },
  h4: {
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.35,
    letterSpacing: '-0.02em',
    
    '@media (max-width:600px)': {
      fontSize: '1.75rem',
    },
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
    
    '@media (max-width:600px)': {
      fontSize: '1.375rem',
    },
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.5,
    letterSpacing: '-0.01em',
    
    '@media (max-width:600px)': {
      fontSize: '1.125rem',
    },
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0em',
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0em',
  },
  button: {
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },
  overline: {
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};

export default typography; 
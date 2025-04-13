export const palette = {
  // Primary colors - Using dark charcoal for a premium feel, without transparency
  primary: {
    main: '#212121',    // Dark charcoal
    light: '#484848',
    dark: '#000000',
    contrastText: '#ffffff', // White text on dark charcoal
  },
  
  // Secondary colors - Keep mid-gray
  secondary: {
    main: '#757575',
    light: '#a4a4a4',
    dark: '#494949',
    contrastText: '#ffffff',
  },
  
  // Background colors (Keep these dark)
  background: {
    default: '#121212',
    paper: '#1e1e1e',
    card: '#252525',
    elevation1: '#2d2d2d',
    elevation2: '#333333',
  },
  
  // Text colors - Keep increased opacity
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.75)',
    disabled: 'rgba(255, 255, 255, 0.6)',
    hint: 'rgba(255, 255, 255, 0.5)',
  },
  
  // Border colors - Keep slightly lighter
  border: {
    light: 'rgba(255, 255, 255, 0.15)',
    main: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Status colors
  status: {
    success: '#4caf50',
    info: '#2196f3',
    warning: '#ff9800',
    error: '#f44336',
  },
  
  // Common colors
  common: {
    black: '#000000',
    white: '#ffffff',
    transparent: 'transparent',
  },
  
  // Gradients - Update primary gradient
  gradients: {
    primary: 'linear-gradient(45deg, #000000 30%, #212121 90%)', // Dark charcoal gradient
    secondary: 'linear-gradient(45deg, #494949 30%, #757575 90%)',
    dark: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
  },
  
  // Action colors - Keep adjusted opacities
  action: {
    active: 'rgba(255, 255, 255, 0.8)',
    hover: 'rgba(255, 255, 255, 0.1)',
    selected: 'rgba(255, 255, 255, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.4)',
    disabledBackground: 'rgba(255, 255, 255, 0.15)',
  },
};

export default palette; 
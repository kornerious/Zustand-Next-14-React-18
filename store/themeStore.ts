import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaletteMode } from '@mui/material';

// Define theme mode type
type ThemeMode = PaletteMode;

// Define theme color options
export enum ThemeColor {
  DARK_CHARCOAL = 'darkCharcoal',
  BLUE = 'blue',
  GREEN = 'green',
  PURPLE = 'purple',
  RED = 'red'
}

// Color values for each theme option
export const themeColors: Record<ThemeColor, string> = {
  [ThemeColor.DARK_CHARCOAL]: '#212121',
  [ThemeColor.BLUE]: '#1976d2',
  [ThemeColor.GREEN]: '#2e7d32',
  [ThemeColor.PURPLE]: '#7b1fa2',
  [ThemeColor.RED]: '#d32f2f'
};

// Theme state interface with strict typing
interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  reset: () => void;
}

// Define default values
const DEFAULT_MODE: ThemeMode = 'dark';
const DEFAULT_COLOR: ThemeColor = ThemeColor.DARK_CHARCOAL;

// Create the store with persist middleware
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Initial state
      mode: DEFAULT_MODE,
      color: DEFAULT_COLOR,
      
      // Actions
      toggleMode: () => 
        set((state) => ({ 
          mode: state.mode === 'light' ? 'dark' : 'light' 
        })),
      
      setMode: (mode: ThemeMode) => 
        set({ mode }),
      
      setColor: (color: ThemeColor) => 
        set({ color }),
      
      reset: () => 
        set({ 
          mode: DEFAULT_MODE, 
          color: DEFAULT_COLOR 
        }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ 
        mode: state.mode,
        color: state.color
      }),
    }
  )
);

// Selector hooks for performance optimization
export const useThemeMode = (): ThemeMode => useThemeStore((state) => state.mode);
export const useThemeColor = (): ThemeColor => useThemeStore((state) => state.color);
export const useThemeActions = () => useThemeStore((state) => ({
  toggleMode: state.toggleMode,
  setMode: state.setMode,
  setColor: state.setColor,
  reset: state.reset
}));

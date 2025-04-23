'use client';

import { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme, Palette } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { useThemeMode, useThemeColor, themeColors } from '@/store/themeStore';
import { palette } from '../styles/palette';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Get theme settings from store
  const mode = useThemeMode();
  const colorKey = useThemeColor();
  
  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => {
    // Create the base theme with our design system
    const baseTheme = createTheme({
      palette: {
        mode,
        primary: {
          ...palette.primary,
          main: themeColors[colorKey] || palette.primary.main,
        },
        secondary: palette.secondary,
        background: {
          default: mode === 'dark' ? palette.background.default : '#ffffff',
          paper: mode === 'dark' ? palette.background.paper : '#f5f5f5',
        },
        text: mode === 'dark' ? palette.text : {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
        },
        action: mode === 'dark' ? palette.action : {
          active: 'rgba(0, 0, 0, 0.54)',
          hover: 'rgba(0, 0, 0, 0.04)',
          selected: 'rgba(0, 0, 0, 0.08)',
          disabled: 'rgba(0, 0, 0, 0.26)',
          disabledBackground: 'rgba(0, 0, 0, 0.12)',
        },
        error: {
          main: palette.status.error,
        },
        warning: {
          main: palette.status.warning,
        },
        info: {
          main: palette.status.info,
        },
        success: {
          main: palette.status.success,
        },
      },
      typography: typography as TypographyOptions | ((palette: Palette) => TypographyOptions),
      spacing: (factor: number | undefined) => spacing.get(factor),
      shape: {
        borderRadius: parseInt(spacing.card.borderRadius),
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: typography.button.fontWeight,
              borderRadius: spacing.card.borderRadius,
              padding: `${spacing.button.paddingY} ${spacing.button.paddingX}`,
            },
            contained: {
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              },
            },
            outlined: {
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'dark' ? palette.background.paper : '#f5f5f5',
              borderRadius: spacing.card.borderRadius,
            },
          },
        },
      },
    });
    
    return baseTheme;
  }, [mode, colorKey]);

  console.log('[ThemeProvider]', { mode, colorKey, primary: theme.palette.primary });
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider; 
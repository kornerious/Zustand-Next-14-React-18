import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { spacing } from './spacing';

// Create base theme with our design system elements
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: palette.primary,
    secondary: palette.secondary,
    background: {
      default: palette.background.default,
      paper: palette.background.paper,
    },
    text: palette.text,
    action: palette.action,
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
  typography: {
    fontFamily: typography.fontFamily,
    fontWeightLight: typography.fontWeightLight,
    fontWeightRegular: typography.fontWeightRegular,
    fontWeightMedium: typography.fontWeightMedium,
    fontWeightBold: typography.fontWeightBold,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    h5: typography.h5,
    h6: typography.h6,
    subtitle1: typography.subtitle1,
    subtitle2: typography.subtitle2,
    body1: typography.body1,
    body2: typography.body2,
    button: {
      ...typography.button,
      textTransform: "none" as const,
    },
    caption: typography.caption,
    overline: {
      ...typography.overline,
      textTransform: "uppercase" as const,
    },
  },
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
            backgroundColor: palette.action.hover,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          borderRadius: spacing.card.borderRadius,
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
        elevation4: {
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
        },
        elevation8: {
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)',
        },
        elevation12: {
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.1)',
        },
        elevation16: {
          boxShadow: '0 32px 64px rgba(0, 0, 0, 0.1)',
        },
        elevation24: {
          boxShadow: '0 48px 96px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: spacing.card.borderRadius,
          overflow: 'hidden',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: spacing.card.padding,
          '&:last-child': {
            paddingBottom: spacing.card.padding,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: spacing.grid.margin,
          paddingRight: spacing.grid.margin,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          marginTop: `-${spacing.grid.gutter}`,
          width: `calc(100% + ${spacing.grid.gutter})`,
          marginLeft: `-${spacing.grid.gutter}`,
        },
        item: {
          paddingTop: spacing.grid.gutter,
          paddingLeft: spacing.grid.gutter,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.border.main}`,
        },
        head: {
          fontWeight: typography.fontWeightSemiBold,
        },
      },
    },
  }
});

// Make typography responsive
theme = responsiveFontSizes(theme);

export default theme; 
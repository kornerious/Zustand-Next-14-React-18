import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Button } from '@mui/material';

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'transparent'
})<{ transparent?: boolean }>(({ theme, transparent }) => ({
  backgroundColor: transparent 
    ? 'transparent' 
    : theme.palette.background.paper,
  boxShadow: transparent 
    ? 'none' 
    : '0 2px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 4),
  },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const NavLinksContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const NavLink = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginLeft: theme.spacing(2),
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const MobileMenuButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
})); 
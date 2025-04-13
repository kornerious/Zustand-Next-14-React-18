import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material';

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
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 4),
  },
}));

export const LeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const NavSection = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(4),
  },
}));

export const MobileMenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
})); 
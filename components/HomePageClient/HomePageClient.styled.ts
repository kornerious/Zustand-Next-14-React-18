import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';

export const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/images/hero-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(8, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 4),
  },
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: '700px',
}));

export const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 4),
  fontWeight: 600,
  fontSize: '1rem',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: 0,
    width: 60,
    height: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const SectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

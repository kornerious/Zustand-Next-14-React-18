import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

export const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: { xs: '2.5rem', md: '3rem' },
  color: theme.palette.text.primary,
  letterSpacing: '-0.03em',
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
})); 
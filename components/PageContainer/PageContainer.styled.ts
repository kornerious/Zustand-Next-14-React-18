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

export const PageTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '2.5rem',
  '@media (min-width:600px)': {
    fontSize: '3rem',
  },
  letterSpacing: '-0.03em',
});

export const PageSubtitle = styled(Typography)({
  color: 'text.secondary',
  fontWeight: 400,
}); 
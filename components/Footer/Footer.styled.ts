import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

export const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(18, 18, 18, 0.9)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  padding: `${theme.spacing(6)} 0 ${theme.spacing(4)}`,
  marginTop: 'auto'
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  '& a': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },
}));

export const SocialLinks = styled(Stack)(({ theme }) => ({
  '& .MuiIconButton-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
})); 
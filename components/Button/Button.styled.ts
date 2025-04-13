import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&.MuiButton-contained': {
    backgroundColor: '#212121',
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: '#303030',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.16)',
      transform: 'translateY(-2px)',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: '#555555',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      transform: 'translateY(-2px)',
    },
  },
  '&.Mui-disabled': {
    opacity: 0.7,
  },
})); 
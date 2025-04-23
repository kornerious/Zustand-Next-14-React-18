import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
})); 
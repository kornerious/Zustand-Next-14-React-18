import { styled } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';

export const GridContainer = styled(Grid)(({ theme }) => ({
  margin: 0,
  width: '100%',
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  width: '100%',
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
})); 
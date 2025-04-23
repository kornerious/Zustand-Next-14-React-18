import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

export const ShopContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const ShopHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ProductsSection = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

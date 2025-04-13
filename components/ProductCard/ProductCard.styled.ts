import { styled } from '@mui/material/styles';
import { Card, CardContent, Box, Button, Typography } from '@mui/material';

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'fullWidth'
})<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  width: fullWidth ? '100%' : 'auto',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 250,
  overflow: 'hidden',
  padding: 0,
  backgroundColor: theme.palette.background.paper,
}));

export const ContentWrapper = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

export const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  height: '3em',
}));

export const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

export const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  textTransform: 'none',
  fontWeight: 600,
})); 
import { styled } from '@mui/material/styles';
import { Paper, IconButton, Box } from '@mui/material';

export const ModalPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  maxWidth: 900,
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 16,
  top: 16,
  color: 'rgba(255, 255, 255, 0.7)',
  zIndex: 1,
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 400,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
})); 
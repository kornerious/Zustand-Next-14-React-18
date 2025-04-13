import { Product } from '@/types/product';

export interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
} 
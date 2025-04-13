import { Product } from '@/types/product';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  loading?: boolean;
  fullWidth?: boolean;
} 
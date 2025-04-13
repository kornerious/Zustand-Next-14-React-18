import { Product } from '@/types/product';
import { GridProps } from '@mui/material';

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  onAddToCart: (product: Product) => void;
  columns?: GridProps['columns'];
  fullWidth?: boolean;
  emptyMessage?: string;
  spacing?: number;
  categoryKey?: string;
} 
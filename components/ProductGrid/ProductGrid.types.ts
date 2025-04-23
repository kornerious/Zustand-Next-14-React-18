import { Product } from '@/types/product';

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  onAddToCart: (product: Product) => void;
  fullWidth?: boolean;
  emptyMessage?: string;
  spacing?: number;
  categoryKey?: string;
} 
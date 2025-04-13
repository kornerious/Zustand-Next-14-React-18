import { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  paddingY?: number | string | Record<string, number>;
  header?: ReactNode;
  footer?: ReactNode;
} 
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/styles/theme';
import CategoryPageClient from './CategoryPageClient';

// Mock useCartStore
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn((selector) => {
    const state = { addToCart: jest.fn() };
    return selector(state);
  }),
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => () => {
  return function DynamicComponent() {
    return <div data-testid="mocked-product-grid">Mocked Product Grid</div>;
  };
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CategoryPageClient Integration Tests', () => {
  it('integrates with theme provider and renders category title', () => {
    renderWithTheme(<CategoryPageClient products={[]} categoryName="Electronics" />);
    
    // Check if category title is rendered with proper formatting
    expect(screen.getByText('Electronics Products')).toBeInTheDocument();
  });
  
  it('renders empty state when no products are provided', () => {
    renderWithTheme(<CategoryPageClient products={[]} categoryName="Electronics" />);
    
    // Check if the empty state message is shown when no products are available
    expect(screen.getByText('No products found in this category.')).toBeInTheDocument();
  });
});

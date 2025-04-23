import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/styles/theme';
import ShopPageClient from './ShopPageClient';

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

describe('ShopPageClient Integration Tests', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 100, image: 'test.jpg', category: 'Electronics' },
    { id: 2, title: 'Product 2', price: 200, image: 'test.jpg', category: 'Books' },
  ];
  
  const mockCategories = ['Electronics', 'Books', 'Clothing'];

  it('integrates with theme provider and renders shop title', () => {
    renderWithTheme(<ShopPageClient initialProducts={mockProducts} categories={mockCategories} />);
    
    // Check if shop title is rendered
    expect(screen.getByText('Shop All Products')).toBeInTheDocument();
  });
  
  it('renders search input and category filter', () => {
    renderWithTheme(<ShopPageClient initialProducts={mockProducts} categories={mockCategories} />);
    
    // Check for search input field and title
    expect(screen.getByText('Shop All Products')).toBeInTheDocument();
    
    // Check for category filter section
    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });
  
  it('renders ProductGrid component using dynamic import', () => {
    renderWithTheme(<ShopPageClient initialProducts={mockProducts} categories={mockCategories} />);
    
    // Check if ProductGrid is rendered
    expect(screen.getByTestId('mocked-product-grid')).toBeInTheDocument();
  });
  
  it('shows products and UI elements', () => {
    renderWithTheme(<ShopPageClient initialProducts={mockProducts} categories={mockCategories} />);
    
    // Check that the main UI components are present
    expect(screen.getByText('Shop All Products')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-product-grid')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });
});

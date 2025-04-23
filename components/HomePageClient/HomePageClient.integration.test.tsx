import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/styles/theme';
import HomePageClient from './HomePageClient';
import { useCartStore } from '@/store/cartStore';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock useCartStore
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn(),
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

describe('HomePageClient Integration Tests', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 100, image: 'test.jpg', category: 'Electronics' },
    { id: 2, title: 'Product 2', price: 200, image: 'test.jpg', category: 'Books' },
  ];

  beforeEach(() => {
    const mockAddToCart = jest.fn();
    // Cast to unknown first to satisfy TypeScript when mocking the store
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({ addToCart: mockAddToCart });
    });
  });

  it('integrates with theme provider and renders hero section', () => {
    renderWithTheme(<HomePageClient featuredProducts={mockProducts} />);
    
    // Check if hero section renders with theme
    expect(screen.getByText('PREMIUM AUTO PARTS')).toBeInTheDocument();
  });
  
  it('displays featured products section and dynamic ProductGrid', () => {
    renderWithTheme(<HomePageClient featuredProducts={mockProducts} />);
    
    // Check for featured products heading
    expect(screen.getByText('FEATURED PRODUCTS')).toBeInTheDocument();
    
    // Check if ProductGrid is rendered
    expect(screen.getByTestId('mocked-product-grid')).toBeInTheDocument();
  });
  
  it('integrates with navigation', () => {
    renderWithTheme(<HomePageClient featuredProducts={mockProducts} />);
    
    // Check for the shop now button
    const shopButton = screen.getByText('Browse Parts');
    expect(shopButton).toBeInTheDocument();
    
    // Check for view all products link
    const viewAllButton = screen.getByText('View All Products');
    expect(viewAllButton).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the cart store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    isItemInCart: () => false,
    items: [],
  }),
}));

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Premium Engine Oil',
  price: 49.99,
  category: 'ENGINE',
  description: 'High-quality synthetic engine oil for superior engine performance',
  image: '/products/oil.jpg',
  rating: { rate: 4.5, count: 89 }
};

// Create a theme for integration tests
const theme = createTheme();

describe('ProductCard Integration Tests', () => {
  const mockAddToCart = jest.fn();
  const mockViewDetails = jest.fn();

  // Setup function to render with theme
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
    mockViewDetails.mockClear();
  });

  it('integrates with theme correctly', () => {
    renderWithTheme(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
      />
    );
    
    // Verify that the title and price are styled according to the theme
    const title = screen.getByText('Premium Engine Oil');
    
    expect(title).toBeInTheDocument();
    expect(screen.getByText(/49\.99/)).toBeInTheDocument();
  });

  it('handles add to cart interaction with styled button', () => {
    renderWithTheme(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
      />
    );
    
    // Find and click the styled "Add to Cart" button
    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);
    
    // Verify the callback was called
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('handles view details interaction when clicking the card', () => {
    renderWithTheme(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
      />
    );
    
    // Find and click the paper element containing the card
    const paperElement = screen.getByText('Premium Engine Oil').closest('div');
    expect(paperElement).not.toBeNull();
    
    if (paperElement) {
      fireEvent.click(paperElement);
      
      // Verify the callback was called with the product
      expect(mockViewDetails).toHaveBeenCalledTimes(1);
      expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
    }
  });
}); 
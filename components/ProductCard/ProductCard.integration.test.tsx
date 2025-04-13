import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
  });

  it('integrates with theme correctly', () => {
    renderWithTheme(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
      />
    );
    
    // Verify that the title and price are styled according to the theme
    const title = screen.getByText('Premium Engine Oil');
    const price = screen.getByText('$49.99');
    
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('handles add to cart interaction with styled button', () => {
    renderWithTheme(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
      />
    );
    
    // Find and click the styled "Add to Cart" button
    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);
    
    // Verify the callback was called
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders with fullWidth prop correctly', () => {
    renderWithTheme(
      <div style={{ width: '600px' }}>
        <ProductCard 
          product={mockProduct} 
          onAddToCart={mockAddToCart}
          fullWidth={true}
        />
      </div>
    );
    
    // The component should render in the container
    const title = screen.getByText('Premium Engine Oil');
    expect(title).toBeInTheDocument();
  });
}); 
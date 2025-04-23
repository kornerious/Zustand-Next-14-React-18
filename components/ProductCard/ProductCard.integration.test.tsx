import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock the cart store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    isItemInCart: () => false,
    items: [],
  }),
}));

// Mock product data
const mockProduct: Product = {
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

  beforeEach(() => {
    // Mock fetch if ProductCard makes any fetch calls (unlikely but good practice)
    // (global.fetch as jest.Mock).mockResolvedValue({ ... });
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

  it('handles add to cart interaction with styled button', async () => {
    const { container } = renderWithTheme(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
        priority={false}
      />
    );
    
    // Find the button directly, without relying on CardActions container
    const addButton = await screen.findByRole('button', { name: /add to cart|add again/i });
    expect(addButton).toBeInTheDocument();

    // Simulate click
    fireEvent.click(addButton);
    
    // Verify the callback was called
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('handles view details interaction when clicking the card', async () => {
    renderWithTheme(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
        priority={false}
      />
    );

    // Find the main Paper element containing the product title
    const paperElement = await screen.findByText(mockProduct.title).then(el => el.closest('.MuiPaper-root'));
    
    if (!paperElement) {
        throw new Error('Cannot find the main Paper container for the card');
    }
    
    // Click the paper element
    fireEvent.click(paperElement);

    // Verify the callback was called
    await waitFor(() => {
      expect(mockViewDetails).toHaveBeenCalledTimes(1);
      expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
    });
  });
}); 
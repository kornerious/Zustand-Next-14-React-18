import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the cart store using the selector pattern
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn((selector) => {
    // Define a minimal state for these tests
    const state = {
      isItemInCart: jest.fn(() => false), // Default to false
      items: [],
      addToCart: jest.fn(), // Mock other potentially used functions
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    };
    // Execute the selector with the state
    return selector(state);
  }),
}));

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'TEST',
  description: 'Test description',
  image: '/test-image.jpg',
  rating: { rate: 4.5, count: 10 }
};

describe('ProductCard Component', () => {
  const mockAddToCart = jest.fn();
  const mockViewDetails = jest.fn();

  beforeEach(() => {
    mockAddToCart.mockClear();
    mockViewDetails.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
      />
    );
    
    // Verify product title and price are displayed
    const title = screen.getByText('Test Product');
    
    expect(title).toBeInTheDocument();
    // Price may be formatted differently, so we check for part of it
    expect(screen.getByText(/99\.99/)).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
      />
    );
    
    // Find and click the "Add to Cart" button
    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);
    
    // Verify the callback was called with the product
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onViewDetails when card is clicked', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onViewDetails={mockViewDetails}
      />
    );
    
    // Find and click the paper element containing the card
    const paperElement = screen.getByText('Test Product').closest('div');
    expect(paperElement).not.toBeNull();
    
    if (paperElement) {
      fireEvent.click(paperElement);
      
      // Verify the callback was called with the product
      expect(mockViewDetails).toHaveBeenCalledTimes(1);
      expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
    }
  });
}); 
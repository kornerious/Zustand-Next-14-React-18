import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

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

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
      />
    );
    
    // Verify product title and price are displayed
    const title = screen.getByText('Test Product');
    const price = screen.getByText('$99.99');
    
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
      />
    );
    
    // Find and click the "Add to Cart" button
    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);
    
    // Verify the callback was called with the product
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows loading skeleton when loading prop is true', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        loading={true}
      />
    );
    
    // Verify that loading skeletons are shown
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
    
    // Title and price should not be visible when loading
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    expect(screen.queryByText('$99.99')).not.toBeInTheDocument();
  });
}); 
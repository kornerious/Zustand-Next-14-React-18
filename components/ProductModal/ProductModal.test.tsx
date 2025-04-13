import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from './ProductModal';

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

describe('ProductModal Component', () => {
  const mockAddToCart = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    mockAddToCart.mockClear();
    mockClose.mockClear();
  });

  it('renders product information when open', () => {
    render(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={true}
      />
    );
    
    // Verify product details are displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={false}
      />
    );
    
    // Should not display the product details when closed
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    render(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={true}
      />
    );
    
    // Find and click the "Add to Cart" button
    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);
    
    // Verify callback was called with the product
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={true}
      />
    );
    
    // Find and click the close button
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    
    // Verify onClose callback was called
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
}); 
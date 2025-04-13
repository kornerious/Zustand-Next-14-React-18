import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductModal from './ProductModal';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@/components/Button';

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Integration Test Product',
  price: 149.99,
  category: 'TESTING',
  description: 'A product for integration testing',
  image: '/test/integration-image.jpg',
  rating: { rate: 4.8, count: 25 },
  specs: {
    engine: 'V8 Test Engine',
    horsepower: '400hp',
    acceleration: '0-60 in 4.5s',
    topSpeed: '180 mph',
    range: '400 miles',
    seating: '5 passengers'
  }
};

// Create a theme for testing
const theme = createTheme();

// Mock Button component
jest.mock('@/components/Button', () => {
  return function MockButton(props: any) {
    return (
      <button 
        onClick={props.onClick} 
        data-testid="mock-button"
      >
        {props.children}
      </button>
    );
  };
});

describe('ProductModal Integration Tests', () => {
  const mockAddToCart = jest.fn();
  const mockClose = jest.fn();

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
    mockClose.mockClear();
  });

  it('integrates with theme provider', () => {
    renderWithTheme(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={true}
      />
    );
    
    // Verify product details are displayed with proper styling
    expect(screen.getByText('Integration Test Product')).toBeInTheDocument();
    expect(screen.getByText(/149\.99/)).toBeInTheDocument();
  });

  it('integrates with Button component for add to cart', () => {
    renderWithTheme(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={true}
      />
    );
    
    // Find the mocked button and click it
    const button = screen.getByTestId('mock-button');
    fireEvent.click(button);
    
    // Verify callback was triggered
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('displays additional product specs when available', () => {
    renderWithTheme(
      <ProductModal 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
        onClose={mockClose}
        open={true}
      />
    );
    
    // Verify specs are displayed
    expect(screen.getByText('Specifications')).toBeInTheDocument();
    expect(screen.getByText(/V8 Test Engine/)).toBeInTheDocument();
    expect(screen.getByText(/400hp/)).toBeInTheDocument();
  });
}); 
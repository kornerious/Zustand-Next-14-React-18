import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';

// Mock dependencies
jest.mock('next/dynamic', () => () => {
  return function DynamicComponent() {
    return <div data-testid="dynamic-mock-placeholder">Mocked Dynamic Component</div>;
  };
});

describe('ProductGrid', () => {
  const mockOnAddToCart = jest.fn();
  
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 100, image: 'test.jpg', category: 'test' },
    { id: 2, title: 'Product 2', price: 200, image: 'test.jpg', category: 'test' },
  ];

  it('renders loading state correctly', () => {
    render(<ProductGrid products={[]} loading={true} error={null} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByTestId('product-grid-loading')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(<ProductGrid products={[]} loading={false} error="Error loading products" onAddToCart={mockOnAddToCart} />);
    expect(screen.getByTestId('product-grid-error')).toBeInTheDocument();
    expect(screen.getByText('Error loading products')).toBeInTheDocument();
  });

  it('renders products correctly', () => {
    render(
      <ProductGrid
        products={mockProducts}
        loading={false}
        error={null}
        onAddToCart={() => {}}
      />
    );
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getAllByTestId('dynamic-mock-placeholder')).toHaveLength(2);
  });

  it('renders no products message when products array is empty', () => {
    render(<ProductGrid products={[]} loading={false} error={null} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
});

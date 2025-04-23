// components/HomePageClient/HomePageClient.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePageClient from './HomePageClient';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';

// Mock next/navigation
const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock next/dynamic for ProductGrid
jest.mock('next/dynamic', () => () => {
  // eslint-disable-next-line react/display-name
  const MockProductGrid = (props: any) => (
    <div data-testid="mock-product-grid">
        {/* Simulate rendering products and making onAddToCart accessible */}
        {props.products.map((p: Product) => (
            <button key={p.id} onClick={() => props.onAddToCart(p)}>
                Add {p.title}
            </button>
        ))}
    </div>
  );
  return MockProductGrid;
});


// Mock Zustand store
const mockAddToCart = jest.fn();
// Define the type for the mocked store state/actions if needed
// type MockCartStore = { addToCart: jest.Mock };
// jest.mock('@/store/cartStore', () => ({
//   useCartStore: jest.fn<() => jest.Mock, []>(() => mockAddToCart),
// }));
// Simplified mock:
jest.mock('@/store/cartStore');


const mockProducts: Product[] = [
  { id: 1, title: "Test Product 1", price: 10, category: "TEST", description: "Desc 1", image: "/img1.jpg", rating: { rate: 4, count: 10 } },
  { id: 2, title: "Test Product 2", price: 20, category: "TEST", description: "Desc 2", image: "/img2.jpg", rating: { rate: 5, count: 20 } },
];

describe('HomePageClient', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockRouterPush.mockClear();
    mockAddToCart.mockClear();
    // Setup the mock return value for useCartStore
    (useCartStore as unknown as jest.Mock).mockImplementation((selector: (state: any) => any) => {
       // Basic mock store state
       const state = {
           addToCart: mockAddToCart,
           // Add other state properties if selectors need them
       };
       return selector(state);
    });
  });

  it('renders the hero section correctly', () => {
    render(<HomePageClient featuredProducts={mockProducts} />);
    expect(screen.getByRole('heading', { name: /premium auto parts/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse parts/i })).toBeInTheDocument();
    expect(screen.getByAltText('Auto Parts Hero')).toBeInTheDocument();
  });

  it('navigates to shop page when hero button is clicked', () => {
    render(<HomePageClient featuredProducts={mockProducts} />);
    fireEvent.click(screen.getByRole('button', { name: /browse parts/i }));
    expect(mockRouterPush).toHaveBeenCalledWith('/shop');
  });

  it('renders the featured products section title', () => {
    render(<HomePageClient featuredProducts={mockProducts} />);
    expect(screen.getByRole('heading', { name: /featured products/i })).toBeInTheDocument();
  });

  it('renders the mocked ProductGrid and passes correct products', () => {
    render(<HomePageClient featuredProducts={mockProducts} />);
    const grid = screen.getByTestId('mock-product-grid');
    expect(grid).toBeInTheDocument();
    // Check if buttons for products are rendered (indirectly checks products prop)
    expect(screen.getByRole('button', { name: /Add Test Product 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Test Product 2/i })).toBeInTheDocument();
  });

   it('calls addToCart when a product button inside mocked ProductGrid is clicked', () => {
     render(<HomePageClient featuredProducts={mockProducts} />);
     const addButton1 = screen.getByRole('button', { name: /Add Test Product 1/i });
     fireEvent.click(addButton1);
     // Check if the selector logic correctly returned mockAddToCart and it was called
     expect(mockAddToCart).toHaveBeenCalledTimes(1);
     expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]); // Ensure correct product is passed
   });

  it('renders the "View All Products" button and navigates on click', () => {
    render(<HomePageClient featuredProducts={mockProducts} />);
    const viewAllButton = screen.getByRole('button', { name: /view all products/i });
    expect(viewAllButton).toBeInTheDocument();
    fireEvent.click(viewAllButton);
    expect(mockRouterPush).toHaveBeenCalledWith('/shop');
  });
});

import React from 'react';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header'; 
// Do not import useCartStore directly, rely on the mock

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'), // Add this mock
}));

// Mock the Zustand store correctly for unit tests
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn((selector) => {
    // Define a default mock state that tests can override
    const state = {
      items: [], // Default to empty array
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    };
    // Execute the selector passed by the component against the mock state
    return selector(state);
  }),
}));

// Mock next/dynamic (basic mock for unit test, might need adjustment)
jest.mock('next/dynamic', () => (load: () => Promise<any>) => {
  // Basic mock: Return a simple placeholder
  const MockedComponent = () => <div data-testid="mock-dynamic">Dynamic Component Mock</div>;
  MockedComponent.displayName = 'MockedDynamic';
  return MockedComponent;
});


describe('Header Component Unit Tests', () => {
  // Set up the mock state before each test
  beforeEach(() => {
    // Reset mocks to clear any previous state
    jest.clearAllMocks();
    // Provide a default implementation for useCartStore for most tests
    // Import the mock dynamically inside beforeEach or rely on the jest.mock hoist
    const mockUseCartStore = require('@/store/cartStore').useCartStore;
    mockUseCartStore.mockImplementation((selector: any) => {
      const state = {
        items: [], // Default: empty cart
      };
      return selector(state);
    });
  });

  it('renders correctly with default props and empty cart', async () => {
    render(<Header />);
    // Check for a key element like the main container or AppBar role
    expect(screen.getByRole('banner')).toBeInTheDocument(); // MUI AppBar has role 'banner'
    // Check if the cart icon is present
    const cartIcon = screen.getByLabelText('cart'); // IconButton has aria-label
    expect(cartIcon).toBeInTheDocument();
  });

  it('displays the correct item count from the cart store', async () => {
    // Override the mock implementation for this specific test
    const mockUseCartStore = require('@/store/cartStore').useCartStore;
    mockUseCartStore.mockImplementation((selector: any) => {
      const state = {
        items: [
          { id: '1', name: 'Item 1', quantity: 2, price: 10, image: '' },
          { id: '2', name: 'Item 2', quantity: 1, price: 5, image: '' },
          { id: '3', name: 'Item 3', quantity: 2, price: 10, image: '' },
        ],
      };
      return selector(state);
    });

    render(<Header />);
    // Check if the cart icon is present
    const cartIcon = screen.getByLabelText('cart');
    expect(cartIcon).toBeInTheDocument();
    
    // Find the badge within the cart icon link/button and check its content
    // MUI Badge typically has a role='status' for the badge content
    const badge = await within(cartIcon).findByText('5');
    expect(badge).toBeInTheDocument();
  });
});
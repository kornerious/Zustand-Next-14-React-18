import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

// Mock the useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// Mock the useCartStore
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    items: [{ id: 1, title: 'Test Product', price: 10, quantity: 1 }],
  }),
}));

describe('Navbar Component', () => {
  it('renders the navbar with logo', () => {
    render(<Navbar />);
    
    // Check logo is present
    expect(screen.getByAltText('Auto Parts Shop')).toBeInTheDocument();
  });

  it('displays cart items count', () => {
    render(<Navbar />);
    
    // There should be 1 item in the cart from the mock
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders with transparent prop', () => {
    render(<Navbar transparent />);
    
    // Even in transparent mode, logo should be visible
    expect(screen.getByAltText('Auto Parts Shop')).toBeInTheDocument();
  });
}); 
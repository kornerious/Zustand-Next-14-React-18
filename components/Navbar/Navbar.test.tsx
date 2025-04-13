import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
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

// Mock the theme store
jest.mock('@/store/themeStore', () => ({
  useThemeMode: () => 'light',
  useThemeActions: () => ({
    toggleMode: jest.fn(),
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

  it('renders navbar elements correctly', () => {
    render(<Navbar />);
    
    // Should have Shop link
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });
}); 
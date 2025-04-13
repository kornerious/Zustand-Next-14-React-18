import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock the cart store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    items: [{ id: 1, title: 'Test Product', price: 10, quantity: 1 }],
  }),
}));

describe('Header Component', () => {
  it('renders logo and navigation items', () => {
    render(<Header />);
    
    // Check logo is present
    expect(screen.getByText('AUTO PARTS')).toBeInTheDocument();
    
    // Check navigation links are present
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByText('CATEGORIES')).toBeInTheDocument();
    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });
}); 
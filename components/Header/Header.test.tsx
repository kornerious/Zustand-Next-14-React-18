import { render, screen } from '@testing-library/react';
import Header from './Header';

// Mock the useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

describe('Header Component', () => {
  it('renders logo and navigation items', () => {
    render(<Header />);
    
    // Check logo is present
    expect(screen.getByAltText('Auto Parts Shop')).toBeInTheDocument();
    
    // Check navigation links are present
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders with transparent prop correctly', () => {
    render(<Header transparent />);
    
    // Check logo is present in transparent mode
    expect(screen.getByAltText('Auto Parts Shop')).toBeInTheDocument();
  });
}); 
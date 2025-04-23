import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the footer with logo and links', () => {
    render(<Footer />);
    
    // Check for the logo presence
    expect(screen.getByRole('heading', { name: 'AUTO PARTS' })).toBeInTheDocument();
    
    // Check for footer sections
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Customer Service')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
    
    // Check for common links
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    
    // Check for the copyright text
    expect(screen.getByText(/© \d{4} Auto Parts/)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/styles/theme';
import Footer from './Footer';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Footer Integration Tests', () => {
  it('integrates with theme provider correctly', () => {
    renderWithTheme(<Footer />);
    
    // Check if footer renders with theme
    expect(screen.getByRole('heading', { name: 'AUTO PARTS' })).toBeInTheDocument();
    
    // Check for links with proper styling
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
  
  it('displays all navigation sections with proper theming', () => {
    renderWithTheme(<Footer />);
    
    // Shop section
    expect(screen.getByText('Shop')).toBeInTheDocument();
    
    // Customer Service section
    expect(screen.getByText('Customer Service')).toBeInTheDocument();
    
    // Legal section
    expect(screen.getByText('Legal')).toBeInTheDocument();
    
    // Check for social media icons
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });
});

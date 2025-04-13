import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock the useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// Create a theme for testing
const theme = createTheme();

describe('Header Integration Tests', () => {
  // Setup function to render with theme
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  it('integrates with theme provider', () => {
    renderWithTheme(<Header />);
    
    // Check logo is present
    expect(screen.getByAltText('Auto Parts Shop')).toBeInTheDocument();
  });

  it('navigates to cart when cart icon is clicked', () => {
    const pushMock = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: pushMock,
      pathname: '/',
    }));

    renderWithTheme(<Header />);
    
    // Find the cart button and click it
    const cartButton = screen.getByLabelText('cart');
    fireEvent.click(cartButton);
    
    // Verify navigation occurred
    expect(pushMock).toHaveBeenCalledWith('/cart');
  });
}); 
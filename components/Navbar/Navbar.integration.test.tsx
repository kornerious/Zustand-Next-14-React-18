import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

// Create a theme for testing
const theme = createTheme();

describe('Navbar Integration Tests', () => {
  // Setup function to render with theme
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  it('integrates with theme provider', () => {
    renderWithTheme(<Navbar />);
    
    // Check logo is present
    expect(screen.getByAltText('Auto Parts Shop')).toBeInTheDocument();
  });

  it('navigates when logo is clicked', () => {
    const pushMock = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: pushMock,
      pathname: '/',
    }));

    renderWithTheme(<Navbar />);
    
    // Find the logo and click it
    const logo = screen.getByAltText('Auto Parts Shop');
    fireEvent.click(logo);
    
    // Verify navigation occurred
    expect(pushMock).toHaveBeenCalledWith('/');
  });
}); 
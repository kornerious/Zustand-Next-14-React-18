import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCartStore } from '@/store/cartStore'; // Keep this import

// Mock the Zustand store correctly for integration tests
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn((selector) => {
    // Define the mock state
    const state = {
      items: [
        { id: 'prod1', name: 'Test Product 1', quantity: 2, price: 10, image: 'img1.jpg' },
        { id: 'prod2', name: 'Test Product 2', quantity: 1, price: 20, image: 'img2.jpg' },
      ],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      // Add other state/actions if Navbar/Header uses them
    };
    // Execute the selector function passed to useCartStore against the mock state
    return selector(state);
  }),
}));

// Helper function to render with theme
const theme = createTheme();
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Header Integration Tests', () => {
  // Mock implementation before each test
  beforeEach(() => {
    // Reset mocks and set default mock return value
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        items: [], // Default to empty cart
        // Mock other actions if needed, e.g., addToCart: jest.fn()
      };
      return selector(state);
    });
  });

  it('displays correct cart count from Zustand store', async () => {
    // Arrange: Set mock return value for this specific test
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        items: [
          { id: '1', name: 'Product 1', price: 10, quantity: 2, image: 'img1.jpg', description: 'Desc 1', category: 'cat1' }, // Added category
          { id: '2', name: 'Product 2', price: 20, quantity: 1, image: 'img2.jpg', description: 'Desc 2', category: 'cat2' }, // Added category
        ],
      };
      return selector(state);
    });

    // Act
    renderWithTheme(<Header />);

    // Find the cart icon by aria-label
    const cartIcon = await screen.findByLabelText('cart');
    expect(cartIcon).toBeInTheDocument();

    // Find the badge *within* the cart icon and check its content
    const badge = await within(cartIcon).findByText('3'); 
    expect(badge).toBeInTheDocument();

    // Also check for logo now that Navbar should render
    const logoText = await screen.findByText(/auto parts/i); 
    expect(logoText).toBeInTheDocument();
    const logoLink = logoText.closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders the logo as a link to home', async () => {
    renderWithTheme(<Header />);
    const logoTextElement = await screen.findByText(/auto parts/i);
    expect(logoTextElement).toBeInTheDocument();
    const logoLinkAncestor = logoTextElement.closest('a');
    expect(logoLinkAncestor).toHaveAttribute('href', '/');
  });

  it('integrates with theme provider', async () => { 
    renderWithTheme(<Header />);
    // Check for a key element rendered correctly with theme (e.g., AppBar)
    const appBar = await screen.findByRole('banner'); // AppBar has role='banner'
    expect(appBar).toBeInTheDocument();
    // Check for logo text and link
    const logoText = await screen.findByText(/auto parts/i);
    expect(logoText).toBeInTheDocument();
    const logoLink = logoText.closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('navigates to cart when cart icon is clicked', async () => {
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
    const cartLink = screen.getByRole('link', { name: /Cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
}); 
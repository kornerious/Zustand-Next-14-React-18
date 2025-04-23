// jest.setup.js
import React from 'react'; 
import '@testing-library/jest-dom/extend-expect';

// Mock Next.js Navigation
// Define the mock functions first
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
const mockUsePathname = jest.fn(() => '/'); // Default mock pathname
const mockUseSearchParams = jest.fn(() => ({ get: jest.fn() }));
const mockUseRouter = jest.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  prefetch: mockPrefetch,
  back: mockBack,
  forward: mockForward,
}));
const mockUseParams = jest.fn(() => ({ productId: '1' }));

jest.mock('next/navigation', () => ({
  useRouter: mockUseRouter,
  usePathname: mockUsePathname, // Ensure this is assigned correctly
  useSearchParams: mockUseSearchParams,
  useParams: mockUseParams,
}));

// Simpler Mock for next/dynamic
jest.mock('next/dynamic', () => (load) => {
  // Return a simple functional component mock.
  // This avoids complex loading logic and potential scope issues.
  const DynamicComponentMock = (props) => {
     // Render a simple placeholder div.
     // JSX requires React in scope, which we imported at the top.
     return <div data-testid="dynamic-mock-placeholder">Mocked Dynamic Component</div>;
     // Alternatively, render children if passed: return <>{props.children}</>;
  };
  DynamicComponentMock.displayName = 'DynamicMock';
  return DynamicComponentMock; // Return the mock component constructor
});


// Mock Next.js Image
jest.mock('next/image', () => {
  // Define a functional component for the mock
  const MockImage = (props) => {
    // Destructure props, filtering out 'fill', 'blurDataURL', and 'priority'
    const { fill, blurDataURL, priority, ...restProps } = props;
    
    // Define base style
    let style = {};
    // If fill was true, potentially add styles? For now, just filter it.
    if (fill) {
      style = { objectFit: 'cover', width: '100%', height: '100%' };
    }
    // Return the img element with the filtered props and style
    return <img {...restProps} alt={props.alt || ''} style={style} />;
  };
  return MockImage; // Return the mock component constructor
});

// Mock Zustand Cart Store
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn((selector) => {
    // Default state mock: empty cart
    const defaultState = {
      items: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      isItemInCart: jest.fn(() => false),
    };
    // Execute the selector function with the default state
    return selector(defaultState);
  }),
}));

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    // Default fetch mock - return categories for Navbar
    json: () => Promise.resolve({ categories: ['MockCategory1', 'MockCategory2'] }),
  })
);

// Mock matchMedia for MUI responsiveness (useMediaQuery)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // Default behavior
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Clean up mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

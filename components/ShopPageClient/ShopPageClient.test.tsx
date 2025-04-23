import { render, screen } from '@testing-library/react';
import ShopPageClient from './ShopPageClient';

// Mock the necessary dependencies and props
jest.mock('@/store/cartStore', () => ({
  useCartStore: jest.fn((selector) => {
    const state = { addToCart: jest.fn() };
    return selector(state);
  }),
}));

describe('ShopPageClient', () => {
  it('renders without crashing', () => {
    render(<ShopPageClient initialProducts={[]} categories={[]} />);
    expect(screen.getByTestId('shop-page-client')).toBeInTheDocument();
  });
});

import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      title: 'Brake Pads',
      description: 'High-quality brake pads for safe stopping.',
      price: 49.99,
      category: 'Brakes',
      image: '/placeholder.png',
      rating: { rate: 4.5, count: 120 },
    },
    onAddToCart: () => {},
    onViewDetails: () => {},
    priority: false,
    redirectToCart: false,
    router: {
      push: () => {},
      replace: () => {},
      prefetch: () => Promise.resolve(),
      back: () => {},
      forward: () => {},
      refresh: () => {},
    },
  },
};

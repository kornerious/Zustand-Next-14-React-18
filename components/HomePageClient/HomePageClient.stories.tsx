import type { Meta, StoryObj } from '@storybook/react';
import HomePageClient from './HomePageClient';

const meta: Meta<typeof HomePageClient> = {
  title: 'Pages/HomePageClient',
  component: HomePageClient,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HomePageClient>;

const mockProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price: 19.99 + i * 5,
  category: 'Category',
  image: '/placeholder.png',
  rating: { rate: 4.5, count: 10 + i },
}));

export const Default: Story = {
  args: {
    featuredProducts: mockProducts,
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

import type { Meta, StoryObj } from '@storybook/react';
import ShopPageClient from './ShopPageClient';

const meta: Meta<typeof ShopPageClient> = {
  title: 'Pages/ShopPageClient',
  component: ShopPageClient,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof ShopPageClient>;

export const Default: Story = {
  args: {
    initialProducts: [
      {
        id: 1,
        title: 'Brake Pads',
        description: 'High-quality brake pads for safe stopping.',
        price: 49.99,
        category: 'Brakes',
        image: '/placeholder.png',
        rating: { rate: 4.5, count: 120 },
      },
      {
        id: 2,
        title: 'Oil Filter',
        description: 'Premium oil filter for engine protection.',
        price: 12.99,
        category: 'Engine',
        image: '/placeholder.png',
        rating: { rate: 4.2, count: 50 },
      },
    ],
    categories: ['Brakes', 'Engine', 'Suspension', 'Electronics'],
  },
};

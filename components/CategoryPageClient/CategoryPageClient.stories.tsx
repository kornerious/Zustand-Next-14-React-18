import type { Meta, StoryObj } from '@storybook/react';
import CategoryPageClient from './CategoryPageClient';

const meta: Meta<typeof CategoryPageClient> = {
  title: 'Pages/CategoryPageClient',
  component: CategoryPageClient,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CategoryPageClient>;

export const Default: Story = {
  args: {
    products: [
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
        title: 'Brake Discs',
        description: 'Durable brake discs for enhanced performance.',
        price: 89.99,
        category: 'Brakes',
        image: '/placeholder.png',
        rating: { rate: 4.7, count: 80 },
      },
    ],
    categoryName: 'Brakes',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import ProductModal from './ProductModal';

const meta: Meta<typeof ProductModal> = {
  title: 'Product/ProductModal',
  component: ProductModal,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ProductModal>;

export const Default: Story = {
  args: {
    product: {
      id: 2,
      title: 'Performance Air Filter',
      description: 'Boost your engine efficiency with this high-flow air filter.',
      price: 29.99,
      category: 'Engine',
      image: '/placeholder.png',
      rating: { rate: 4.8, count: 75 },
    },
    open: true,
    onClose: () => {},
    onAddToCart: () => {},
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

import type { Meta, StoryObj } from '@storybook/react';
import ProductGrid from './ProductGrid';

const meta: Meta<typeof ProductGrid> = {
  title: 'Product/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import ProductModal from './ProductModal';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const mockProduct = {
  id: 1,
  title: 'Premium Engine Oil',
  price: 49.99,
  category: 'ENGINE',
  description: 'High-quality synthetic engine oil for superior engine performance and extended engine life. Provides excellent protection against wear and tear, reduces friction, and improves fuel efficiency.',
  image: '/products/oil.jpg',
  rating: { rate: 4.5, count: 89 },
  specs: {
    type: 'Synthetic',
    capacity: '5W-30',
    volume: '1 Gallon',
    manufacturer: 'Quality Motors Inc.'
  }
};

const meta: Meta<typeof ProductModal> = {
  title: 'Products/ProductModal',
  component: ProductModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onClose: { action: 'closed' },
    onAddToCart: { action: 'add to cart clicked' }
  },
};

export default meta;
type Story = StoryObj<typeof ProductModal>;

export const Open: Story = {
  args: {
    product: mockProduct,
    open: true,
  },
};

export const Closed: Story = {
  args: {
    product: mockProduct,
    open: false,
  },
}; 
import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme();

const mockProduct = {
  id: 1,
  title: 'Premium Engine Oil',
  price: 49.99,
  category: 'ENGINE',
  description: 'High-quality synthetic engine oil for superior engine performance',
  image: '/products/oil.jpg',
  rating: { rate: 4.5, count: 89 }
};

const meta: Meta<typeof ProductCard> = {
  title: 'Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: 300, m: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onAddToCart: { action: 'add to cart clicked' }
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: mockProduct,
    loading: false,
    fullWidth: false,
  },
};

export const Loading: Story = {
  args: {
    product: mockProduct,
    loading: true,
    fullWidth: false,
  },
};

export const FullWidth: Story = {
  args: {
    product: mockProduct,
    loading: false,
    fullWidth: true,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', maxWidth: 600, m: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
}; 
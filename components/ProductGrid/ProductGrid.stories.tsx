import type { Meta, StoryObj } from '@storybook/react';
import ProductGrid from './ProductGrid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme();

// Mock products
const mockProducts = [
  {
    id: 1,
    title: 'Premium Engine Oil',
    price: 49.99,
    category: 'ENGINE',
    description: 'High-quality synthetic engine oil',
    image: '/products/oil.jpg',
    rating: { rate: 4.5, count: 89 }
  },
  {
    id: 2,
    title: 'Performance Brake Pads',
    price: 129.99,
    category: 'BRAKES',
    description: 'Enhanced stopping power for all conditions',
    image: '/products/brakes.jpg',
    rating: { rate: 4.7, count: 65 }
  },
  {
    id: 3,
    title: 'LED Headlight Kit',
    price: 199.99,
    category: 'LIGHTING',
    description: 'Ultra-bright LED headlight conversion',
    image: '/products/lights.jpg',
    rating: { rate: 4.3, count: 42 }
  },
  {
    id: 4,
    title: 'Air Filter System',
    price: 59.99,
    category: 'ENGINE',
    description: 'High-flow air filtration system',
    image: '/products/filter.jpg',
    rating: { rate: 4.2, count: 31 }
  }
];

const meta: Meta<typeof ProductGrid> = {
  title: 'Products/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', p: 3 }}>
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
type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {
  args: {
    products: mockProducts,
    loading: false,
    error: null,
    columns: { xs: 12, sm: 6, md: 4, lg: 3 },
    fullWidth: false,
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
    error: null,
    columns: { xs: 12, sm: 6, md: 4, lg: 3 },
    fullWidth: false,
  },
};

export const WithError: Story = {
  args: {
    products: [],
    loading: false,
    error: 'Failed to load products. Please try again later.',
    columns: { xs: 12, sm: 6, md: 4, lg: 3 },
    fullWidth: false,
  },
};

export const FullWidth: Story = {
  args: {
    products: mockProducts,
    loading: false,
    error: null,
    columns: { xs: 12, sm: 6, md: 4, lg: 3 },
    fullWidth: true,
  },
}; 
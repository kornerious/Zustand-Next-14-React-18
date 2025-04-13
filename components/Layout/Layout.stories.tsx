import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Content goes here</Typography>
        <Typography>This is a sample content inside the Layout component.</Typography>
      </Box>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Long Content Example</Typography>
        {Array.from({ length: 10 }).map((_, i) => (
          <Typography key={i} paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus 
            ut eleifend nibh porttitor. Ut in nulla enim.
          </Typography>
        ))}
      </Box>
    ),
  },
}; 
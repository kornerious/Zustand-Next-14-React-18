import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Box } from '@mui/material';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      defaultValue: 'contained',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Outlined Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Text Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Small Button',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Large Button',
    size: 'large',
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="outlined" color="primary">Outlined</Button>
      <Button variant="text" color="primary">Text</Button>
    </Box>
  ),
}; 
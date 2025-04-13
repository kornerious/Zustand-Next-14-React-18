import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const Transparent: Story = {
  args: {
    transparent: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}; 
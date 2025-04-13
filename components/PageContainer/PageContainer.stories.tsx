import type { Meta, StoryObj } from '@storybook/react';
import PageContainer from './PageContainer';
import { Box, Typography, Paper, Grid } from '@mui/material';

const meta: Meta<typeof PageContainer> = {
  title: 'Layout/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'This is a descriptive subtitle for the page',
    children: (
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          This is the main content of the page container.
        </Typography>
      </Paper>
    ),
  },
};

export const WithoutTitles: Story = {
  args: {
    children: (
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          This is a page without a title or subtitle.
        </Typography>
      </Paper>
    ),
  },
};

export const WithGridContent: Story = {
  args: {
    title: 'Grid Layout Example',
    subtitle: 'A PageContainer with grid-based content',
    children: (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Paper 
              sx={{ 
                p: 3, 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Typography variant="h4">Item {item}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    title: 'With Custom Header and Footer',
    subtitle: 'This page has custom header and footer elements',
    header: (
      <Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white', mb: 2 }}>
        <Typography variant="h6">Custom Header</Typography>
      </Box>
    ),
    footer: (
      <Box sx={{ bgcolor: 'grey.800', p: 2, color: 'white', mt: 2 }}>
        <Typography variant="body2">Custom Footer © 2023</Typography>
      </Box>
    ),
    children: (
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Main content with custom header and footer.
        </Typography>
      </Paper>
    ),
  },
}; 
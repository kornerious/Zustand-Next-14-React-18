import '../app/globals.css';
import React from 'react';
import { useThemeActions, ThemeColor } from '../store/themeStore';

// Force theme state in Storybook to match the live site
const forceTheme = () => {
  const { setMode, setColor } = useThemeActions();
  React.useEffect(() => {
    setMode('dark'); // or 'light' if your site default is light
    setColor(ThemeColor.DARK_CHARCOAL); // or your preferred default color
  }, [setMode, setColor]);
};
import type { Preview, StoryFn } from '@storybook/react';
import { withNextRouter } from './NextRouterDecorator';
import ThemeProvider from '../app/providers/ThemeProvider';

import { useThemeStore } from '../store/themeStore';

const withDesignSystem = (Story: StoryFn) => {
  // Set Zustand theme state synchronously for every story
  useThemeStore.setState({ mode: 'dark', color: ThemeColor.DARK_CHARCOAL });
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withNextRouter, withDesignSystem],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
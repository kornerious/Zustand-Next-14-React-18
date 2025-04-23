import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const mockRouter = {
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  basePath: '',
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
};

export const withNextRouter = (Story) => (
  <RouterContext.Provider value={mockRouter}>
    <AppRouterContext.Provider value={mockRouter as any}>
      <Story />
    </AppRouterContext.Provider>
  </RouterContext.Provider>
);

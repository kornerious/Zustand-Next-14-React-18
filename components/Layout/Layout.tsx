'use client';

import React, { Suspense, memo } from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';
import { LayoutContainer, MainContent } from './Layout.styled';
import { LayoutProps } from './Layout.types';

// Dynamically import components that aren't needed for initial paint
const Header = dynamic(() => import('@/components/Header/Header'), {
  ssr: true
});

const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  ssr: false,
});

/**
 * Optimized Layout component that wraps the entire application
 * - Uses React.memo to prevent unnecessary re-renders
 * - Implements code splitting via dynamic imports
 * - Uses Suspense for better loading states
 */
const Layout = memo(({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent component="main">
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress size={40} />
          </Box>
        }>
          {children}
        </Suspense>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
});

Layout.displayName = 'Layout';

export default Layout;

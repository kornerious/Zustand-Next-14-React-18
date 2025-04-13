'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { LayoutContainer, MainContent } from './Layout.styled';
import { LayoutProps } from './Layout.types';

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent component="main">
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

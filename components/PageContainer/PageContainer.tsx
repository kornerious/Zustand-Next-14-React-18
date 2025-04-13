'use client';

import { Box, Container, Typography } from '@mui/material';
import { PageContainerProps } from './PageContainer.types';
import { PageWrapper, StyledContainer, PageTitle, PageSubtitle } from './PageContainer.styled';

export default function PageContainer({
  children,
  title,
  subtitle,
  maxWidth = 'lg',
  disableGutters = false,
  paddingY = { xs: 4, md: 8 },
  header,
  footer
}: PageContainerProps) {
  return (
    <PageWrapper
      component="main"
      sx={{
        py: paddingY
      }}
    >
      {header}
      
      <StyledContainer 
        maxWidth={maxWidth} 
        disableGutters={disableGutters}
      >
        {title && (
          <PageTitle
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              mb: subtitle ? 2 : 6
            }}
          >
            {title}
          </PageTitle>
        )}
        
        {subtitle && (
          <PageSubtitle
            variant="h5"
            sx={{
              mb: 6
            }}
          >
            {subtitle}
          </PageSubtitle>
        )}
        
        {children}
      </StyledContainer>
      
      {footer}
    </PageWrapper>
  );
} 
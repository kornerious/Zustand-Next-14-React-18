'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FooterWrapper, FooterSection, SocialLinks } from './Footer.styled';

const Footer = () => {
  return (
    <FooterWrapper>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1500px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              AUTO PARTS
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Quality parts for your vehicle's performance and style. We offer a wide selection of premium auto parts for all major makes and models.
            </Typography>
            <SocialLinks direction="row" spacing={1}>
              <IconButton aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </SocialLinks>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Shop
              </Typography>
              <MuiLink component={Link} href="/shop" underline="hover">All Products</MuiLink>
              <MuiLink component={Link} href="/categories" underline="hover">Categories</MuiLink>
              <MuiLink component={Link} href="/shop?category=engine" underline="hover">Engine Parts</MuiLink>
              <MuiLink component={Link} href="/shop?category=brakes" underline="hover">Brake Systems</MuiLink>
              <MuiLink component={Link} href="/shop?category=lighting" underline="hover">Lighting</MuiLink>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Customer Service
              </Typography>
              <MuiLink component={Link} href="/contact" underline="hover">Contact Us</MuiLink>
              <MuiLink component={Link} href="/faq" underline="hover">FAQ</MuiLink>
              <MuiLink component={Link} href="/shipping" underline="hover">Shipping & Returns</MuiLink>
              <MuiLink component={Link} href="/warranty" underline="hover">Warranty</MuiLink>
              <MuiLink component={Link} href="/about" underline="hover">About Us</MuiLink>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Legal
              </Typography>
              <MuiLink component={Link} href="/terms" underline="hover">Terms of Service</MuiLink>
              <MuiLink component={Link} href="/privacy" underline="hover">Privacy Policy</MuiLink>
              <MuiLink component={Link} href="/cookie" underline="hover">Cookie Policy</MuiLink>
            </FooterSection>
          </Grid>
        </Grid>
        
        <Box sx={{ pt: 4, pb: 2, mt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Auto Parts Shop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </FooterWrapper>
  );
};

export default Footer; 
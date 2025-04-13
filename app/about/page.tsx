'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Container,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

// Team member data
const teamMembers = [
  {
    name: 'Alex Johnson',
    position: 'CEO & Founder',
    bio: '15+ years experience in automotive industry. Passionate about quality parts and customer service.',
    avatar: '/placeholder-person.jpg'
  },
  {
    name: 'Sarah Chen',
    position: 'Chief Operations Officer',
    bio: 'Former supply chain director with expertise in logistics and inventory management.',
    avatar: '/placeholder-person.jpg'
  },
  {
    name: 'Marcus Williams',
    position: 'Lead Product Specialist',
    bio: 'ASE certified master technician with deep knowledge of automotive parts and accessories.',
    avatar: '/placeholder-person.jpg'
  },
  {
    name: 'Jennifer Lopez',
    position: 'Customer Experience Director',
    bio: 'Dedicated to ensuring every customer receives exceptional service and support.',
    avatar: '/placeholder-person.jpg'
  }
];

// Company values
const companyValues = [
  {
    title: 'Quality',
    description: 'We source only the highest quality parts and accessories to ensure reliability and performance.'
  },
  {
    title: 'Expertise',
    description: 'Our team of automotive experts vets each product to ensure it meets our strict standards.'
  },
  {
    title: 'Integrity',
    description: 'We operate with transparency and honesty in every customer interaction and business decision.'
  },
  {
    title: 'Innovation',
    description: 'We continuously seek new and improved automotive solutions to meet evolving customer needs.'
  }
];

export default function AboutPage() {
  return (
    <Layout>
      <PageContainer title="About Us" subtitle="Your trusted partner for premium auto parts">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 300, md: 450 },
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper'
              }}
            >
              <Image
                src="/placeholder-store.jpg"
                alt="Our shop"
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Our Story</Typography>
            <Typography paragraph>
              Founded in 2010, Auto Parts Shop began with a simple mission: to provide high-quality parts 
              that enhance vehicle performance, reliability, and style. What started as a small operation 
              has grown into a trusted name in the automotive industry.
            </Typography>
            <Typography paragraph>
              With over a decade of experience, we've built our reputation on expert knowledge, exceptional 
              customer service, and a passion for all things automotive. Our team of specialists carefully 
              selects each product in our catalog to ensure it meets our rigorous standards.
            </Typography>
            <Typography paragraph>
              Today, we serve thousands of customers nationwide, from DIY enthusiasts to professional 
              mechanics and auto shops. We take pride in being part of your vehicle's journey, whether 
              you're restoring a classic car, upgrading your daily driver, or maintaining your family SUV.
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
            Our Values
          </Typography>
          
          <Grid container spacing={4}>
            {companyValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '100%', 
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Our Team
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 0, 
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ position: 'relative', height: 240, width: '100%' }}>
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                    {member.position}
                  </Typography>
                  <Typography variant="body2">
                    {member.bio}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </Layout>
  );
} 
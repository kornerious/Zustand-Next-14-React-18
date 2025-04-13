'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper
} from '@mui/material';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here
    alert('Your message has been sent. We will get back to you soon!');
  };

  return (
    <Layout>
      <PageContainer title="CONTACT US">
        <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Send us a message
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused': { backgroundColor: 'transparent' }
                      },
                      '& .MuiInputBase-input': { color: 'text.primary' },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused': { backgroundColor: 'transparent' }
                      },
                      '& .MuiInputBase-input': { color: 'text.primary' },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused': { backgroundColor: 'transparent' }
                      },
                      '& .MuiInputBase-input': { color: 'text.primary' },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Subject"
                    variant="outlined"
                    name="subject"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused': { backgroundColor: 'transparent' }
                      },
                      '& .MuiInputBase-input': { color: 'text.primary' },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={6}
                    name="message"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused': { backgroundColor: 'transparent' }
                      },
                      '& .MuiInputBase-input': { color: 'text.primary' },
                      '& .MuiInputLabel-root': { color: 'text.secondary' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ 
                      mt: 2,
                      py: 1.5,
                      fontWeight: 600
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          
          <Box sx={{ mt: 8, p: { xs: 2, md: 4 } }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Our Information
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Address
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  123 Auto Parts Street<br />
                  Gear City, CA 90210<br />
                  United States
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Contact
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email: support@autoparts.com<br />
                  Phone: (555) 123-4567<br />
                  Fax: (555) 765-4321
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Hours
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Monday-Friday: 9AM - 6PM<br />
                  Saturday: 10AM - 4PM<br />
                  Sunday: Closed
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </PageContainer>
    </Layout>
  );
} 
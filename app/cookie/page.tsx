'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CookieIcon from '@mui/icons-material/Cookie';

export default function CookiePolicyPage() {
  return (
    <Layout>
      <PageContainer 
        title="Cookie Policy"
        subtitle="How we use cookies to enhance your browsing experience"
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            mb: 6,
            maxWidth: '900px',
            mx: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <CookieIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                Last Updated: January 1, 2023
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Understanding how cookies help improve your shopping experience
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            At Auto Parts, we use cookies and similar technologies to provide you with the best possible online experience. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            What Are Cookies?
          </Typography>
          <Typography variant="body1" paragraph>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit certain websites. They are widely used to make websites work more efficiently and provide information to the site owners. Cookies can enhance your browsing experience by:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Remembering your preferences and settings"
                secondary="Such as your login information, language preferences, and shopping cart items"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Improving site performance"
                secondary="By understanding how you navigate and use our website"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Personalizing your experience"
                secondary="By showing content and recommendations relevant to your interests"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Types of Cookies We Use
          </Typography>
          <Typography variant="body1" paragraph>
            We use the following types of cookies on our website:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Essential Cookies"
                secondary="These cookies are necessary for the website to function properly and cannot be switched off. They are usually set in response to actions you take such as logging in, filling in forms, or setting your privacy preferences."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Performance and Analytics Cookies"
                secondary="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Functionality Cookies"
                secondary="These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Targeting/Advertising Cookies"
                secondary="These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites."
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Third-Party Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Some cookies are placed by third parties on our website. These third parties include:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Analytics providers (e.g., Google Analytics)"
                secondary="Help us understand how visitors interact with our website"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Advertising networks"
                secondary="Deliver relevant advertisements and track their effectiveness"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Social media platforms"
                secondary="Enable you to share content and interact with our social media presence"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Your Cookie Choices
          </Typography>
          <Typography variant="body1" paragraph>
            You have several options for controlling or limiting how we and our partners use cookies:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Browser Settings"
                secondary="Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience and functionality on our site."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Cookie Consent Tool"
                secondary="We provide a cookie banner when you first visit our site, allowing you to accept or decline different types of cookies."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Third-Party Opt-Out Tools"
                secondary="Many advertising networks offer you a way to opt out of targeted advertising."
              />
            </ListItem>
          </List>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Updates to This Cookie Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date.
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 4 }}>
            If you have any questions about our use of cookies, please contact us at privacy@autoparts.com.
          </Typography>
        </Paper>
      </PageContainer>
    </Layout>
  );
} 
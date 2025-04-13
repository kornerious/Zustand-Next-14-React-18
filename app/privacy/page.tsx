'use client';

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
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PrivacyPage() {
  return (
    <Layout>
      <PageContainer 
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
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
            <SecurityIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                Last Updated: January 1, 2023
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                We value your privacy and are committed to protecting your personal information.
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            This Privacy Policy describes how Auto Parts collects, uses, and shares your personal information when you visit our website, make a purchase, or otherwise interact with us. By using our services, you agree to the terms of this Privacy Policy.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect several types of information from and about users of our website, including:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Personal Information"
                secondary="Name, email address, postal address, phone number, payment information, and other identifiers you provide when making a purchase or creating an account."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Vehicle Information"
                secondary="Make, model, year, and other details about your vehicle that you provide to help us recommend compatible products."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Usage Data"
                secondary="Information about your interactions with our website, including browsing history, search queries, products viewed, and purchase history."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Technical Data"
                secondary="IP address, browser type, device information, operating system, and other technological identifiers."
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect for various purposes, including:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Processing Transactions"
                secondary="To process and fulfill your orders, manage payments, and provide customer support."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Personalization"
                secondary="To tailor our website and product recommendations to your preferences and vehicle specifications."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Communication"
                secondary="To communicate with you about your orders, provide updates, and respond to inquiries."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Marketing"
                secondary="To send promotional materials, newsletters, and offers about products that may interest you (with your consent where required by law)."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Improvement"
                secondary="To improve our website, services, and product offerings through analysis of usage patterns and user feedback."
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            3. Information Sharing and Disclosure
          </Typography>
          <Typography variant="body1" paragraph>
            We may share your personal information with:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Service Providers"
                secondary="Third parties that help us operate our business, such as payment processors, shipping companies, and IT service providers."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Business Partners"
                secondary="Manufacturers and suppliers that may need to know about your orders to fulfill warranties or provide support."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Legal Authorities"
                secondary="When required by law, court order, or government regulation, or to protect our rights, property, or safety."
              />
            </ListItem>
          </List>

          <Typography variant="body1" paragraph>
            We do not sell your personal information to third parties for their own marketing purposes.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            4. Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies, web beacons, and similar technologies to enhance your experience on our website, analyze usage patterns, and deliver targeted advertisements. You can manage your cookie preferences through your browser settings, but disabling certain cookies may affect functionality.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            5. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            6. Your Rights and Choices
          </Typography>
          <Typography variant="body1" paragraph>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Access and Portability"
                secondary="You can request a copy of the personal information we hold about you."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Correction"
                secondary="You can request to correct inaccurate or incomplete information."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Deletion"
                secondary="You can request deletion of your personal information, subject to certain legal exceptions."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Opt-out"
                secondary="You can opt-out of marketing communications by following the unsubscribe link in our emails."
              />
            </ListItem>
          </List>

          <Typography variant="body1" paragraph>
            To exercise these rights, please contact us using the information provided below.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            7. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            8. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove that information.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            9. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            10. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Auto Parts Privacy Team<br />
            123 Auto Drive<br />
            Motor City, CA 90210<br />
            privacy@autoparts.com<br />
          </Typography>

        </Paper>
      </PageContainer>
    </Layout>
  );
} 
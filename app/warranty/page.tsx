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
import BuildIcon from '@mui/icons-material/Build';

export default function WarrantyPage() {
  return (
    <Layout>
      <PageContainer 
        title="Warranty Information"
        subtitle="Our commitment to quality and customer satisfaction"
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
            <BuildIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                We stand behind the quality of our products
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            At Auto Parts, we're confident in the quality of our products. That's why we offer comprehensive warranty coverage on all items we sell. Our warranty ensures you can shop with confidence, knowing your investment is protected.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Standard Warranty Coverage
          </Typography>
          <Typography variant="body1" paragraph>
            Our standard warranty covers manufacturing defects and premature failure due to defects in materials or workmanship:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Engine Components"
                secondary="12-month or 12,000-mile warranty, whichever comes first"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Electrical Components"
                secondary="6-month warranty against manufacturing defects"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Brake Systems"
                secondary="12-month or 12,000-mile warranty, whichever comes first"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Suspension Components"
                secondary="24-month or 24,000-mile warranty, whichever comes first"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Accessories and Other Parts"
                secondary="90-day warranty against manufacturing defects"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Premium Warranty Coverage
          </Typography>
          <Typography variant="body1" paragraph>
            Selected premium products come with extended warranty coverage:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Premium Engine Components"
                secondary="36-month or 36,000-mile warranty, whichever comes first"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Performance Brake Systems"
                secondary="24-month or 24,000-mile warranty, whichever comes first"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="High-Performance Suspension"
                secondary="Limited lifetime warranty against manufacturing defects"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Warranty Claims Process
          </Typography>
          <Typography variant="body1" paragraph>
            If you need to file a warranty claim, please follow these steps:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="1. Contact Customer Service"
                secondary="Reach out to our customer service team at support@autoparts.com or call (555) 123-4567"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="2. Provide Documentation"
                secondary="Have your order number, product details, and a description of the issue ready"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="3. Inspection and Evaluation"
                secondary="We may request photos or ask you to return the item for inspection"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="4. Resolution"
                secondary="After evaluation, we'll provide a replacement, repair, or refund as appropriate"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            Warranty Exclusions
          </Typography>
          <Typography variant="body1" paragraph>
            Our warranty does not cover:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Improper Installation"
                secondary="Damage resulting from incorrect installation or fitment"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Misuse or Abuse"
                secondary="Damage from misuse, accidents, or racing applications unless specifically designed for such use"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Normal Wear and Tear"
                secondary="Parts that wear out under normal use conditions (brake pads, filters, etc.)"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Modified Products"
                secondary="Products that have been altered or modified from their original condition"
              />
            </ListItem>
          </List>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            This warranty information provides a summary. For full details, please refer to the specific product documentation or contact our customer service team.
          </Typography>

        </Paper>
      </PageContainer>
    </Layout>
  );
} 
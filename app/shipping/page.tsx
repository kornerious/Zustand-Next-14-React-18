'use client';

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestoreIcon from '@mui/icons-material/Restore';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Sample shipping rate data
const shippingRates = [
  { region: 'Continental US', standard: '$5.99', expedited: '$15.99', overnight: '$29.99' },
  { region: 'Alaska & Hawaii', standard: '$12.99', expedited: '$25.99', overnight: '$45.99' },
  { region: 'Canada', standard: '$14.99', expedited: '$29.99', overnight: 'Not Available' },
  { region: 'International', standard: '$24.99', expedited: '$49.99', overnight: 'Not Available' },
];

export default function ShippingPage() {
  return (
    <Layout>
      <PageContainer 
        title="Shipping & Returns"
        subtitle="Information about our shipping policies and return procedures"
      >
        <Grid container spacing={6}>
          {/* Shipping Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                mb: 6,
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocalShippingIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Shipping Information
                </Typography>
              </Box>
              
              <Typography paragraph>
                We are committed to delivering your order promptly and efficiently. All orders are processed 
                within 1-2 business days from the time of purchase. Shipping times vary depending on the 
                chosen shipping method and destination.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Shipping Methods & Estimated Delivery Times
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Standard Shipping (3-5 business days)"
                    secondary="Our most economical shipping option, delivered via USPS or UPS Ground"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Expedited Shipping (2-3 business days)"
                    secondary="Faster delivery via UPS or FedEx Express"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Overnight Shipping (1 business day)"
                    secondary="Fastest option, delivered next business day if ordered before 1pm ET"
                  />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Shipping Rates
              </Typography>
              
              <TableContainer component={Paper} elevation={0} sx={{ mb: 4, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.paper' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Standard</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Expedited</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Overnight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shippingRates.map((rate, index) => (
                      <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}>
                        <TableCell>{rate.region}</TableCell>
                        <TableCell>{rate.standard}</TableCell>
                        <TableCell>{rate.expedited}</TableCell>
                        <TableCell>{rate.overnight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Typography variant="body2" color="text.secondary">
                * Free standard shipping is available on orders over $100 within the Continental US.
                Shipping rates for oversized items may vary. Exact shipping costs will be calculated at checkout.
              </Typography>
              
              <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Tracking Your Order
              </Typography>
              
              <Typography paragraph>
                Once your order has been shipped, you will receive a shipping confirmation email containing 
                your tracking number and a link to track your package. You can also view tracking information 
                in your account dashboard under "Order History".
              </Typography>
              
              <Typography paragraph>
                Please allow up to 24 hours for tracking information to become active after receiving your 
                shipping confirmation email.
              </Typography>
            </Paper>
          </Grid>
          
          {/* Returns Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                mb: 6,
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AssignmentReturnIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Returns & Refunds
                </Typography>
              </Box>
              
              <Typography paragraph>
                We want you to be completely satisfied with your purchase. If for any reason you are not 
                satisfied, we offer a simple and hassle-free return policy.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Return Policy
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <RestoreIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="30-Day Return Window"
                    secondary="Items can be returned within 30 days of receipt for a full refund"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Item Condition"
                    secondary="Products must be in original, unused condition with all original packaging and tags"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Return Shipping"
                    secondary="Customer is responsible for return shipping costs unless the item was defective or incorrect"
                  />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                How to Initiate a Return
              </Typography>
              
              <Typography paragraph>
                1. Log in to your account and navigate to "Order History"<br />
                2. Find the order containing the item(s) you wish to return<br />
                3. Click on "Request Return" and follow the instructions<br />
                4. Print the provided return shipping label<br />
                5. Package the item securely in its original packaging<br />
                6. Attach the return shipping label and drop off at the specified carrier
              </Typography>
              
              <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Refunds
              </Typography>
              
              <Typography paragraph>
                Once we receive and inspect your return, we will process your refund within 5-7 business days. 
                Refunds will be issued to the original payment method. You will receive an email notification 
                once your refund has been processed.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Exchanges
              </Typography>
              
              <Typography paragraph>
                If you need to exchange an item for a different size or product, please initiate a return for 
                the original item and place a new order for the desired item.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </PageContainer>
    </Layout>
  );
} 
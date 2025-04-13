'use client';

import { 
  Box, 
  Typography, 
  Paper,
  Divider
} from '@mui/material';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';

export default function TermsPage() {
  return (
    <Layout>
      <PageContainer title="Terms of Service" subtitle="Please review our terms carefully">
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
          <Typography variant="body2" sx={{ mb: 4, fontStyle: 'italic', color: 'text.secondary' }}>
            Last Updated: January 1, 2023
          </Typography>

          <Typography variant="body1" paragraph>
            Welcome to Auto Parts. By accessing and using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our platform.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our website, mobile applications, or any of our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            2. Account Registration
          </Typography>
          <Typography variant="body1" paragraph>
            To access certain features of our platform, you may need to register for an account. You agree to provide accurate and complete information and to keep this information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            3. Product Information and Pricing
          </Typography>
          <Typography variant="body1" paragraph>
            We strive to provide accurate product information and pricing on our website. However, errors may occasionally occur. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            4. Order Acceptance and Fulfillment
          </Typography>
          <Typography variant="body1" paragraph>
            Your receipt of an order confirmation does not constitute acceptance of your order. We reserve the right to accept or decline your order for any reason. Once an order is placed, we will verify payment and stock availability before processing. We will notify you by email if any items in your order are unavailable or if there are any issues with your payment.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            5. Payment Terms
          </Typography>
          <Typography variant="body1" paragraph>
            All payments must be made in full at the time of purchase. We accept various payment methods as displayed on our website. By providing payment information, you represent and warrant that you have the legal right to use the payment method you provide.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            6. Shipping and Delivery
          </Typography>
          <Typography variant="body1" paragraph>
            Shipping and delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or other factors outside our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            7. Returns and Refunds
          </Typography>
          <Typography variant="body1" paragraph>
            Our return and refund policy is detailed in our separate Shipping & Returns page. By making a purchase, you agree to the terms of that policy.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            8. Product Usage and Installation
          </Typography>
          <Typography variant="body1" paragraph>
            Products sold through our platform must be used in accordance with manufacturer specifications and instructions. Improper installation or use of our products may result in damage, injury, or voiding of warranties. We highly recommend professional installation for all automotive parts.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            9. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content on our website, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of Auto Parts or our suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our explicit written permission.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            10. User Conduct
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to use our platform for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You also agree not to attempt to gain unauthorized access to any part of our platform, other accounts, or computer systems.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            11. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            To the fullest extent permitted by law, Auto Parts shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our platform or products. In no event shall our liability exceed the amount paid by you for the specific product(s) that gave rise to the claim.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            12. Product Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            Products sold through our platform may come with warranties from the manufacturers. We do not offer additional warranties beyond those provided by the manufacturers unless explicitly stated otherwise. All implied warranties are limited to the extent allowed by law.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            13. Indemnification
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to indemnify, defend, and hold harmless Auto Parts, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses arising out of or in any way connected with your use of our platform or products.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            14. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising under these terms shall be resolved exclusively in the state or federal courts located in Los Angeles County, California.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            15. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our platform after any changes indicates your acceptance of the updated terms.
          </Typography>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            16. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms of Service, please contact us at:
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Auto Parts<br />
            123 Auto Drive<br />
            Motor City, CA 90210<br />
            legal@autoparts.com<br />
            (555) 123-4567
          </Typography>

          <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </Typography>
        </Paper>
      </PageContainer>
    </Layout>
  );
} 
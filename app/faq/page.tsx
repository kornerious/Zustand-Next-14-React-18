'use client';
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What types of auto parts do you offer?',
      answer: 'We offer a comprehensive range of auto parts including engine components, brake systems, lighting, suspension parts, and more. Our catalog includes both OEM and high-quality aftermarket options for most vehicle makes and models.'
    },
    {
      question: 'How do I find the right part for my vehicle?',
      answer: 'You can use our vehicle compatibility search feature on our website by entering your vehicle make, model, and year. Alternatively, you can contact our customer service team who can help you find the exact part you need.'
    },
    {
      question: 'Do you offer warranties on your products?',
      answer: 'Yes, all our products come with a manufacturer warranty. The warranty period varies by product type and brand, but we offer a minimum 90-day warranty on all parts. Premium parts often come with extended warranties of up to 2 years.'
    },
    {
      question: 'What is your shipping policy?',
      answer: 'We offer free standard shipping on orders over $50. Standard shipping typically takes 3-5 business days, while expedited shipping options are available at checkout for an additional fee. You can find detailed shipping information on our Shipping page.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this tracking number on our website or the carrier\'s website to monitor your shipment\'s progress.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase for most items in new, unused condition with original packaging. Some special order or custom items may have different return policies. Please visit our Returns page for full details and instructions.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to select international destinations. International shipping rates and delivery times vary by location. You can see available shipping options during checkout.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'Our customer support team is available Monday through Friday from 9am to 6pm EST. You can reach us by phone at (555) 123-4567, by email at support@autopartsshop.com, or through the live chat feature on our website.'
    },
    {
      question: 'Are your parts compatible with all vehicle models?',
      answer: 'While we carry parts for most major vehicle makes and models, compatibility varies by specific part. Always use our vehicle compatibility search or consult with our team to ensure the part will work with your specific vehicle.'
    },
    {
      question: 'Do you offer bulk discounts for large orders?',
      answer: 'Yes, we offer volume discounts for large orders. Please contact our sales team for custom quotes on bulk purchases or for business accounts.'
    }
  ];

  return (
    <Layout>
      <PageContainer 
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our products and services"
      >
        <Box sx={{ mb: 8, maxWidth: '900px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index} 
              elevation={0}
              sx={{
                mb: 2,
                backgroundColor: 'background.paper',
                borderRadius: '8px!important',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  mb: 2,
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                sx={{
                  p: 2,
                  '&.Mui-expanded': {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Typography variant="body1">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Box sx={{ textAlign: 'center', mb: 4, maxWidth: '900px', mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Still have questions?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Our customer support team is ready to help you with any other questions or concerns.
          </Typography>
          <Typography variant="body1">
            Contact us at <Typography component="span" color="primary.main" sx={{ fontWeight: 600 }}>support@autopartsshop.com</Typography> or call <Typography component="span" color="primary.main" sx={{ fontWeight: 600 }}>(555) 123-4567</Typography>
          </Typography>
        </Box>
      </PageContainer>
    </Layout>
  );
} 
"use client";
import { Box, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';
import Button from "@/components/Button";

export default function CheckoutSuccessPage() {
    const router = useRouter();

    return (
        <Layout>
            <PageContainer maxWidth="md">
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 4,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                    }}
                >
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            mb: 4,
                            fontWeight: 600,
                            fontSize: { xs: '2.5rem', md: '3rem' },
                            color: 'text.primary',
                            letterSpacing: '-0.03em'
                        }}
                    >
                        Order Confirmed!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 6,
                            color: 'text.secondary',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}
                    >
                        Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push('/shop')}
                        sx={{ 
                            fontWeight: 600,
                            py: 1.75, 
                            px: 4, 
                            fontSize: '1.2rem', 
                            borderRadius: '9999px', 
                            transition: 'all 0.3s ease', 
                            '&:hover': { 
                                transform: 'scale(1.02)' 
                            } 
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </PageContainer>
        </Layout>
    );
} 
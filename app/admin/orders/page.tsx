"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Box, Typography, Chip, Divider, Container, Grid, Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import { Order } from '@/types/order';
import Layout from '@/components/Layout';
import PageContainer from '@/components/PageContainer';

const OrderCard = ({ order }: { order: Order }) => {
    const router = useRouter();
    const orderId = order.items[0]?.id?.toString() || '';
    
    // Calculate the total from items
    const calculatedTotal = order.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                }
            }}
            onClick={() => router.push(`/admin/orders/${orderId}`)}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: 1
                        }}
                    >
                        Order #{order.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <EmailIcon sx={{ fontSize: 16 }} />
                        {order.email}
                    </Typography>
                </Box>
                <Chip
                    label={order.status}
                    color={
                        order.status === 'completed' ? 'success' :
                        order.status === 'pending' ? 'warning' :
                        'error'
                    }
                    sx={{
                        textTransform: 'capitalize',
                        fontWeight: 500
                    }}
                />
            </Box>
            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Box>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 2
                    }}
                >
                    Order Items:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {order.items.map((item, index) => (
                        <Box 
                            key={index} 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                p: 1,
                                borderRadius: 1,
                                bgcolor: 'rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    width: 50, 
                                    height: 50, 
                                    position: 'relative',
                                    borderRadius: 1,
                                    overflow: 'hidden'
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="50px"
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography 
                                    variant="body2"
                                    sx={{ 
                                        fontWeight: 500,
                                        color: 'rgba(255, 255, 255, 0.9)'
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <span>Total:</span>
                    <span>${calculatedTotal.toFixed(2)}</span>
                </Typography>
            </Box>
        </Paper>
    );
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                    headers: {
                        'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                    }
                });
                const data = await response.json();
                setOrders(data.record.orders || []);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Layout>
                <PageContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                        <Typography>Loading...</Typography>
                    </Box>
                </PageContainer>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageContainer title="Orders" maxWidth="lg">
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={`${order.name}-${order.date}`}>
                            <OrderCard order={order} />
                        </Grid>
                    ))}
                </Grid>
            </PageContainer>
        </Layout>
    );
}
 
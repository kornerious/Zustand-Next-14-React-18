"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Container, Typography, Box, Paper, Stack,
    IconButton, Divider, Chip, CircularProgress, Table, TableBody, TableCell, TableRow
} from "@mui/material";
import { Order } from "@/types/order";
import Image from "next/image";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "@/components/Button";

// Cache for order data
const orderCache = new Map<string, Order>();

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(orderCache.get(params.id) || null);
    const [loading, setLoading] = useState(!order);
    const [error, setError] = useState<string | null>(null);

    // Memoize order fetching
    const fetchOrder = useCallback(async () => {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                }
            });
            if (!response.ok) throw new Error('Failed to fetch order');
            const data = await response.json();
            const order = data.record.orders.find((o: Order) => {
                if (!o || !o.items || !o.items.length) return false;
                return o.items[0].id.toString() === params.id;
            });
            if (!order) throw new Error('Order not found');
            orderCache.set(params.id, order);
            setOrder(order);
        } catch (error) {
            console.error('Error fetching order:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        if (!order) {
            fetchOrder();
        }
    }, [order, fetchOrder]);

    // Memoize order items rendering
    const orderItems = useMemo(() => (
        order?.items.map((item) => (
            <Paper
                key={item.id}
                elevation={0}
                sx={{
                    p: 3,
                    mb: 2,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '100%', md: 200 },
                        height: 200,
                        borderRadius: 1,
                        overflow: 'hidden',
                        flexShrink: 0
                    }}
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        style={{ objectFit: 'cover' }}
                        priority
                        quality={90}
                    />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        {item.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: 'rgba(255, 255, 255, 0.7)'
                        }}
                    >
                        ${item.price.toFixed(2)}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        Quantity: {item.quantity || 1}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        ${((item.quantity || 1) * item.price).toFixed(2)}
                    </Typography>
                </Box>
            </Paper>
        ))
    ), [order?.items]);

    // Memoize order summary
    const orderSummary = useMemo(() => {
        if (!order) return null;
        
        // Calculate the total from items
        const calculatedTotal = order.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }}
            >
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" color="text.secondary">
                            Order ID:
                        </Typography>
                        <Typography variant="body1">
                            {order.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" color="text.secondary">
                            Date:
                        </Typography>
                        <Typography variant="body1">
                            {new Date(order.date).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" color="text.secondary">
                            Status:
                        </Typography>
                        <Chip
                            label={order.status}
                            color={
                                order.status === 'completed' ? 'success' :
                                order.status === 'pending' ? 'warning' :
                                order.status === 'cancelled' ? 'error' : 'default'
                            }
                        />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">
                            Total:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            ${calculatedTotal.toFixed(2)}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        );
    }, [order]);

    // Memoize customer info
    const customerInfo = useMemo(() => {
        if (!order) return null;
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Customer Information
                </Typography>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Name
                        </Typography>
                        <Typography variant="body1">
                            {order.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Email
                        </Typography>
                        <Typography variant="body1">
                            {order.email}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body1">
                            {order.address}
                        </Typography>
                        <Typography variant="body1">
                            {order.city}, {order.postalCode}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        );
    }, [order]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="error">{error}</Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push('/admin')}
                    sx={{ mt: 2 }}
                >
                    Back to Admin
                </Button>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container sx={{ textAlign: 'center', py: 4 }}>
                <Typography>Order not found</Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push('/admin')}
                    sx={{ mt: 2 }}
                >
                    Back to Admin
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton
                    onClick={() => router.push('/admin')}
                    sx={{ mr: 2 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">
                    Order Details
                </Typography>
            </Box>

            {orderSummary}
            {customerInfo}

            <Typography variant="h6" sx={{ mb: 2 }}>
                Order Items
            </Typography>
            <Table>
                <TableBody>
                    {order.items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ width: 80, height: 80, position: 'relative' }}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="80px"
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => router.push('/admin')}
                >
                    Back to Admin
                </Button>
            </Box>
        </Container>
    );
}

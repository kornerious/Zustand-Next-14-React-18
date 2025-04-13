"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Typography, Box, Paper, Stack,
    IconButton, Divider
} from "@mui/material";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@/components/Button";
import PageContainer from '@/components/PageContainer';
import Layout from '@/components/Layout';

export default function CartPage() {
    const router = useRouter();
    const { items, removeFromCart, updateQuantity } = useCartStore();

    // Memoize cart total calculation
    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    }, [items]);

    // Memoize cart items rendering
    const cartItems = useMemo(() => (
        items.map((item) => (
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
                            color: 'text.primary'
                        }}
                    >
                        {item.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: 'text.secondary'
                        }}
                    >
                        ${item.price.toFixed(2)}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mb: 2 }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            disabled={(item.quantity || 1) <= 1}
                            sx={{
                                color: (item.quantity || 1) <= 1 ? 'text.disabled' : 'text.secondary',
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                }
                            }}
                        >
                            -
                        </Button>
                        <Typography>
                            {item.quantity || 1}
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            sx={{
                                color: 'text.secondary',
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                }
                            }}
                        >
                            +
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        ${((item.quantity || 1) * item.price).toFixed(2)}
                    </Typography>
                    <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={{
                            color: 'error.main',
                            '&:hover': {
                                bgcolor: 'error.dark'
                            }
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Paper>
        ))
    ), [items, removeFromCart, updateQuantity]);

    const handleCheckout = useCallback(() => {
        router.push('/checkout');
    }, [router]);

    return (
        <Layout>
            <PageContainer title="Your Cart">
                {items.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Your cart is empty
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => router.push('/shop')}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        {cartItems}
                        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h5">
                                Total:
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                ${total.toFixed(2)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => router.push('/shop')}
                            >
                                Continue Shopping
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </>
                )}
            </PageContainer>
        </Layout>
    );
}
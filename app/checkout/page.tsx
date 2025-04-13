"use client";
import {useCartStore} from "@/store/cartStore";
import {Box, Typography, Button, Container, Stack, Divider, TextField, Grid, Paper} from "@mui/material";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import PageContainer from '@/components/PageContainer';
import Layout from '@/components/Layout';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, total, clearCart } = useCartStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isFormValid = Object.values(formData).every(value => value.trim() !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isFormValid) return;
        
        try {
            // Get the latest data first
            const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                }
            });
            
            if (!getResponse.ok) throw new Error('Failed to fetch data');
            
            const data = await getResponse.json();
            const orders = data.record?.orders || [];
            
            // Create new order
            const newOrder = {
                ...formData,
                items: items.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                total: total,
                date: new Date().toISOString(),
                status: 'Processing'
            };
            
            // Add new order
            const updatedOrders = [...orders, newOrder];
            
            // Update the data
            const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                },
                body: JSON.stringify({
                    ...data.record,
                    orders: updatedOrders
                })
            });
            
            if (!updateResponse.ok) throw new Error('Failed to update data');
            
            // Clear cart and redirect
            clearCart();
            router.push('/checkout/success');
        } catch (error) {
            console.error('Error processing order:', error);
            alert('There was an error processing your order. Please try again.');
        }
    };

    // If cart is empty, redirect to cart page
    useEffect(() => {
        if (items.length === 0) {
            router.push('/cart');
        }
    }, [items, router]);

    return (
        <Layout>
            <PageContainer title="Checkout">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 4,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Shipping Information
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.23)'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'transparent'
                                                }
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'text.primary'
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'text.secondary'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.23)'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'transparent'
                                                }
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'text.primary'
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'text.secondary'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.23)'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'transparent'
                                                }
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'text.primary'
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'text.secondary'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.23)'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'transparent'
                                                }
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'text.primary'
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'text.secondary'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Postal Code"
                                        value={formData.postalCode}
                                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.23)'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'transparent'
                                                }
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'text.primary'
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'text.secondary'
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 4,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Order Summary
                            </Typography>
                            <Stack spacing={2}>
                                {items.map((item) => (
                                    <Box key={item.id}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography sx={{ color: 'text.secondary' }}>
                                                {item.title} x {item.quantity}
                                            </Typography>
                                            <Typography sx={{ color: 'text.primary' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                                    </Box>
                                ))}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary'
                                        }}
                                    >
                                        Total
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary'
                                        }}
                                    >
                                        ${total.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSubmit}
                                    disabled={!isFormValid}
                                    sx={{
                                        mt: 4,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        py: 1.75,
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    Place Order
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </PageContainer>
        </Layout>
    );
}

"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Typography, 
    IconButton, 
    Card, 
    CardContent, 
    Divider, 
    CircularProgress, 
    Box,
    Grid,
    Stack,
    Chip,
    Paper,
    Avatar,
    Link as MuiLink,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { throttle } from "@/src/utils";
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import { styled } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Link from 'next/link';
import Layout from '@/components/Layout';

// JSONBin Config
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || "";
const JSONBIN_ID = process.env.NEXT_PUBLIC_JSONBIN_ID || "";

interface OrderItem {
    id: number;
    title: string;
    quantity: number;
    image: string;
    price: number;
}

interface Order {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    items: OrderItem[];
    total: number;
    date: string;
    status: string;
}

// Styled components
const StyledCard = styled(Paper)(({ theme }) => ({
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
    },
}));

const StyledLink = styled(MuiLink)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
}));

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [totalSales, setTotalSales] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const isMounted = useRef(false);

    // Define the core data fetching logic
    const fetchAdminData = useCallback(async () => {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                headers: { 'X-Master-Key': JSONBIN_API_KEY }
            });
            if (!response.ok) throw new Error("Failed to fetch data from JSONBin");
            const data = await response.json();
            const fetchedOrders = data.record?.orders || [];
            const fetchedProducts = data.record?.products || [];
            
            setOrders(fetchedOrders);
            setProducts(fetchedProducts);
            
            const total = fetchedOrders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0);
            setTotalSales(total);
            setError(null);
        } catch (err) {
            console.error("Error fetching admin data:", err);
            setError("Failed to load data. Please try again.");
            setOrders([]);
            setProducts([]);
            setTotalSales(0);
        } finally {
            if (isMounted.current) {
              setLoading(false);
            }
        }
    }, [JSONBIN_API_KEY, JSONBIN_ID]);

    // useEffect to fetch data on mount and handle throttling
    useEffect(() => {
      isMounted.current = true; 
      setLoading(true);

      // Create a throttled version for this effect instance
      const throttledFetch = throttle(() => {
          if (isMounted.current) { 
              fetchAdminData();
          }
      }, 1500);

      // Initial fetch
      throttledFetch(); 

      // Cleanup function - use the cancel method
      return () => {
          isMounted.current = false;
          throttledFetch.cancel(); // Cancel any pending trailing call
      };
    }, [fetchAdminData]);

    // Delete order handler
    const handleDeleteOrder = async (index: number) => {
        const originalOrders = [...orders];
        const updatedOrders = [...originalOrders];
        updatedOrders.splice(index, 1);
        
        const originalTotal = originalOrders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0);
        const updatedTotal = updatedOrders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0);

        try {
            // Optimistic UI update
            setOrders(updatedOrders);
            setTotalSales(updatedTotal);

            // API call to update the backend
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_API_KEY
                },
                // Send the updated orders and current products
                body: JSON.stringify({ orders: updatedOrders, products })
            });

            if (!response.ok) {
                // Throw error to trigger catch block for UI revert
                throw new Error(`Failed to update data on server: ${response.statusText}`);
            }
            
            // Optional: Re-fetch data after successful delete for absolute consistency
            // fetchAdminData(); 
            
        } catch (err) {
            console.error("Error deleting order:", err);
            setError("Failed to delete order. Please try again.");
            
            // Revert optimistic UI update on error
            setOrders(originalOrders); 
            setTotalSales(originalTotal);
        }
    };

    // Sample admin statistics
    const stats = [
        { 
            label: 'Total Products', 
            value: '248', 
            icon: <InventoryIcon fontSize="medium" />,
            color: '#4caf50'
        },
        { 
            label: 'Total Orders', 
            value: '1,453', 
            icon: <ShoppingBasketIcon fontSize="medium" />,
            color: '#2196f3'
        },
        { 
            label: 'Total Revenue', 
            value: '$89,546', 
            icon: <MonetizationOnIcon fontSize="medium" />,
            color: '#f44336'
        },
        { 
            label: 'Total Customers', 
            value: '634', 
            icon: <PeopleIcon fontSize="medium" />,
            color: '#ff9800'
        },
    ];

    // Quick access menu items
    const quickLinks = [
        {
            title: 'Products',
            description: 'Manage your product catalog',
            icon: <StorefrontIcon fontSize="medium" />,
            link: '/admin/products'
        },
        {
            title: 'Orders',
            description: 'View and manage customer orders',
            icon: <ShoppingBasketIcon fontSize="medium" />,
            link: '/admin/orders'
        },
        {
            title: 'Customers',
            description: 'View customer information',
            icon: <PeopleIcon fontSize="medium" />,
            link: '/admin/customers'
        },
        {
            title: 'Analytics',
            description: 'View sales and performance metrics',
            icon: <AssessmentIcon fontSize="medium" />,
            link: '/admin/analytics'
        },
        {
            title: 'Shipping',
            description: 'Manage shipping methods and rates',
            icon: <LocalShippingIcon fontSize="medium" />,
            link: '/admin/shipping'
        },
        {
            title: 'Payments',
            description: 'View payment transactions',
            icon: <CreditCardIcon fontSize="medium" />,
            link: '/admin/payments'
        },
    ];

    return (
        <Layout>
            <PageContainer 
                title="Admin Dashboard"
                maxWidth="xl"
            >
                <Box 
                    sx={{
                        width: '100%',
                        maxWidth: '1500px', 
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 3, md: 4 }
                    }}
                >
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h3" sx={{ fontWeight: 600 }}>Admin Dashboard</Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconWrapper sx={{ width: 'auto', bgcolor: 'transparent', mr: 1 }}>
                                <AccountCircleIcon fontSize="large" />
                            </IconWrapper>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Admin User</Typography>
                                <MuiLink component={Link} href="/admin/settings" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <SettingsIcon fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2">Settings</Typography>
                                </MuiLink>
                            </Box>
                        </Box>
                    </Box>
                    
                    {/* Statistics Cards */}
                    <Box sx={{ mb: 6 }}>
                        <Grid container spacing={3}>
                            {stats.map((stat, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <StyledCard elevation={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <IconWrapper sx={{ bgcolor: `${stat.color}20`, mr: 2 }}>
                                                {React.cloneElement(stat.icon, { style: { color: stat.color } })}
                                            </IconWrapper>
                                            <Box>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {stat.label}
                                                </Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                    {stat.value}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    
                    {/* Quick Access Cards */}
                    <Box sx={{ mb: 6 }}>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                mb: 3, 
                                fontWeight: 600
                            }}
                        >
                            Quick Access
                        </Typography>
                        <Grid container spacing={3}>
                            {quickLinks.map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Link href={item.link} passHref legacyBehavior>
                                        <StyledLink>
                                            <StyledCard elevation={1}>
                                                <IconWrapper sx={{ bgcolor: 'primary.dark' }}>
                                                    {item.icon}
                                                </IconWrapper>
                                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                                    {item.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                                                    <Button variant="outlined" size="small" 
                                                        sx={{
                                                            color: 'rgba(255, 255, 255, 0.9) !important',
                                                            borderColor: '#444 !important',
                                                            '&:hover': {
                                                                borderColor: '#666 !important',
                                                                bgcolor: 'rgba(50, 50, 50, 0.2) !important'
                                                            }
                                                        }}
                                                    >
                                                        Manage
                                                    </Button>
                                                </Box>
                                            </StyledCard>
                                        </StyledLink>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Recent Orders section */}
                    <Box>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                mb: 3, 
                                fontWeight: 600
                            }}
                        >
                            Recent Orders
                        </Typography>
                        
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Typography variant="body1" color="error">
                                {error}
                            </Typography>
                        ) : orders.length === 0 ? (
                            <Typography variant="body1">
                                No orders found.
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {orders.map((order, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <StyledCard elevation={1}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <IconWrapper sx={{ bgcolor: 'primary.dark', mr: 2 }}>
                                                    <ShoppingBagIcon fontSize="medium" />
                                                </IconWrapper>
                                                <Box>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        {order.name}
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {order.total.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                                                <IconButton onClick={() => handleDeleteOrder(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </StyledCard>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            </PageContainer>
        </Layout>
    );
}

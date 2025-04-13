"use client";
import {Box, Typography, Button, Container, Stack} from "@mui/material";
import {useRouter} from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function OrderConfirmationPage() {
    const router = useRouter();

    return (
        <Box 
            component="main"
            sx={{ 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }}
        >
            <Container 
                maxWidth="xl" 
                sx={{ 
                    flex: 1,
                    py: { xs: 4, md: 6 },
                    px: { xs: 2, sm: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        maxWidth: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3
                    }}
                >
                    <CheckCircleIcon 
                        sx={{ 
                            fontSize: 80,
                            color: 'success.main'
                        }} 
                    />
                    <Typography 
                        variant="h3" 
                        component="h1"
                        sx={{ 
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        Order Confirmed!
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary"
                        sx={{ 
                            mb: 4
                        }}
                    >
                        Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
                    </Typography>
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        spacing={2}
                        sx={{ width: '100%' }}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => router.push("/shop")}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                flex: { xs: 1, sm: 'none' }
                            }}
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => router.push("/")}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                flex: { xs: 1, sm: 'none' }
                            }}
                        >
                            Back to Home
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
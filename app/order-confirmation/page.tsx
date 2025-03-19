"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function OrderConfirmationPage() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => router.push("/shop"), 5000); // Redirect after 5 sec
    }, [router]);

    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>Order Confirmed!</Typography>
            <Typography>Your order has been placed successfully. You will be redirected to the shop shortly.</Typography>
            <Button variant="contained" color="primary" onClick={() => router.push("/shop")} sx={{ mt: 3 }}>
                Return to Shop
            </Button>
        </Box>
    );
}
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    CircularProgress,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const JSONBIN_API_KEY = "$2a$10$8F5qQQoWq49Gn.v4zEbZFuSv8bfY2XOXHGqRPI8Efnb5tZEZnf53G";
const JSONBIN_ID = "67daee698960c979a574d0ba";

interface Order {
    id: string;
    email: string;
    items: { id: number; title: string; quantity: number }[];
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                    headers: { "X-Master-Key": JSONBIN_API_KEY },
                });

                if (!response.ok) throw new Error("Order not found");
                const data = await response.json();
                const foundOrder = (data.record.orders || []).find((o) => o.id === params.id);

                if (!foundOrder) throw new Error("Order not found");
                setOrder(foundOrder);
            } catch (err) {
                setError("Order not found or deleted.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params.id]);

    if (loading) return <Container sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Container>;

    if (error) return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5" color="error">{error}</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/admin")}>
                <ArrowBackIcon sx={{ mr: 1 }} /> Back to Admin Panel
            </Button>
        </Container>
    );

    return (
        <Container>
            <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        <ShoppingCartIcon sx={{ mr: 1 }} /> Order #{order?.id} Details
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EmailIcon /> {order?.email}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Ordered Items:</Typography>
                    <List>
                        {order?.items?.map((item) => (
                            <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ textAlign: "right", mt: 3 }}>
                        <Button variant="contained" onClick={() => router.push("/admin")}>
                            <ArrowBackIcon sx={{ mr: 1 }} /> Back to Admin Panel
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

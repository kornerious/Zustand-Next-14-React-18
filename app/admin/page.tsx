"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Container, Typography, List, ListItem, ListItemText,
    IconButton, Card, CardContent, Divider, CircularProgress, Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import { throttle } from "@/src/utils";

// JSONBin Config
const JSONBIN_API_KEY = "$2a$10$8F5qQQoWq49Gn.v4zEbZFuSv8bfY2XOXHGqRPI8Efnb5tZEZnf53G";
const JSONBIN_ID = "67daee698960c979a574d0ba";

interface OrderItem {
    id: number;
    title: string;
    quantity: number;
    image: string;
}

interface Order {
    id: string;
    email: string;
    items: OrderItem[];
}

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // ✅ Fetch orders initially
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                headers: { "X-Master-Key": JSONBIN_API_KEY },
            });

            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setOrders(data.record.orders || []);
        } catch (error) {
            setError("Failed to fetch orders. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // ✅ Delete order with confirmation (throttled)
    const handleDeleteOrder = useCallback(
        throttle(async (orderId: string) => {
            const confirmed = window.confirm("Are you sure you want to delete this order?");
            if (!confirmed) return;

            setLoading(true);
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                    headers: { "X-Master-Key": JSONBIN_API_KEY },
                });

                if (!response.ok) throw new Error("Failed to fetch latest data");

                const data = await response.json();
                const updatedOrders = data.record.orders.filter((order: Order) => order.id !== orderId);

                await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": JSONBIN_API_KEY,
                    },
                    body: JSON.stringify({ products: data.record.products, orders: updatedOrders }),
                });

                setOrders(updatedOrders);
            } catch (error) {
                setError("Failed to delete order. Please try again.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 1000),
        []
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 2 }}>
                📦 Admin Dashboard - Orders
            </Typography>

            {error && (
                <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
                    {error}
                </Typography>
            )}

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && orders.length === 0 && (
                <Typography sx={{ textAlign: "center", mt: 5 }}>No orders yet.</Typography>
            )}

            {!loading &&
                orders.map((order) => (
                    <Card key={order.id} sx={{ mb: 2, p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        color="error"
                                        onClick={() => handleDeleteOrder(order.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={`Order #${order.id}`}
                                    secondary={
                                        <Typography
                                            color="textSecondary"
                                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                        >
                                            <EmailIcon fontSize="small" /> {order.email}
                                        </Typography>
                                    }
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                                />
                            </ListItem>

                            <Divider sx={{ my: 1 }} />

                            <List dense>
                                {order.items.map((item) => (
                                    <ListItem key={item.id}>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={`Quantity: ${item.quantity}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                ))}
        </Container>
    );
}

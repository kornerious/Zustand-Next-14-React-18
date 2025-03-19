"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";

// ✅ JSONBin API Config
const JSONBIN_API_KEY = "$2a$10$8F5qQQoWq49Gn.v4zEbZFuSv8bfY2XOXHGqRPI8Efnb5tZEZnf53G";
const JSONBIN_ID = "67daee698960c979a574d0ba";

interface Order {
    id: string;
    email: string;
    items: { id: number; title: string; quantity: number }[];
}

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();

    // ✅ Fetch Orders from JSONBin
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                    headers: { "X-Master-Key": JSONBIN_API_KEY },
                });

                if (!response.ok) throw new Error("Failed to fetch orders");
                const data = await response.json();
                const validOrders = (data.record.orders || []).filter(order => order.items && Array.isArray(order.items));
                setOrders(validOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // ✅ Handle Order Deletion
    const handleDeleteOrder = async (orderId: string) => {
        try {
            const updatedOrders = orders.filter((order) => order.id !== orderId);

            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": JSONBIN_API_KEY,
                },
                body: JSON.stringify({ orders: updatedOrders }),
            });

            if (!response.ok) throw new Error("Failed to delete order");
            setOrders(updatedOrders);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 2 }}>
                📦 Admin Dashboard - Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography sx={{ textAlign: "center", mt: 5 }}>No orders yet.</Typography>
            ) : (
                orders.map((order) => (
                    <Card key={order.id} sx={{ mb: 2, p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <ListItem
                                key={order.id}
                                sx={{ cursor: "pointer" }}
                                onClick={() => router.push(`/admin/orders/${order.id}`)}
                            >
                                <ListItemText primary={`Order #${order.id} - ${order.email}`} />
                            </ListItem>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                <EmailIcon /> {order.email}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <List>
                                {order.items?.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        sx={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <ListItemText
                                            primary={item.title}
                                            secondary={`Quantity: ${item.quantity}`}
                                        />
                                        <IconButton color="error" onClick={() => handleDeleteOrder(order.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
}

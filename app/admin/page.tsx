"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";

interface Order {
    id: number;
    email: string;
    items: { id: number; name: string; quantity: number }[];
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/orders")
            .then((res) => res.json())
            .then((data) => (Array.isArray(data) ? setOrders(data) : setOrders([])));
    }, []);

    const router = useRouter();

    const handleDeleteOrder = async (id: number) => {
        await fetch(`http://localhost:4000/orders/${id}`, { method: "DELETE" });
        setOrders(orders.filter((order) => order.id !== id));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
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
                                    {order.items.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            sx={{ display: "flex", justifyContent: "space-between" }}
                                        >
                                            <ListItemText
                                                primary={item.name}
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
        </ThemeProvider>
    );
}

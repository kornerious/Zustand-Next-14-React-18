"use client";
import { useThemeStore } from "../store/themeStore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
    const { toggleTheme, theme, loadTheme } = useThemeStore();

    useEffect(() => {
        loadTheme(); // ✅ Load the saved theme on component mount
    }, []);

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: theme.palette.background.paper, // ✅ Use MUI theme background color
                color: theme.palette.text.primary, // ✅ Use MUI theme text color
            }}
        >
            <Toolbar>
                <Button component={Link} href="/" sx={{ color: theme.palette.text.primary }}>
                    Home
                </Button>
                <Button component={Link} href="/shop" sx={{ color: theme.palette.text.primary }}>
                    Shop
                </Button>
                <Button component={Link} href="/cart" sx={{ color: theme.palette.text.primary }}>
                    Cart
                </Button>
                <Button component={Link} href="/admin" sx={{ color: theme.palette.text.primary }}>
                    Admin
                </Button>
                <Switch
                    checked={theme.palette.mode === "dark"}
                    onChange={toggleTheme}
                    color="default"
                    sx={{ ml: "auto" }}
                />
            </Toolbar>
        </AppBar>
    );
}
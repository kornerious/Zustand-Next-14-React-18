"use client";
import { useThemeMode, useThemeActions } from "@/store/themeStore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

// ✅ JSONBin.io API Config
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || "";
const JSONBIN_ID = process.env.NEXT_PUBLIC_JSONBIN_ID || "";

// ✅ Define Product Type
interface Product {
    category: string;
}

export default function Navbar() {
    const mode = useThemeMode();
    const { toggleMode } = useThemeActions();
    const theme = useTheme();
    const [categories, setCategories] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        fetchCategories().catch(console.error);  // ✅ Properly handle Promise
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                headers: { "X-Master-Key": JSONBIN_API_KEY },
            });

            if (!response.ok) throw new Error("Failed to fetch categories");

            const data = await response.json();
            const products: Product[] = data.record.products || [];

            // ✅ Extract categories and ensure it's of type `string[]`
            const uniqueCategories = Array.from(new Set(products.map((product: Product) => product.category))) as string[];
            setCategories(uniqueCategories);  // ✅ Properly typecast to string[]
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Toolbar>
                {/* Shop Categories Dropdown */}
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ color: theme.palette.text.primary }}
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {categories.map((category) => (
                        <MenuItem
                            key={category}
                            onClick={handleMenuClose}
                            component={Link}
                            href={`/shop/${category}`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </MenuItem>
                    ))}
                </Menu>

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
                    checked={mode === "dark"}
                    onChange={toggleMode}
                    color="default"
                    sx={{ ml: "auto" }}
                />
            </Toolbar>
        </AppBar>
    );
}

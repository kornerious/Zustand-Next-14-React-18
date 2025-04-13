"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const { theme, loadTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            loadTheme();
            setMounted(true);
        } catch (error) {
            console.error('Error loading theme:', error);
            setMounted(true); // Still render the app even if theme loading fails
        }
    }, [loadTheme]);

    // Prevent flash of incorrect theme
    if (!mounted) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    overflow: 'hidden'
                }}
            >
                <Navbar />
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
} 
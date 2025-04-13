"use client";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Simply mark as mounted after the first render
        setMounted(true);
    }, []);

    // Prevent flash of incorrect theme
    if (!mounted) {
        return null;
    }

    return (
        <>
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
        </>
    );
} 
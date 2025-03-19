"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { theme, loadTheme } = useThemeStore();

    useEffect(() => {
        loadTheme();
    }, []);

    return (
        <html lang="en">
        <body>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
import { create } from "zustand";
import { createTheme, Theme } from "@mui/material/styles";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    loadTheme: () => void; // Method to load the saved theme from localStorage
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: createTheme({ palette: { mode: "light" } }), // Default to light mode
    loadTheme: () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            set({ theme: createTheme({ palette: { mode: parsedTheme.mode } }) });
        }
    },
    toggleTheme: () => set((state) => {
        const newMode = state.theme.palette.mode === "light" ? "dark" : "light";
        localStorage.setItem("theme", JSON.stringify({ mode: newMode })); // Save theme to localStorage
        return { theme: createTheme({ palette: { mode: newMode } }) };
    }),
}));
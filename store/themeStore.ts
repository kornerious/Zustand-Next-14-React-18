import { create } from "zustand";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    loadTheme: () => void;
}

const createCustomTheme = (mode: 'light' | 'dark'): Theme => {
    const themeOptions: ThemeOptions = {
        palette: {
            mode,
            ...(mode === 'dark' ? {
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
            } : {
                background: {
                    default: '#ffffff',
                    paper: '#f5f5f5',
                },
            }),
        },
    };
    return createTheme(themeOptions);
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: createCustomTheme('dark'), // Default to dark mode

    loadTheme: () => {
        if (typeof window !== "undefined") {
            try {
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme) {
                    const parsedTheme = JSON.parse(savedTheme);
                    if (parsedTheme.mode === 'light' || parsedTheme.mode === 'dark') {
                        set({ theme: createCustomTheme(parsedTheme.mode) });
                    } else {
                        throw new Error('Invalid theme mode');
                    }
                } else {
                    localStorage.setItem("theme", JSON.stringify({ mode: "dark" }));
                }
            } catch (error) {
                console.error('Error loading theme:', error);
                localStorage.setItem("theme", JSON.stringify({ mode: "dark" }));
            }
        }
    },

    toggleTheme: () => set((state) => {
        const newMode = state.theme.palette.mode === "light" ? "dark" : "light";

        if (typeof window !== "undefined") {
            localStorage.setItem("theme", JSON.stringify({ mode: newMode }));
        }

        return { theme: createCustomTheme(newMode) };
    }),
}));

import { create } from "zustand";
import { createTheme, Theme } from "@mui/material/styles";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    loadTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: createTheme({ palette: { mode: "light" } }), // ✅ Default to light mode

    loadTheme: () => {
        if (typeof window !== "undefined") { // ✅ Ensure client-side execution
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                const parsedTheme = JSON.parse(savedTheme);
                set({ theme: createTheme({ palette: { mode: parsedTheme.mode } }) });
            }
        }
    },

    toggleTheme: () => set((state) => {
        const newMode = state.theme.palette.mode === "light" ? "dark" : "light";

        if (typeof window !== "undefined") { // ✅ Prevent errors on server
            localStorage.setItem("theme", JSON.stringify({ mode: newMode }));
        }

        return { theme: createTheme({ palette: { mode: newMode } }) };
    }),
}));

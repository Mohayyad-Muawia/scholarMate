import { create } from "zustand";

interface ThemeState {
    theme: string;
    toggleTheme: () => void;
}

const useThemeStore= create<ThemeState> ((set) => ({
    theme: localStorage.getItem("theme") || "light",
    toggleTheme: () => {
        set((state) => {
            const newTheme = state.theme === "light"? "dark" : "light"
            localStorage.setItem("theme", newTheme)
            return {theme: newTheme}
        })
    }
}))

export default useThemeStore
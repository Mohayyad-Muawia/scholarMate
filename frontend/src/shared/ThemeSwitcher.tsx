import { Moon, Sun } from "lucide-react";
import { hoverEffect } from "../motion/motionVariants";
import { motion } from "framer-motion";
import useThemeStore from "../store/themeStore";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <motion.button
      className="secondary icon"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={hoverEffect}
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </motion.button>
  );
}

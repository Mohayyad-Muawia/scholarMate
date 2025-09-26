import { Moon, Plus, Search, Sun } from "lucide-react";
import "../styles/header.css";
import useThemeStore from "../store/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import {hoverEffect} from "../motion/motionVariants"

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <header>
      <div className="title">
        <h2>لوحة التحكم</h2>
      </div>
      <div className="search">
        <input type="text" placeholder="ابحث عن شيء ما..." />
        <a className="search-icon">
          <Search />
        </a>
      </div>
      <div className="btns">
        <motion.button
          className="secondary icon"
          onClick={toggleTheme}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={hoverEffect}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </motion.button>
        <motion.button
          className="primary"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={hoverEffect}
        >
          <Plus />
          <span> اضافة منحة</span>
        </motion.button>
      </div>
    </header>
  );
}

import { Moon, Plus, Search, Sun } from "lucide-react";
import "../styles/header.css";
import useThemeStore from "../store/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";
import { useState } from "react";
import Modal from "./Modal";
import AddForm from "./AddForm";

export default function Header({ title }: { title: string }) {
  const { theme, toggleTheme } = useThemeStore();
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <header>
        <div className="title">
          <h2>{title}</h2>
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
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </motion.button>
          <motion.button
            className="primary"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            onClick={() => setShowForm(true)}
          >
            <Plus />
            <span> اضافة منحة</span>
          </motion.button>
        </div>
      </header>

      {/* add scholarship form */}
      <Modal isOpen={showForm} onClose={() => []}>
        <AddForm close={() => setShowForm(false)} />
      </Modal>
    </>
  );
}

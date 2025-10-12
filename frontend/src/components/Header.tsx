import { Moon, Plus, SearchIcon, Sun, X } from "lucide-react";
import "../styles/header.css";
import useThemeStore from "../store/themeStore";
import { motion } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";
import { useState } from "react";
import Modal from "./Modal";
import AddForm from "./AddForm";
import Search from "./Search";
import MobileSearch from "./MobileSearch";

export default function Header({ title }: { title: string }) {
  const { theme, toggleTheme } = useThemeStore();
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <header>
        <div className="title">
          <h2>{title}</h2>
        </div>

        <Search myClass="hide-in-mobile" />

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
            className="secondary icon hide-in-desktop"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <X /> : <SearchIcon />}
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
            <span className="hide-in-mobile"> اضافة منحة</span>
          </motion.button>
        </div>
      </header>

      {/* add scholarship form */}
      <Modal isOpen={showForm} onClose={() => []}>
        <AddForm close={() => setShowForm(false)} />
      </Modal>

      {/* Mobile Search */}
      {showSearch && <MobileSearch />}
    </>
  );
}

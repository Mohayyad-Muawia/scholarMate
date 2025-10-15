import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  Home,
  Rocket,
  Sparkles,
  Wand2,
  MessageSquareQuoteIcon,
} from "lucide-react";
import AnimateOnScroll from "../../motion/AnimateOnScroll";
import useUserStore from "../../store/userStore";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "الرئيسية", href: "#", Icon: Home },
  { name: "البداية", href: "#start", Icon: Rocket },
  { name: "المميزات", href: "#features", Icon: Sparkles },
  { name: "كيف يعمل", href: "#how-it-works", Icon: Wand2 },
  { name: "الأسئلة الشائعة", href: "#faq", Icon: MessageSquareQuoteIcon },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();

  return (
    <>
      <AnimateOnScroll className="nav glass fade-in-bottom" x={"-50%"}>
        <a href="#" aria-label="Go to homepage" className="logo">
          <img
            src="/images/logo-trans.png"
            alt="ScholarMate Icon"
            className="logo-icon"
          />
          <img
            src="/images/logo-word.png"
            alt="ScholarMate"
            className="logo-word"
          />
        </a>

        <div className="links hide-in-mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>

        <div className="btns hide-in-mobile">
          {user ? (
            <Link to="/dashboard" className="primary start-btn">
              <span>لوحة االتحكم</span>
            </Link>
          ) : (
            <Link to="/login" className="primary start-btn">
              <span>تسجيل الدخول</span>
            </Link>
          )}{" "}
        </div>

        <button
          className="menu-btn hide-in-desktop"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </AnimateOnScroll>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="mobile-menu glass"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <a href="#" aria-label="Go to homepage" className="logo">
                <img
                  src="/images/logo-trans.png"
                  alt="ScholarMate Icon"
                  className="logo-icon"
                />
                <img
                  src="/images/logo-word.png"
                  alt="ScholarMate"
                  className="logo-word"
                />
              </a>

              <div className="links">
                {navLinks.map(({ name, href, Icon }) => (
                  <a key={href} href={href} onClick={() => setIsOpen(false)}>
                    <Icon size={22} />
                    <span>{name}</span>
                  </a>
                ))}
              </div>

              <div className="mobile-btns">
                <a href="/login" className="primary start-btn">
                  <span>تسجيل الدخول</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

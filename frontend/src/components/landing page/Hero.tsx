import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { hoverEffect } from "../../motion/motionVariants";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../../motion/AnimateOnScroll";

export default function Hero() {
  return (
    <div className="hero">
      <AnimateOnScroll delay={0.3}>
        <div className="text">
          <h1>لا تدع الفرص الدراسية تضيع منك بعد اليوم</h1>
          <p>ابحث، سجّل، وتابع منحك بسهولة مع رفيقٍ يجمعها لك في مكانٍ واحد.</p>
          <div className="btns">
            <motion.a
              href="#start"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
              className="secondary"
            >
              اعرف المزيد{" "}
            </motion.a>
            <Link to="/register">
              <motion.button
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={hoverEffect}
                className="primary"
              >
                <Sparkles />
                ابدأ الآن
              </motion.button>
            </Link>
          </div>
        </div>
      </AnimateOnScroll>{" "}
      <AnimateOnScroll delay={0.6}>
        <div className="images glass">
          <img
            src="/images/dashboard.png"
            alt="dashboard"
            className="dash glass"
          />
          <img
            src="/images/hero.svg"
            alt="illustration"
            className="illu1 hide-in-mobile"
          />
        </div>
      </AnimateOnScroll>{" "}
    </div>
  );
}

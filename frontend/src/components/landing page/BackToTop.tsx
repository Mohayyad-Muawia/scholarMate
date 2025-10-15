// src/components/landing page/BackToTopButton.tsx

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // دالة للتحقق من موضع التمرير
  const toggleVisibility = () => {
    // إذا كان التمرير أكبر من 300 بكسل، أظهر الزر
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // دالة للتمرير إلى الأعلى بسلاسة
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // هذا هو سر الحركة السلسة!
    });
  };

  useEffect(() => {
    // أضف مستمع حدث التمرير عند تحميل المكون
    window.addEventListener("scroll", toggleVisibility);

    // قم بإزالة المستمع عند تفكيك المكون (مهم جداً للأداء)
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="back-to-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          aria-label="Go back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

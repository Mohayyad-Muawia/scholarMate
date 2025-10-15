// src/components/AnimateOnScroll.tsx

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// تعريف أنواع الخصائص (Props) للمكون
interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number; // تأخير اختياري
  className?: string; // كلاسات CSS إضافية
  x?: number | string;
}

// تعريف أشكال الحركة المختلفة التي سنستخدمها

export default function AnimateOnScroll({
  children,
  delay = 0,
  className = "",
  x = 0,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // once: true لتشغيل الحركة مرة واحدة فقط
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 50, x },
      visible: { opacity: 1, y: 0, x },
    },
    fadeInBottom: {
      hidden: { opacity: 0, y: -50, x },
      visible: { opacity: 1, y: 0, x },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    // يمكنك إضافة أي حركات أخرى هنا
  };

  // تحديد نوع الحركة بناءً على الكلاس الممرر
  const getVariantType = () => {
    if (className.includes("fade-in-up")) return "fadeInUp";
    if (className.includes("fade-in-bottom")) return "fadeInBottom";
    if (className.includes("fade-in-left")) return "fadeInLeft";
    if (className.includes("fade-in-right")) return "fadeInRight";
    return "fadeInUp"; // الحركة الافتراضية
  };

  const variantType = getVariantType();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variantType]}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

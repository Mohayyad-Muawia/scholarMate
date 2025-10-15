import React from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { hoverEffect } from "../../motion/motionVariants";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../../motion/AnimateOnScroll";

const CallToAction: React.FC = () => {
  return (
    <div id="cta">
      <AnimateOnScroll delay={0.2}>
        <div className="content card">
          <h2 className="cta-title">
            هل أنت مستعد للسيطرة على مستقبلك الأكاديمي؟
          </h2>
          <p className="cta-subtitle">
            انضم الآن إلى المستخدمين الذين بدأوا بالفعل في تنظيم رحلتهم نحو
            المنحة القادمة. حسابك المجاني في انتظارك.
          </p>
          <div className="action">
            <Link to="/register">
              <motion.button
                initial="rest"
                whileTap="tap"
                variants={hoverEffect}
                className="secondary"
              >
                <span>أنشئ حسابك مجاناً الآن</span>
                <ArrowLeft size={24} />
              </motion.button>
            </Link>{" "}
            <p>مجاني دائماً • لا يتطلب بطاقة ائتمان</p>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
};

export default CallToAction;

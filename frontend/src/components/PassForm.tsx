import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";

interface props {
  close: () => void;
}
export default function PassForm({ close }: props) {
  const [newPassword, setNewPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatched, setIsMatched] = useState(false);

  const { user, resetPassword, isLoading } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!newPassword || !currPassword) {
      toast.error("يجب ملء جميع الحقول المطلوبة");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (!isMatched) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    if (!user?._id) {
      toast.error("لم يتم العثور على معرف المستخدم (ID)");
      return;
    }
    const success = await resetPassword(user?._id, {
      currPassword,
      newPassword,
    });

    if (success) {
      close();
    }
  };

  // check password match
  useEffect(() => {
    setIsMatched(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  return (
    <div className="pass-form">
      <h3>تغيير كلمة المرور</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currPassword">كلمة المرور الحالية</label>
          <input
            type="password"
            id="currPassword"
            placeholder="ادخل كلمة مرور الحالية"
            required
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">كلمة المرور</label>
          <input
            type="password"
            id="newPassword"
            placeholder="انشئ كلمة مرور جديدة"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"> تأكيد كلمة المرور</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="اعد ادخال كلمة المرور"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <div className="btns">
          <motion.button
            type="button"
            className="secondary"
            onClick={close}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
          >
            اغلاق
          </motion.button>
          <motion.button
            type="submit"
            className="primary"
            disabled={isLoading}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
          >
            {isLoading ? "جارٍ حفظ البيانات" : "حفظ البيانات"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

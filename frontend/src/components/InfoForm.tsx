import React, { useState } from "react";
import SelectCountry from "./SelectCountry";
import useUserStore from "../store/userStore";
import { hoverEffect } from "../motion/motionVariants";
import { motion } from "framer-motion";

interface props {
  close: () => void;
}
export default function InfoForm({ close }: props) {
  const { user, updateUser, isLoading } = useUserStore();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      return;
    }
    const success = await updateUser(user?._id, { name, email, country });

    if (success) {
      close();
    }
  };

  return (
    <div className="info-form">
      <h3>تعديل الملف الشخصي</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">الاسم الكامل</label>
          <input
            type="text"
            id="name"
            placeholder="ادخل اسمك الكامل"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            placeholder="ادخل بريدك الإلكتروني"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="optional">
          <label htmlFor="country">الجنسية</label>
          <SelectCountry setCountry={setCountry} value={country} />
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

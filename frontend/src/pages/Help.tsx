import { useState } from "react";
import "../styles/help.css";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import { hoverEffect } from "../motion/motionVariants";
import { motion } from "framer-motion";
export default function Help() {
  const { user, sendReport, isLoading } = useUserStore();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("يجب ملئ جميع الحقول المطلوبة");
      return;
    }
    const success = await sendReport({ name, email, message });
    if (success) {
      setMessage("");
    }
  };

  return (
    <div className="help page">
      <div className="contact-form" onSubmit={handleSubmit}>
        <h2>التبليغ عن مشكلة</h2>
        <form className="card">
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
          <div>
            <label htmlFor="message">وصف المشكلة</label>
            <textarea
              id="message"
              placeholder="قم بكتابة وصف المشكلة بوضوح"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <motion.button
            className="primary"
            disabled={isLoading}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
          >
            {isLoading ? "جارٍ التبليغ" : "التبليغ عن المشكلة"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

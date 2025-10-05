import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import type { ApiResponse, User } from "../types";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";

interface RegisterResponse extends ApiResponse {
  data?: {
    user: User;
    token: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: RegisterResponse = (
        await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        })
      ).data;

      if (response.success) {
        const user = response.data?.user;
        const token = response.data?.token;
        if (user && token) {
          login(user, token);
        }
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "فشل تسجيل الدخول");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container" style={{ flexDirection: "row-reverse" }}>
        <div className="right">
          <div className="title">
            <h1>تسجيل الدخول</h1>
            <h3>قم بملء التفاصيل أدناه لتسجيل الدخول</h3>
          </div>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="password">كلمة المرور</label>
              <input
                type="password"
                id="password"
                placeholder="ادخل كلمة المرور"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <motion.button
              className="primary"
              type="submit"
              disabled={isLoading}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </motion.button>
          </form>
          <p>
            ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link>
          </p>
        </div>
        <div className="left"></div>
      </div>
    </div>
  );
}

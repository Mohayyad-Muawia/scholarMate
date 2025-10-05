import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse, User } from "../types";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import SelectCountry from "../components/SelectCountry";
import { motion } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";

interface RegisterResponse extends ApiResponse {
  data?: {
    user: User;
    token: string;
  };
}

export default function Register() {
  const navigate = useNavigate();

  const { login } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!name || !email || !password) {
      toast.error("يجب ملء جميع الحقول المطلوبة");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setIsLoading(false);
      return;
    }
    if (!isMatched) {
      toast.error("كلمات المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    // Handle registration logic here
    try {
      const response: RegisterResponse = (
        await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          password,
          country,
        })
      ).data;

      if (response.success) {
        // Handle successful registration
        const user = response.data?.user;
        const token = response.data?.token;
        if (user && token) {
          login(user, token);
        }
        navigate("/");
      }
      if (!response.success) {
        // Handle registration error
        toast.error(response.message);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
        toast.error(err.response?.data?.message || "حدث خطأ أثناء التسجيل");
      } else {
        console.error(err);
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // check password match
  useEffect(() => {
    setIsMatched(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <div className="register">
      <div className="container">
        <div className="right">
          <div className="title">
            <h1>إنشاء حساب جديد</h1>
            <h3>قم بملء التفاصيل أدناه لإنشاء حساب جديد</h3>
          </div>
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
            <div className="half">
              <label htmlFor="password">كلمة المرور</label>
              <input
                type="password"
                id="password"
                placeholder="انشئ كلمة مرور"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="half">
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
            <motion.button
              className="primary"
              type="submit"
              disabled={isLoading}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
            >
              {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
            </motion.button>
          </form>
          <p>
            لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
          </p>
        </div>
        <div className="left"></div>
      </div>
    </div>
  );
}

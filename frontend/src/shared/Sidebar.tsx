import { Link, NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import {
  CircleQuestionMark,
  GraduationCap,
  Headset,
  LayoutGrid,
  LogOut,
  User,
} from "lucide-react";
import useUserStore from "../store/userStore";
export default function Sidebar() {
  const { logout } = useUserStore();
  const links = [
    {
      to: "/dashboard",
      label: "لوحة التحكم",
      icon: <LayoutGrid />,
      active: true,
    },
    {
      to: "/scholarships",
      label: "قائمة المنح",
      icon: <GraduationCap />,
      active: false,
    },
    { to: "/profile", label: "الملف الشخصي", icon: <User />, active: false },
    {
      to: "/about",
      label: "عن المنصة",
      icon: <CircleQuestionMark />,
      active: false,
    },
    { to: "/help", label: "مساعدة", icon: <Headset />, active: false },
  ];

  return (
    <div className="sidebar hide-in-mobile">
      <Link to="/" className="top">
        <img src="/images/logo-word.png" alt="Logo" height={55} />
      </Link>
      <div className="links">
        {links.map((link) => (
          <NavLink
            to={link.to}
            key={link.label}
            className={({ isActive }) => (isActive ? "active link" : "link")}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="bottom">
        <a className="link" onClick={logout}>
          <LogOut />
          <span>تسجيل الخروج</span>
        </a>
      </div>
    </div>
  );
}

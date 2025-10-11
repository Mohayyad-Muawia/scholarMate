import {
  CircleQuestionMark,
  GraduationCap,
  Headset,
  LayoutGrid,
  User,
} from "lucide-react";
import "../styles/mobileNav.css";
import { NavLink } from "react-router-dom";
const links = [
  { to: "/", icon: <LayoutGrid />, active: true },
  {
    to: "/scholarships",
    icon: <GraduationCap />,
    active: false,
  },
  { to: "/profile", icon: <User />, active: false },
  {
    to: "/about",
    icon: <CircleQuestionMark />,
    active: false,
  },
  { to: "/help", icon: <Headset />, active: false },
];

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      {links.map((link, i) => (
        <NavLink
          to={link.to}
          key={i}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          {link.icon}
        </NavLink>
      ))}
    </div>
  );
}

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Help from "./pages/Help";
import ProtectedRoute from "./components/ProtectedRoute";
import useThemeStore from "./store/themeStore";
import { useEffect } from "react";
import NotFound from "./components/NotFound";
import MobileNav from "./components/MobileNav";

function AppContent() {
  const location = useLocation();
  const hideSidebarRoutes = [
    "/profile",
    "/",
    "/scholarships",
    "/about",
    "/help",
  ];
  const showSidebar = hideSidebarRoutes.includes(location.pathname);

  // handle theme change
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            color: "var(--text)",
            background: "var(--secondary)",
          },
        }}
      />
      {showSidebar && <Sidebar />}
      {showSidebar && <MobileNav />}
      <Routes>
        <Route path="/" element={<ProtectedRoute children={<Dashboard />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/scholarships"
          element={<ProtectedRoute children={<Scholarships />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path="/about"
          element={<ProtectedRoute children={<About />} />}
        />
        <Route path="/help" element={<ProtectedRoute children={<Help />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

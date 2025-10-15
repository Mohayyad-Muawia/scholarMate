import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}


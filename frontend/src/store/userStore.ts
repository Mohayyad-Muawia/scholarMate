import { create } from "zustand";
import type { User } from "../types";
import * as api from "../api/user";
import toast from "react-hot-toast";

interface UserState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;

  isLoading: boolean;
  error: string | null;

  fetchUser: (id: string) => Promise<void>;
  updateUser: (id: string, user: User) => Promise<boolean>;
  deleteAccount: (id: string) => Promise<boolean>;
  resetPassword: (
    id: string,
    { currPassword, newPassword }: { currPassword: string; newPassword: string }
  ) => Promise<boolean>;
  sendReport: (report: {
    name: string;
    email: string;
    message: string;
  }) => Promise<boolean>;
}

const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  login: (user, token) => {
    set({ user, token });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  fetchUser: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.fetchUser(id);

      if (res.success) {
        toast.success("تم تحميل بيانات المستخدم بنجاح");
        localStorage.setItem("user", JSON.stringify(res.data));

        set({
          user: res.data,
          isLoading: false,
        });
      } else {
        set({ error: res.message, isLoading: false });
        toast.error(res.message);
      }
    } catch (error) {
      const errorMsg = "فشل في جلب المستخدم";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
    }
  },
  updateUser: async (id, usr) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.updateUser(id, usr);

      if (res.success) {
        toast.success("تم تحديث بيانات المستخدم بنجاح");
        localStorage.setItem("user", JSON.stringify(res.data));

        set({
          user: res.data,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: res.message, isLoading: false });
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في تحديث بيانات المستخدم";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },
  deleteAccount: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.deleteUser(id);
      if (res.success) {
        toast.success("تم حذف المستخدم بنجاح");
        localStorage.removeItem("user");

        set({
          user: res.data,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: res.message, isLoading: false });
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في حذف المستخدم";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },
  resetPassword: async (id, passwords) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.resetPassword(id, passwords);

      if (res.success) {
        toast.success("تم تغيير كلمة مرور المستخدم بنجاح");

        set({
          user: res.data,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: res.message, isLoading: false });
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في تغيير كلمة المرور";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },
  sendReport: async (report) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.sendReport(report);

      if (res.success) {
        toast.success("تم التبليغ عن المشكلة بنجاح");

        set({
          user: res.data,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: res.message, isLoading: false });
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في التبليغ عن المشكلة المرور";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },
}));

export default useUserStore;

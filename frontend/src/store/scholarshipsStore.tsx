// stores/scholarshipsStore.ts
import { create } from "zustand";
import type { Scholarship } from "../types";
import * as api from "../api/scholarships";
import toast from "react-hot-toast";

type ScholarshipsState = {
  scholarships: Scholarship[];
  upcomingScholarships: Scholarship[];
  currentScholarship?: Scholarship | null;

  page: number;
  limit: number;
  total: number;
  totalPages: number;

  isLoading: boolean;
  error: string | null;

  fetchScholarships: (page?: number, limit?: number) => Promise<void>;
  fetchUpcoming: (limit?: number) => Promise<void>;

  setCurrentScholarship: (sch?: Scholarship | null) => void;

  addScholarship: (sch: Omit<Scholarship, "_id">) => Promise<boolean>;
  updateScholarship: (id: string, sch: Scholarship) => Promise<boolean>;
  deleteScholarship: (id: string) => Promise<boolean>;

  clearError: () => void;
};

export const useScholarshipsStore = create<ScholarshipsState>((set, get) => ({
  scholarships: [],
  upcomingScholarships: [],
  currentScholarship: null,

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,

  isLoading: false,
  error: null,

  fetchScholarships: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.fetchScholarships(page, limit);

      if (res.success) {
        set({
          scholarships: res.data,
          page: res.pagination.page,
          limit: res.pagination.limit,
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
          isLoading: false,
        });
        toast.success(`تم تحميل ${res.data.length} منحة`);
      } else {
        set({ error: res.error, isLoading: false });
        toast.error(res.error);
      }
    } catch (error) {
      const errorMsg = "فشل في تحميل المنح";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
    }
  },

  fetchUpcoming: async (limit = 4) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.fetchNearest(limit);

      if (res.success) {
        set({ upcomingScholarships: res.data, isLoading: false });
      } else {
        set({ error: res.error, isLoading: false });
        toast.error(res.error);
      }
    } catch (error) {
      const errorMsg = "فشل في تحميل المنح القادمة";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
    }
  },

  setCurrentScholarship: (sch) => set({ currentScholarship: sch }),

  addScholarship: async (sch) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.addScholarship(sch as Scholarship);

      if (res.success) {
        toast.success("تم إضافة المنحة بنجاح! 🎉");

        // إعادة تحميل البيانات
        await get().fetchScholarships(get().page, get().limit);
        await get().fetchUpcoming();

        set({ isLoading: false });
        return true;
      } else {
        set({ error: res.error, isLoading: false });
        toast.error(res.error);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في إضافة المنحة";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },

  updateScholarship: async (id, sch) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.updateScholarship(id, sch);

      if (res.success) {
        toast.success("تم تحديث المنحة بنجاح");

        set((s) => ({
          scholarships: s.scholarships.map((x) =>
            x._id === id ? res.data : x
          ),
          currentScholarship:
            s.currentScholarship && s.currentScholarship._id === id
              ? res.data
              : s.currentScholarship,
          isLoading: false,
        }));

        await get().fetchUpcoming();
        return true;
      } else {
        set({ error: res.error, isLoading: false });
        toast.error(res.error);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في تحديث المنحة";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },

  deleteScholarship: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.deleteScholarship(id);

      if (res.success) {
        toast.success("تم حذف المنحة بنجاح");

        set((s) => ({
          scholarships: s.scholarships.filter((x) => x._id !== id),
          currentScholarship:
            s.currentScholarship && s.currentScholarship._id === id
              ? null
              : s.currentScholarship,
          isLoading: false,
        }));

        await get().fetchUpcoming();
        return true;
      } else {
        set({ error: res.error, isLoading: false });
        toast.error(res.error);
        return false;
      }
    } catch (error) {
      const errorMsg = "فشل في حذف المنحة";
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));

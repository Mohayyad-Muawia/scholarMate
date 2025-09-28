import axios from "axios";
import type { Scholarship } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleApiError = (error: any) => {
  if (error.response) {
    return {
      success: false,
      error:
        error.response.data?.message ||
        `خطأ في السيرفر: ${error.response.status}`,
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      success: false,
      error: "لا يمكن الاتصال بالسيرفر. يرجى التحقق من اتصال الإنترنت.",
      status: 0,
    };
  } else {
    return {
      success: false,
      error: error.message || "حدث خطأ غير متوقع",
      status: -1,
    };
  }
};

export async function fetchScholarships(page = 1, limit = 10) {
  try {
    const res = await api.get(`/scholarships?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchNearest(limit = 5) {
  try {
    const res = await api.get(`/scholarships/nearest?limit=${limit}`);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function addScholarship(sch: Scholarship) {
  try {
    const res = await api.post("/scholarships/add", sch);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateScholarship(id: string, sch: Scholarship) {
  try {
    const res = await api.patch(`/scholarships/${id}`, sch);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteScholarship(id: string) {
  try {
    const res = await api.delete(`/scholarships/${id}`);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

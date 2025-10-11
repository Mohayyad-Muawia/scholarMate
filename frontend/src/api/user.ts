import axios from "axios";

const API_URL =
  (import.meta.env.VITE_API_URL || "https://scholarmate-7vjy.onrender.com") +
  "/user";
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

export async function updateUser(
  id: string,
  user: { name: string; email: string; country: string }
) {
  try {
    const res = await api.patch(`/${id}`, user);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchUser(id: string) {
  try {
    const res = await api.get(`/${id}`);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await api.delete(`/${id}`);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function resetPassword(
  id: string,
  passwords: { currPassword: string; newPassword: string }
) {
  try {
    const res = await api.patch(`/pass/${id}`, passwords);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}
export async function sendReport(report: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const res = await api.post("/report", report);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

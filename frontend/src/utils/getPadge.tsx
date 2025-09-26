import {
  Hourglass,
  TextSearch,
  ThumbsDown,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Scholarship } from "../types";

const getPadge = (status: Scholarship["status"]) => {
  switch (status) {
    case "تم رفض الطلب":
      return {
        color: "var(--error)",
        background: "var(--error-bg)",
        icon: <ThumbsDown size={16} />,
      };
    case "تم قبول الطلب":
      return {
        color: "var(--success)",
        background: "var(--success-bg)",
        icon: <ThumbsUp size={16} />,
      };
    case "في انتظار النتيجة":
      return {
        color: "var(--warning)",
        background: "var(--warning-bg)",
        icon: <TextSearch size={16} />,
      };
    case "لم يتم التقديم":
      return {
        color: "var(--primary)",
        background: "var(--primary-50)",
        icon: <Hourglass size={16} />,
      };
    default:
      return { color: "var(--text)", background: "var(--gray)" };
  }
};

export default getPadge;

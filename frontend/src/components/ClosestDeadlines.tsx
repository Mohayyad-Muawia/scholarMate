// components/ClosestDeadlines.tsx
import type { Scholarship } from "../types";
import "../styles/closestDeadlines.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Hourglass, TextSearch, ThumbsDown, ThumbsUp } from "lucide-react";
import formatDate from "../utils/formatDate";
import calculateDaysLeft from "../utils/calcDaysLeft";
import { useScholarshipsStore } from "../store/scholarshipsStore";

interface ClosestDeadlinesProps {
  setSelectedScholar: (scholar: Scholarship | null) => void;
}

export default function ClosestDeadlines({
  setSelectedScholar,
}: ClosestDeadlinesProps) {
  const { upcomingScholarships, fetchUpcoming } = useScholarshipsStore();

  useEffect(() => {
    fetchUpcoming(4);
  }, [fetchUpcoming]);

  const getPadge = (status: Scholarship["status"]) => {
    switch (status) {
      case "تم رفض الطلب":
        return {
          color: "var(--error)",
          background: "var(--error-bg)",
          icon: <ThumbsDown />,
        };
      case "تم قبول الطلب":
        return {
          color: "var(--success)",
          background: "var(--success-bg)",
          icon: <ThumbsUp />,
        };
      case "في انتظار النتيجة":
        return {
          color: "var(--warning)",
          background: "var(--warning-bg)",
          icon: <TextSearch />,
        };
      case "لم يتم التقديم":
        return {
          color: "var(--primary)",
          background: "var(--primary-50)",
          icon: <Hourglass />,
        };
      default:
        return { color: "var(--text)", background: "var(--gray)" };
    }
  };

  return (
    <div className="closest-deadlines card">
      <h3>اقرب التواريخ النهائية</h3>
      {upcomingScholarships.length === 0 ? (
        <p>لا توجد منح حالياً</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>اسم المنحة</th>
              <th>الموعد النهائي</th>
              <th>الأيام المتبقية</th>
              <th>حالة المنحة</th>
            </tr>
          </thead>
          <tbody>
            {upcomingScholarships.map((sclr) => {
              const daysLeft = calculateDaysLeft(sclr.deadline);
              const padge = getPadge(sclr.status);

              return (
                <motion.tr
                  key={sclr._id || sclr.title}
                  onClick={() => setSelectedScholar(sclr)}
                  whileHover={{ x: -7 }}
                  style={{ cursor: "pointer" }}
                >
                  <td>{sclr.title}</td>
                  <td>{formatDate(sclr.deadline)}</td>
                  <td>{daysLeft}</td>
                  <td>
                    <div
                      className="padge"
                      style={{
                        color: padge.color,
                        background: padge.background,
                      }}
                    >
                      {padge.icon}
                      <span>{sclr.status}</span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

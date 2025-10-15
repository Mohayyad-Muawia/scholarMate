import { Hourglass, TextSearch, ThumbsDown, ThumbsUp } from "lucide-react";
import { useScholarshipsStore } from "../../store/scholarshipsStore";
import { useEffect } from "react";

export default function Statistics() {
  const { statistics, fetchStatistics } = useScholarshipsStore();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const statsData = statistics;
  const totalScholarships = statsData?.total[0]?.count || 0;

  const getStatusCount = (status: string) => {
    const statusItem = statsData?.byStatus.find((item) => item._id === status);
    return statusItem?.count || 0;
  };

  const infoArray = [
    {
      icon: <Hourglass />,
      number: getStatusCount("لم يتم التقديم"),
      label: "لم يتم التقديم",
      color: "var(--primary)",
      background: "var(--primary-50)",
    },
    {
      icon: <TextSearch />,
      number: getStatusCount("في انتظار النتيجة"),
      label: "في انتظار النتيجة",
      color: "var(--warning)",
      background: "var(--warning-bg)",
    },
    {
      icon: <ThumbsDown />,
      number: getStatusCount("تم رفض الطلب"),
      label: "تم رفض الطلب",
      color: "var(--error)",
      background: "var(--error-bg)",
    },
    {
      icon: <ThumbsUp />,
      number: getStatusCount("تم قبول الطلب"),
      label: "تم قبول الطلب",
      color: "var(--success)",
      background: "var(--success-bg)",
    },
  ];
  return (
    <>
      {infoArray.map((stat, i) => (
        <div className={`stat${i + 1} card`} key={i}>
          <div
            className="icon"
            style={{ backgroundColor: stat.background, color: stat.color }}
          >
            {stat.icon}
          </div>
          <div className="text">
            <p>{stat.label}</p>
            <h2 style={{ color: stat.color }}>
              {" "}
              {stat.number} <span>/ {totalScholarships}</span>
            </h2>
          </div>
        </div>
      ))}
    </>
  );
}

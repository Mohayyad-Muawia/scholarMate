import { Hourglass, TextSearch, ThumbsDown, ThumbsUp } from "lucide-react";

export default function Statistics() {
  const infoArray = [
    {
      icon: <Hourglass />,
      number: 12,
      lable: "المنح المعلقة",
      color: "var(--primary)",
      background: "var(--primary-50)",
    },
    {
      icon: <TextSearch />,
      number: 3,
      lable: "منح في انتظار النتيجة",
      color: "var(--warning)",
      background: "var(--warning-bg)",
    },
    {
      icon: <ThumbsDown />,
      number: 7,
      lable: "منح مرفوضة",
      color: "var(--error)",
      background: "var(--error-bg)",
    },
    {
      icon: <ThumbsUp />,
      number: 0,
      lable: "منح مقبولة",
      color: "var(--success)",
      background: "var(--success-bg)",
    },
  ];
  let sum = 0;
  infoArray.map((st) => (sum += st.number));

  return (
    <>
      {infoArray.map((stat, i) => (
        <div className={`stat${i + 1} card`} key={i}>
          <div className="icon" style={{ backgroundColor: stat.background, color: stat.color }}>
            {stat.icon}
          </div>
          <div className="text">
            <p>{stat.lable}</p>
            <h2 style={{color: stat.color}}> {stat.number} <span>/ {sum}</span></h2>
          </div>
        </div>
      ))}
    </>
  );
}

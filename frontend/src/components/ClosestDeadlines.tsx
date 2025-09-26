import type { Scholarship } from "../types";
import "../styles/closestDeadlines.css";
import type { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hourglass, TextSearch, ThumbsDown, ThumbsUp } from "lucide-react";
import formatDate from "../utils/formatDate";
import calculateDaysLeft from "../utils/calcDaysLeft";

const mockScholarships: Scholarship[] = [
  {
    id: "1",
    title: "منحة جامعة الخرطوم",
    description: "منحة كاملة للبكالوريوس في علوم الحاسوب",
    country: "SD",
    degreeLevel: "بكالوريوس",
    fundingType: "كامل",
    deadline: new Date("2025-10-15"),
    resultsDate: new Date("2025-11-10"),
    status: "لم يتم التقديم",
    link: "https://www.uofkhartoum.edu/scholarship1",
  },
  {
    id: "2",
    title: "منحة ماجستير التقنية الحديثة",
    description: "منحة جزئية للماجستير في التقنية الحديثة",
    degreeLevel: "ماجستير",
    fundingType: "جزئي",
    deadline: new Date("2025-09-30"),
    resultsDate: new Date("2025-10-20"),
    status: "في انتظار النتيجة",
    link: "https://www.techmasters.edu/scholarship2",
  },
  {
    id: "3",
    title: "برنامج دكتوراه البحوث العلمية",
    description: "منحة كاملة لدراسة الدكتوراه في البحوث العلمية",
    degreeLevel: "دكتوراه",
    fundingType: "كامل",
    deadline: new Date("2025-12-01"),
    resultsDate: new Date("2026-01-15"),
    status: "تم قبول الطلب",
    link: "https://www.researchphd.edu/scholarship3",
  },
  {
    id: "68d634a3b798a5ab53f9f9d5",
    title: "منحة دبلوم الإدارة",
    description: "منحة جزئية لدراسة دبلوم الإدارة",
    degreeLevel: "دبلوم",
    fundingType: "جزئي",
    deadline: new Date("2025-11-10"),
    resultsDate: new Date("2025-12-05"),
    status: "لم يتم التقديم",
    link: "https://www.management.edu/scholarship4",
  },
  {
    id: "5",
    title: "منحة بكالوريوس العلوم الطبية",
    description: "منحة كاملة لدراسة بكالوريوس العلوم الطبية",
    degreeLevel: "بكالوريوس",
    fundingType: "كامل",
    deadline: new Date("2025-10-25"),
    resultsDate: new Date("2025-11-20"),
    status: "تم رفض الطلب",
    link: "https://www.medicaluni.edu/scholarship5",
  },
  {
    id: "6",
    title: "منحة ماجستير الهندسة الكهربائية",
    description: "منحة جزئية للماجستير في الهندسة الكهربائية",
    degreeLevel: "ماجستير",
    fundingType: "جزئي",
    deadline: new Date("2025-09-28"),
    resultsDate: new Date("2025-10-18"),
    status: "تم قبول الطلب",
    link: "https://www.electroeng.edu/scholarship6",
  },
  {
    id: "7",
    title: "برنامج دكتوراه الذكاء الاصطناعي",
    description: "منحة كاملة لدراسة الدكتوراه في الذكاء الاصطناعي",
    degreeLevel: "دكتوراه",
    fundingType: "كامل",
    deadline: new Date("2025-12-20"),
    resultsDate: new Date("2026-01-30"),
    status: "تم رفض الطلب",
    link: "https://www.ai-phd.edu/scholarship7",
  },
  {
    id: "8",
    title: "منحة دبلوم اللغة الإنجليزية",
    description: "منحة جزئية لدراسة دبلوم اللغة الإنجليزية",
    degreeLevel: "دبلوم",
    fundingType: "جزئي",
    deadline: new Date("2025-11-05"),
    resultsDate: new Date("2025-11-25"),
    status: "لم يتم التقديم",
    link: "https://www.englishdiploma.edu/scholarship8",
  },
  {
    id: "9",
    title: "منحة بكالوريوس التصميم الجرافيكي",
    description: "منحة كاملة لدراسة التصميم الجرافيكي",
    degreeLevel: "بكالوريوس",
    fundingType: "كامل",
    deadline: new Date("2025-10-18"),
    resultsDate: new Date("2025-11-15"),
    status: "في انتظار النتيجة",
    link: "https://www.graphicdesign.edu/scholarship9",
  },
  {
    id: "10",
    title: "منحة ماجستير علوم البيانات",
    description: "منحة كاملة للماجستير في علوم البيانات",
    degreeLevel: "ماجستير",
    fundingType: "كامل",
    deadline: new Date("2025-09-25"),
    resultsDate: new Date("2025-10-15"),
    status: "تم قبول الطلب",
    link: "https://www.datascience.edu/scholarship10",
  },
];

interface ClosestDeadlinesProps {
  setSelectedScholar: Dispatch<SetStateAction<Scholarship | null>>;
}

export default function ClosestDeadlines({
  setSelectedScholar,
}: ClosestDeadlinesProps) {
  const sortedScholarships = [...mockScholarships.slice(0, 4)].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  const getPadge = (status: Scholarship["status"]) => {
    switch (status) {
      case "تم رفض الطلب":
        return {
          color: "var(--error)",
          background: "var(--error-bg)",
          icon: <ThumbsDown />,
        };
        break;
      case "تم قبول الطلب":
        return {
          color: "var(--success)",
          background: "var(--success-bg)",
          icon: <ThumbsUp />,
        };
        break;
      case "في انتظار النتيجة":
        return {
          color: "var(--warning)",
          background: "var(--warning-bg)",
          icon: <TextSearch />,
        };
        break;
      case "لم يتم التقديم":
        return {
          color: "var(--primary)",
          background: "var(--primary-50)",
          icon: <Hourglass />,
        };
        break;
      default:
        return { color: "var(--text)", background: "var(--gray)" };
    }
  };

  return (
    <div className="closest-deadlines card">
      <h3>اقرب التواريخ النهائية</h3>
      {sortedScholarships.length === 0 ? (
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
            {sortedScholarships.map((sclr) => {
              const daysLeft = calculateDaysLeft(sclr.deadline);

              const padge = getPadge(sclr.status);

              return (
                <motion.tr
                  key={sclr.id || sclr.title}
                  onClick={() => setSelectedScholar(sclr)}
                  whileHover={{ x: -7 }}
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

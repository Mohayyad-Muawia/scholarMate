import { useState, useEffect } from "react";
import { useScholarshipsStore } from "../../store/scholarshipsStore";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Clock,
  CalendarX,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/statisticsSlider.css";
import { getCorrectForm } from "../../utils/getCorrectForm";

export default function StatisticsSlider() {
  const { statistics } = useScholarshipsStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 0: next, 1: prev

  const appliedScholarships =
    statistics?.byStatus?.reduce((total, status) => {
      if (status._id !== "لم يتم التقديم") {
        return total + status.count;
      }
      return total;
    }, 0) || 0;

  const totalScholarships = statistics?.total?.[0]?.count || 0;
  const upcomingScholarships = statistics?.upcoming?.[0]?.count || 0;

  const lostScholarships = Math.max(
    0,
    totalScholarships - (upcomingScholarships + appliedScholarships)
  );

  // Data
  const statsData = [
    {
      id: 1,
      title: "إجمالي المنح الدراسية",
      value: statistics?.total?.[0]?.count || 0,
      icon: <GraduationCap size={20} />,
      color: "var(--primary)",
      background: "var(--primary-50)",
      description:
        "مجموع كل المنح المسجلة حاليا في النظام، بغض النظر عن حالتها او نوعها او مستواها الدراسي.",
      type: "scholarship",
    },
    {
      id: 2,
      title: "المنح المتاحة للتقديم",
      value: statistics?.upcoming?.[0]?.count || 0,
      icon: <Clock size={20} />,
      color: "var(--warning)",
      background: "var(--warning-bg)",
      description:
        "عدد المنح التي يمكنك التقديم عليها الآن، اي ان تقديمها لم ينتهي ولم تقم بالتقديم عليها بعد.",
      type: "scholarship",
    },
    {
      id: 3,
      title: "المنح الضائعة",
      value: lostScholarships,
      icon: <CalendarX size={20} />,
      color: "var(--error)",
      background: "var(--error-bg)",
      description:
        "عدد المنح التي لم تقم بالتقديم عليها حتى انتهت فترة التقديم الخاصة بها.",
      type: "scholarship",
    },
    {
      id: 4,
      title: "المنح المقدَّم عليها",
      value: appliedScholarships,
      icon: <CheckCircle size={20} />,
      color: "var(--success)",
      background: "var(--success-bg)",
      description:
        "عدد المنح التي قمت بالتقديم عليها بالفعل، بغض النظر عن نتيجتها.",
      type: "scholarship",
    },
  ];

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(0);
      setCurrentSlide((prev) => (prev + 1) % statsData.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [statsData.length, currentSlide]);

  const nextSlide = () => {
    setDirection(0);
    setCurrentSlide((prev) => (prev + 1) % statsData.length);
  };

  const prevSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev - 1 + statsData.length) % statsData.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 0 : 1);
    setCurrentSlide(index);
  };

  const currentStat = statsData[currentSlide];

  const getDisplayText = () => {
    const value = currentStat.value;

    const scholarshipText = getCorrectForm(value, "منحة", "منحتين", "منح");
    if (value === 1 || value === 2) return scholarshipText;
    return `${value} ${scholarshipText}`;
  };

  const getAnimationProps = () => {
    if (direction === 0) {
      return {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
      };
    } else {
      return {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
      };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <div className="c2 card statistics-slider">
      <div className="header">
        <h3>الإحصائيات</h3>
        <div className="controls">
          <button onClick={prevSlide} className="btn">
            <ChevronRight size={16} />
          </button>
          <span className="indicator">
            {currentSlide + 1} / {statsData.length}
          </span>
          <button onClick={nextSlide} className="btn">
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>

      <div className="content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={animationProps.initial}
            animate={animationProps.animate}
            exit={animationProps.exit}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="stat"
            style={
              {
                "--color": currentStat.color,
                "--bg": currentStat.background,
              } as React.CSSProperties
            }
          >
            <div className="info">
              <div className="icon">{currentStat.icon}</div>
              <div className="text">
                <h4 className="title">{currentStat.title}</h4>
                <div className="value">{getDisplayText()}</div>
              </div>
            </div>
            <p className="description">{currentStat.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="dots">
        {statsData.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Header from "../components/Header";
import useUserStore from "../store/userStore";
import "../styles/profile.css";
import getCountry from "../utils/getCountry";
import ProgressBar from "../components/ProgressBar";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import {
  AtSign,
  Award,
  CalendarDays,
  CheckCircle,
  Globe,
  GraduationCap,
  KeyRound,
  LogOut,
  MapPin,
  RotateCw,
  Target,
  TextSearch,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  TrendingUp,
  User,
  UserPen,
  UserRoundPen,
} from "lucide-react";
import formatDate from "../utils/formatDate";
import Modal from "../components/Modal";
import InfoForm from "../components/InfoForm";
import PassForm from "../components/PassForm";
import toast from "react-hot-toast";
import ActionModal from "../components/ActionModal";
import { hoverEffect } from "../motion/motionVariants";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, logout, fetchUser, deleteAccount, isLoading } = useUserStore();
  const country = getCountry(user?.country);

  const { statistics, fetchStatistics } = useScholarshipsStore();
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  let progress;

  const appliedScholarships =
    statistics?.byStatus?.reduce((total, status) => {
      if (status._id !== "لم يتم التقديم") {
        return total + status.count;
      }
      return total;
    }, 0) || 0;
  const total = statistics?.total[0].count || 0;
  if (!total || total === 0) {
    progress = 0;
  } else {
    progress = Math.round((appliedScholarships / total) * 100);
  }

  const countriesCount = statistics?.byCountry.length || 0;
  // Numbers
  const numbers = [
    {
      icon: <CheckCircle />,
      label: "منح مقدم عليها",
      value: appliedScholarships,
    },
    {
      icon: <GraduationCap />,
      label: "اجمالي المنح",
      value: total,
    },
    {
      icon: <Globe />,
      label: "عدد دول المنح",
      value: countriesCount,
    },
  ];

  // Info
  const personalInfo = [
    {
      icon: <User />,
      label: "الاسم الكامل",
      value: user?.name,
    },
    {
      icon: <AtSign />,
      label: "البريد الالكتروني ",
      value: user?.email,
    },
    {
      icon: <MapPin />,
      label: "الجنسية",
      value: `${country.emoji}\u00A0\u00A0\u00A0${country.name_ar}`,
    },
    {
      icon: <CalendarDays />,
      label: "تاريخ الانضمام",
      value: formatDate(user?.createdAt),
    },
    {
      icon: <UserRoundPen />,
      label: "تاريخ آخر تعديل",
      value: formatDate(user?.updatedAt),
    },
  ];

  const scholarInfo = [
    {
      icon: <Target />,
      label: "الدولة الاكثر تكرارا",
      value: statistics?.byCountry?.[0]?._id
        ? `${getCountry(statistics.byCountry[0]._id).emoji}\u00A0\u00A0\u00A0${
            getCountry(statistics.byCountry[0]._id).name_ar
          }`
        : "🏳️\u00A0لا توجد",
      count: statistics?.byCountry?.[0]?.count || 0,
    },
    {
      icon: <Award />,
      label: "الدرجة الاكثر تكرارا",
      value: statistics?.byDegree?.length
        ? statistics.byDegree.reduce((prev, curr) =>
            curr.count > prev.count ? curr : prev
          )._id
        : "لا توجد",
    },
    {
      icon: <TrendingUp />,
      label: "نسبة القبول",
      value: `${(
        ((statistics?.byStatus?.find((s) => s._id === "تم قبول الطلب")?.count ||
          0) /
          (appliedScholarships || 1)) *
        100
      ).toFixed(1)}%`,
    },
    {
      icon: <ThumbsUp />,
      label: "تم قبول الطلب",
      value:
        statistics?.byStatus?.find((s) => s._id === "تم قبول الطلب")?.count ||
        0,
    },
    {
      icon: <ThumbsDown />,
      label: "تم رفض الطلب",
      value:
        statistics?.byStatus?.find((s) => s._id === "تم رفض الطلب")?.count || 0,
    },
    {
      icon: <TextSearch />,
      label: "في انتظار النتائج",
      value:
        statistics?.byStatus?.find((s) => s._id === "في انتظار النتيجة")
          ?.count || 0,
    },
  ];

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const refetch = async () => {
    if (user?._id) await fetchUser(user?._id);
  };

  const handleConfirmDelete = async () => {
    if (!user?._id) return;

    setShowDeleteModal(false);

    try {
      const success = await deleteAccount(user._id);

      if (success) {
        logout();
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("❌ فشل في حذف الحساب");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  return (
    <div className="profile page">
      <Header title="الملف الشخصي" />
      <div className="container">
        <div className="top card">
          <div className="avatar">
            <img src="/images/logo.png" alt="" />
          </div>
          <div className="info">
            <h1>{user?.name}</h1>
            <ProgressBar
              progress={progress}
              value={appliedScholarships}
              total={total}
            />
            <div className="numbers">
              {numbers.map((num, i) => (
                <div className="item" key={i}>
                  <div className="icon">{num.icon}</div>
                  <div className="text">
                    <h2>{num.value}</h2>
                    <p>{num.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="personal-info card">
            <h2>بيانات شخصية</h2>
            <div className="details">
              {personalInfo.map((item, i) => (
                <div className="item" key={i}>
                  <p>
                    {item.icon} {item.label}
                  </p>
                  <h3>{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="scholars-info card">
            <h2>بيانات المنح</h2>
            <div className="details">
              {scholarInfo.map((item, i) => (
                <div className="item" key={i}>
                  <p>
                    {item.icon} {item.label}
                  </p>
                  <h3>{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="options card">
            <h2>خيارات</h2>
            <div className="btns">
              <motion.button
                className="primary"
                onClick={() => setShowInfoForm(true)}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={hoverEffect}
              >
                <UserPen />
                <span> تعديل الملف الشخصي</span>
              </motion.button>
              <motion.button
                className="secondary"
                onClick={refetch}
                disabled={isLoading}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={hoverEffect}
              >
                <RotateCw />
                <span>
                  {isLoading ? "يتم التحميل" : "اعادة تحميل البيانات"}
                </span>
              </motion.button>
              <motion.button
                className="secondary"
                onClick={() => setShowPassForm(true)}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={hoverEffect}
              >
                <KeyRound />
                <span> تغيير كلمة المرور</span>
              </motion.button>
              <motion.button
                className="secondary"
                onClick={logout}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={hoverEffect}
              >
                <LogOut />
                <span> تسجيل الخروج</span>
              </motion.button>
              <motion.button
                className="primary delete"
                onClick={() => setShowDeleteModal(true)}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={hoverEffect}
              >
                <Trash2 />
                <span> حذف الحساب </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showInfoForm} onClose={() => {}}>
        <InfoForm close={() => setShowInfoForm(false)} />
      </Modal>
      <Modal isOpen={showPassForm} onClose={() => {}}>
        <PassForm close={() => setShowPassForm(false)} />
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
        <ActionModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title="حذف الحساب"
          message="هل أنت متأكد من أنك تريد حذف حسابك وكل بياناته؟"
        />
      </Modal>
    </div>
  );
}

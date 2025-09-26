import {
  CalendarClock,
  CalendarDays,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  Globe,
  GraduationCap,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Scholarship } from "../types";
import "../styles/scholarshipInfo.css";
import { motion } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";
import formatDate from "../utils/formatDate";
import getCountry from "../utils/getCountry";
import { useMemo, useState } from "react";
import calculateDaysLeft from "../utils/calcDaysLeft";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import toast from "react-hot-toast";

interface ScholarshipInfoProps {
  scholarship: Scholarship | null;
  onEdit: () => void;
  onClose?: () => void;
}

export default function ScholarshipInfo({
  scholarship,
  onEdit,
  onClose,
}: ScholarshipInfoProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteScholarship, isLoading } = useScholarshipsStore();

  const country = useMemo(
    () => getCountry(scholarship?.country),
    [scholarship?.country]
  );

  const handleDelete = async () => {
    if (!scholarship?._id) return;

    // تأكيد الحذف
    const isConfirmed = window.confirm(
      "⚠️ هل أنت متأكد من حذف هذه المنحة؟\nهذا الإجراء لا يمكن التراجع عنه."
    );

    if (!isConfirmed) return;

    setIsDeleting(true);

    try {
      const success = await deleteScholarship(scholarship._id);

      if (success) {
        if (onClose) {
          setTimeout(() => onClose(), 500);
        }
      }
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast.error("❌ فشل في حذف المنحة");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!scholarship) {
    return (
      <div className="scholarship-info">
        <div className="error-state">
          <p>⚠️ لا توجد بيانات للمنحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scholarship-info">
      <div className="head">
        <div className="logo">
          <img src="/images/logo-trans.png" alt="logo" width={40} height={40} />
        </div>
        <div className="text">
          <h3>{scholarship.title}</h3>
          <p>{scholarship.description}</p>
        </div>
      </div>

      <div className="details">
        <div>
          <p>
            <Globe /> بلد المنحة:
          </p>
          <span>
            {country?.emoji || "🌍"}&nbsp;&nbsp;&nbsp;
            {country?.name_ar || scholarship.country || "غير محدد"}
          </span>
        </div>
        <div>
          <p>
            <Eye /> حالة المنحة:
          </p>
          <span>{scholarship.status}</span>
        </div>
        <div>
          <p>
            <GraduationCap /> الدرجة العلمية:
          </p>
          <span>{scholarship.degreeLevel}</span>
        </div>
        <div>
          <p>
            <DollarSign /> نوع التمويل:
          </p>
          <span>{scholarship.fundingType}</span>
        </div>
        <div>
          <p>
            <Clock /> الأيام المتبقية للتقديم:
          </p>
          <span>{calculateDaysLeft(scholarship.deadline)}</span>
        </div>
      </div>

      <div className="details">
        <div>
          <p>
            <CalendarClock /> اخر موعد للتقديم:
          </p>
          <span>{formatDate(scholarship.deadline)}</span>
        </div>
        {scholarship.resultsDate && (
          <div>
            <p>
              <CalendarDays /> موعد إعلان النتائج:
            </p>
            <span>{formatDate(scholarship.resultsDate)}</span>
          </div>
        )}
      </div>

      <div className="btns">
        <motion.a
          href={scholarship.link}
          target="_blank"
          rel="noopener noreferrer"
          className="primary visit"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={hoverEffect}
        >
          <ExternalLink />
          زيارة موقع المنحة
        </motion.a>

        <div className="action-btns">
          <motion.button
            className="primary edit"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            onClick={onEdit}
            disabled={isLoading || isDeleting}
          >
            <Pencil />
            {isLoading ? "جاري التحميل..." : "تعديل البيانات"}
          </motion.button>

          <motion.button
            className="primary delete"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            onClick={handleDelete}
            disabled={isLoading || isDeleting}
          >
            <Trash2 />
            {isDeleting ? "جاري الحذف..." : "حذف المنحة"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

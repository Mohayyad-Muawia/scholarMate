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
import Modal from "./Modal";
import ActionModal from "./ActionModal";

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
  const [showModal, setShowModal] = useState(false);
  const { deleteScholarship, isLoading } = useScholarshipsStore();

  const country = useMemo(
    () => getCountry(scholarship?.country),
    [scholarship?.country]
  );

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!scholarship?._id) return;

    setIsDeleting(true);
    setShowModal(false);

    try {
      const success = await deleteScholarship(scholarship._id);

      if (success) {
        toast.success("✅ تم حذف المنحة بنجاح");
        if (onClose) {
          setTimeout(() => onClose(), 500);
        }
      } else {
        toast.error("❌ فشل في حذف المنحة");
      }
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast.error("❌ فشل في حذف المنحة");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
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
          <span>
            {scholarship.deadline
              ? calculateDaysLeft(scholarship.deadline)
              : "غير محدد"}
          </span>
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
        {scholarship.link === "" ? (
          <button className="primary visit" disabled>
            <ExternalLink />
            لا يوجد رابط للمنحة
          </button>
        ) : (
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
            زيارة الموقع
          </motion.a>
        )}
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
            <span className="hide-in-mobile">
              {isLoading ? "جاري التحميل..." : "تعديل البيانات"}
            </span>
          </motion.button>

          <motion.button
            className="primary delete"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            onClick={handleDeleteClick}
            disabled={isLoading || isDeleting}
          >
            <Trash2 />
            <span className="hide-in-mobile">
              {isDeleting ? "جاري الحذف..." : "حذف المنحة"}
            </span>
          </motion.button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleCancelDelete}>
        <ActionModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Modal>
    </div>
  );
}

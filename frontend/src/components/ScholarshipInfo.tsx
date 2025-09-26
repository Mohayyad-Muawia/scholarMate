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
import { useMemo } from "react";
import calculateDaysLeft from "../utils/calcDaysLeft";

interface ScholarshipInfoProps {
  scholarship: Scholarship | null;
  onEdit: () => void;
}

export default function ScholarshipInfo({
  scholarship,
  onEdit,
}: ScholarshipInfoProps) {
  if (!scholarship) {
    return;
  }
  const country = useMemo(
    () => getCountry(scholarship.country),
    [scholarship.country]
  );
  return (
    <>
      <div className="scholarship-info">
        <div className="head">
          <div className="logo">
            <img
              src="/images/logo-trans.png"
              alt="logo"
              width={40}
              height={40}
            />
          </div>
          <div className="text">
            <h3>{scholarship.title}</h3>
            <p>{scholarship.description}</p>
          </div>
          {/* <a
          href={scholarship.link}
          target="_blank"
          rel="noopener noreferrer"
          className="visit"
        >
          <ArrowUpLeft />
        </a> */}
        </div>
        <div className="details">
          <div>
            <p>
              <Globe /> بلد المنحة:
            </p>
            <span>
              {country?.emoji}&nbsp;&nbsp;&nbsp;{country?.name_ar || "غير محدد"}
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
          <div>
            <motion.a
              className="primary edit"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
              onClick={onEdit}
            >
              <Pencil />
              تعديل البيانات
            </motion.a>
            <motion.a
              className="primary delete"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
            >
              <Trash2 />
              حذف المنحة
            </motion.a>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

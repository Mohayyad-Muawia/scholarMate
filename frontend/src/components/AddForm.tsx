import { useState, useEffect } from "react";
import SelectCountry from "./SelectCountry";
import "../styles/addForm.css";
import type { Scholarship } from "../types/index";
import { useScholarshipsStore } from "../store/scholarshipsStore";
import { hoverEffect } from "../motion/motionVariants";
import { motion } from "framer-motion";

const text = {
  title: {
    label: "اسم المنحة",
    placeholder: "ادخل اسم المنحة",
  },
  description: {
    label: "وصف المنحة",
    placeholder: "ادخل نبذة قصيرة عن المنحة (اقصى حد 50 حرف)",
  },
  country: {
    label: "الدولة",
    placeholder: "اختر الدولة",
  },
  degreeLevel: {
    label: "مستوى الدرجة العلمية",
    placeholder: "اختر مستوى الدرجة",
  },
  fundingType: {
    label: "نوع التمويل",
    placeholder: "اختر نوع التمويل",
  },
  deadline: {
    label: "موعد الانتهاء",
    placeholder: "اختر تاريخ الانتهاء",
  },
  resultsDate: {
    label: "تاريخ النتائج (اختياري)",
    placeholder: "اختر تاريخ النتائج",
  },
  status: {
    label: "حالة التقديم",
    placeholder: "اختر الحالة",
  },
  link: {
    label: "رابط المنحة",
    placeholder: "ادخل رابط المنحة",
  },
};

const degreeLevels = ["بكالوريوس", "ماجستير", "دكتوراه", "دبلوم", "أخرى"];

const fundingTypes = ["كامل", "جزئي", "ذاتي"];

const statuses = [
  "لم يتم التقديم",
  "في انتظار النتيجة",
  "تم رفض الطلب",
  "تم قبول الطلب",
];

interface AddFormProps {
  close: () => void;
  scholarshipToEdit?: Scholarship | null;
}

interface FormData {
  title: string;
  description: string;
  country?: string;
  degreeLevel: "بكالوريوس" | "ماجستير" | "دكتوراه" | "دبلوم" | "أخرى";
  fundingType: "كامل" | "جزئي" | "ذاتي";
  deadline: string;
  resultsDate?: string;
  status:
    | "لم يتم التقديم"
    | "في انتظار النتيجة"
    | "تم رفض الطلب"
    | "تم قبول الطلب";
  link: string;
}

export default function AddForm({ close, scholarshipToEdit }: AddFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { addScholarship, updateScholarship, isLoading } =
    useScholarshipsStore();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    country: "",
    degreeLevel: "بكالوريوس",
    fundingType: "كامل",
    deadline: "",
    resultsDate: "",
    status: "لم يتم التقديم",
    link: "",
  });

  const dateToString = (date: Date | string | undefined): string => {
    if (!date) return "";
    if (typeof date === "string") return date.split("T")[0];
    return date.toISOString().split("T")[0];
  };

  const stringToDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  useEffect(() => {
    if (scholarshipToEdit) {
      setIsEditing(true);
      setFormData({
        title: scholarshipToEdit.title,
        description: scholarshipToEdit.description,
        country: scholarshipToEdit.country || "",
        degreeLevel: scholarshipToEdit.degreeLevel,
        fundingType: scholarshipToEdit.fundingType,
        deadline: dateToString(scholarshipToEdit.deadline),
        resultsDate: dateToString(scholarshipToEdit.resultsDate),
        status: scholarshipToEdit.status,
        link: scholarshipToEdit.link,
      });
    } else {
      // إreset
      setIsEditing(false);
      setFormData({
        title: "",
        description: "",
        country: "",
        degreeLevel: "بكالوريوس",
        fundingType: "كامل",
        deadline: "",
        resultsDate: "",
        status: "لم يتم التقديم",
        link: "",
      });
    }
  }, [scholarshipToEdit]);

  // Functions:-
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      deadline: stringToDate(formData.deadline),
      resultsDate: formData.resultsDate
        ? stringToDate(formData.resultsDate)
        : undefined,
      country: formData.country || undefined,
    };

    if (isEditing && scholarshipToEdit?._id) {
      // update form
      const success = await updateScholarship(
        scholarshipToEdit._id,
        submissionData
      );

      if (success) {
        close();
      }
    } else {
      // add form
      const success = await addScholarship(submissionData);

      if (success) {
        close();
      }
    }
  };

  return (
    <div className="addForm">
      <h2>{isEditing ? "تعديل المنحة" : "اضافة منحة جديدة"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mobile-full">
          <label htmlFor="title">{text.title.label}</label>
          <input
            type="text"
            id="title"
            placeholder={text.title.placeholder}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">{text.country.label}</label>
          <SelectCountry
            value={formData.country || ""}
            setCountry={(country) =>
              setFormData((prev) => ({
                ...prev,
                country: typeof country === "string" ? country : prev.country,
              }))
            }
          />
        </div>

        <div>
          <label htmlFor="degreeLevel">{text.degreeLevel.label}</label>
          <select
            id="degreeLevel"
            value={formData.degreeLevel}
            onChange={handleChange}
            required
          >
            {degreeLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fundingType">{text.fundingType.label}</label>
          <select
            id="fundingType"
            value={formData.fundingType}
            onChange={handleChange}
            required
          >
            {fundingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="deadline">{text.deadline.label}</label>
          <input
            type="date"
            id="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="resultsDate">{text.resultsDate.label}</label>
          <input
            type="date"
            id="resultsDate"
            value={formData.resultsDate || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="status">{text.status.label}</label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mobile-full">
          <label htmlFor="link">{text.link.label}</label>
          <input
            type="url"
            id="link"
            placeholder={text.link.placeholder}
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>

        <div className="full">
          <label htmlFor="description">{text.description.label}</label>
          <input
            type="text"
            id="description"
            placeholder={text.description.placeholder}
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        <div className="btns">
          <motion.button
            type="button"
            className="secondary"
            onClick={close}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
          >
            اغلاق
          </motion.button>
          <motion.button
            type="submit"
            className="primary"
            disabled={isLoading}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
          >
            {isLoading
              ? isEditing
                ? "جاري التعديل"
                : "جاري الاضافة"
              : isEditing
              ? "تعديل المنحة"
              : "اضافة المنحة"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

import { Trash2 } from "lucide-react";
import "../styles/actionModal.css";
import { motion } from "framer-motion";
import { hoverEffect } from "../motion/motionVariants";

interface ActionModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ActionModal({
  onConfirm,
  onCancel,
  title = "حذف المنحة",
  message = "هل أنت متأكد من أنك تريد حذف هذه المنحة؟",
  confirmText = "حذف",
  cancelText = "رجوع",
}: ActionModalProps) {
  return (
    <div className="action-modal">
      <div className="icon">
        <Trash2 />
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      <div className="btns">
        <motion.button
          className="cancel secondary"
          onClick={onCancel}
          type="button"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={hoverEffect}
        >
          {cancelText}
        </motion.button>

        <motion.button
          className="confirm primary"
          onClick={onConfirm}
          type="button"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={hoverEffect}
        >
          {confirmText}
        </motion.button>
      </div>
    </div>
  );
}

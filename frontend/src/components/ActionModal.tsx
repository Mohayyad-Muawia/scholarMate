import { Trash2 } from "lucide-react";
import "../styles/actionModal.css";
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
        <button className="cancel secondary" onClick={onCancel} type="button">
          {cancelText}
        </button>

        <button className="confirm primary" onClick={onConfirm} type="button">
          {confirmText}
        </button>
      </div>
    </div>
  );
}

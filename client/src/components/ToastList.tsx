import React from "react";
import Toast from "./Toast";

interface ToastListProps {
  toasts: {
    id: number;
    message: string;
    type: "success" | "error" | "warning";
  }[];
  removeToast: (id: number) => void;
}

const ToastList: React.FC<ToastListProps> = ({ toasts, removeToast }) => {
  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1050 }}
    >
      {toasts
        .slice()
        .reverse()
        .map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
    </div>
  );
};

export default ToastList;

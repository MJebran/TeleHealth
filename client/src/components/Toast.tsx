import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const iconMap = {
    success: "bi bi-check-circle",
    error: "bi bi-radioactive",
    warning: "bi bi-exclamation-triangle",
  };

  return (
    <div
      className={`toast toast-${type} d-flex justify-content-between align-items-center`}
      style={{ minWidth: "250px", margin: "10px" }}
    >
      <div>
        <i
          className={`bi ${iconMap[type]}`}
          style={{ marginRight: "10px" }}
        ></i>
        {message}
      </div>
      <button className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Toast;

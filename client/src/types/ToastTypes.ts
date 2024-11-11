export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "warning";
}

export interface ToastContextType {
  addToast: (message: string, type: "success" | "error" | "warning") => void;
}

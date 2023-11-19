import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  type: "success" | "error";
  message: string;
}

const NotifyToast: React.FC<ToastProps> = ({ type, message }) => {
  useEffect(() => {
    const notify = () => {
      toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    };

    notify();
  }, [type, message]);

  return <ToastContainer />;
};

export default NotifyToast;

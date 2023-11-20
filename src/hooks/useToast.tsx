import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "info" | "warning" | "error";

const useToast = () => {
  return (message: string, type: ToastType) => {
    const options: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    toast[type](message, options);
  };
};

export default useToast;

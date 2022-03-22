import { ToastPosition, ToastTransition } from "react-toastify/dist/types";

export interface IStyleableProps {
  style?: any;
  className?: string;
}

export type NotificationType = {
  position: ToastPosition;
  autoClose: number | false;
  pauseOnHover: boolean;
  transition?: ToastTransition;
  closeOnClick?: boolean;
  hideProgressBar?: boolean;
};

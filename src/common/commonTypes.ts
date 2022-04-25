import { ToastPosition, ToastTransition } from "react-toastify/dist/types";

export type IInlineStyles = {
  [key: string]: Record<string, string>;
};

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

import icons from "./components/Icon";

export interface IStyleableProps {
  style?: any;
  className?: string;
}

export type IconKeys = keyof typeof icons;

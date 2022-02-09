import icons from "./components/Icon";

export interface ISelectOption {
  label: string;
  value: number;
  icon?: any;
}

export interface IStyleableProps {
  style?: any;
  className?: string;
}

export type IconKeys = keyof typeof icons;

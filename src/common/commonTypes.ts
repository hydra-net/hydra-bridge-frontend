import  icons  from "./components/Icon";

export interface IApiResponse<T> {
    result?: T;
    status?: number;
    errorMsg?: any;
    message?: string;
  }


  export interface ISelectOption {
    label: string;
    value: any;
    icon?: any
  }

  export interface IStyleableProps {
    style?: any;
    className?: string;
  }
  
export type IconKeys = keyof typeof icons;
import { useTheme } from "styled-components";
import icons from "./index";
import { IconKeys } from "../../commonTypes";

interface IIconProps {
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  name?: IconKeys;
  [prop: string]: any;
}

const defaultSize = "24px";

const Icon = ({ width, height, size, color, name, ...props }: IIconProps) => {
  const theme = useTheme();
  const IconComponent = name && icons[name];

  if (!IconComponent || typeof IconComponent === "string") {
    return null;
  }

  return (
    <IconComponent
      width={width || size || defaultSize}
      height={height || size || defaultSize}
      color={color || theme.primaryColor}
      {...props}
    />
  );
};

export default Icon;

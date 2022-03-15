import icons from "./index";
import { IconKeys } from "../../commonTypes";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";

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
  const IconComponent = name && icons[name];

  if (!IconComponent || typeof IconComponent === "string") {
    return null;
  }

  return (
    <IconComponent
      width={width || size || defaultSize}
      height={height || size || defaultSize}
      color={color || theme.colors.white}
      data-icon={name}
      {...props}
    />
  );
};

export default Icon;

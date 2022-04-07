import React, { Suspense } from "react";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export type IconKeys =
  | "hydraBridgeLogo"
  | "doubleArrowRight"
  | "cutArrowRight"
  | "cutArrowDown"
  | "copy"
  | "ethCoin"
  | "daiCoin"
  | "polygonCoin"
  | "usdcCoin"
  | "usdtCoin"
  | "arbitrumChain"
  | "optimismChain"
  | "hopChain"
  | "polygonChain"
  | "synapseChain"
  | "loadingSpinner";

export interface IIconProps {
  id?: string;
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  name: IconKeys;
  [prop: string]: any;
}

const defaultSize = "24px";

const Icon = ({
  id = (Math.random() * 9999).toString(),
  width,
  height,
  size,
  color,
  name,
  ...props
}: IIconProps) => {
  const capitalizeFirstLetter = (str: string): IconKeys =>
    (str.charAt(0).toUpperCase() + str.slice(1)) as IconKeys;
  const IconComponent = React.lazy(
    () => import(`./Icon${capitalizeFirstLetter(name)}`)
  );

  if (!IconComponent) {
    return null;
  }

  return (
    <Suspense fallback={<> </>}>
      <IconComponent
        id={id}
        width={width || size || defaultSize}
        height={height || size || defaultSize}
        color={color || theme.colors.white}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      />
    </Suspense>
  );
};

export default Icon;

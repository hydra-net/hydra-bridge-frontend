export const getBridgeIconName = (bridgeName: string): string => {
  if (
    bridgeName === "polygon-bridge" ||
    bridgeName === "polygon-bridge-goerli"
  ) {
    return "polygon";
  }

  if (bridgeName === "hop-bridge" || bridgeName === "hop-bridge-goerli") {
    return "hop";
  }

  return "";
};

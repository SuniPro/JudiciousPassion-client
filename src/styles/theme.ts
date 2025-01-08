import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";

const windowSize = {
  small: "screen and (max-width: 600px)",
  middle: "screen and (min-width: 601px) and (max-width: 768px)",
  base: "screen and (max-width: 768px)",
  large: "screen (min-width: 768px) and (max-width: 1024px)",
  ExtraLarge: "screen (min-width: 1024px)",
};

const fontSize = {
  xs: "0.5rem",
  sm: "0.75rem",
  base: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
};

const fontStyle = {
  serif: "sans-serif",
  roboto: "Roboto, sans-serif",
  montserrat: "Montserrat, sans-serif",
  poppins: "Poppins, sans-serif",
  archivo: "Archivo, sans-serif",
  katibeh: "Katibeh, sans-serif",
  playfair: "Playfair Display, sans-serif",
};

const colors = {
  white: "#ffffff",
  black: "#000000",
  gray: "#979797",
  primary: "#00a0ff",
  secondary: "#ddd",
  hover: "#00a0ff50",
  basicBlack: "#181818",
  success: "#52c41a",
  warning: "#df1313",
  luxuryGreen: "#356358",
  whiteGray: "#f2f2f2",
  mayaBlue: "#58CCFF",
  babyBlue: "#85C8F2",
  babyBlueToneDown: "#88D4F2",
  brightGray: "#E6EEF3",
  diamond: "#B8EDFD",
  azureishWhite: "#DBEDF9",

  gold: "#d7bc6a",
  lightGold: "#f3e1a9",
  gradientGoldBottom: "linear-gradient(to bottom, #d7bc6a, #ffe9a6)",
  gradientGoldRight: "linear-gradient(to right, #d7bc6a, #ffe9a6)",
};

const shadowStyle = {
  default: "0 1px 2px rgba(0, 0, 0, 0.2)",
};

const borderRadius = {
  circle: "10rem",
  roundedBox: "14px",
  softBox: "8px",
};

const islandBlueTheme = {
  bodyBackground: colors.brightGray,
  mainMenuActiveBackground: colors.babyBlueToneDown,
  fontPrimary: colors.black,
  fontSecondary: colors.gray,
  primary: colors.primary,
  secondary: colors.secondary,
  gray: "#979797",
  hover: colors.hover,
  contentBoxBorder: colors.brightGray,
  menuAndToggleActiveColor: colors.babyBlueToneDown,
  menuAndToggleNonActiveColor: colors.secondary,
  activeBackgroundColor: colors.babyBlueToneDown,
  nonActiveBackgroundColor: colors.secondary,
  defaultBackground: colors.white,
  fontColor: {
    default: colors.black,
    buttonDefault: colors.white,
  },
};

const repo = {
  open: "red",
  close: "blue",
};

export type WindowSizeTypes = typeof windowSize;
export type FontSizeTypes = typeof fontSize;
export type ColorTypes = typeof colors;
export type FontTypes = typeof fontStyle;
export type ShadowStylesTypes = typeof shadowStyle;
export type BorderRadiusTypes = typeof borderRadius;
export type IslandBlueThemeType = typeof islandBlueTheme;

const baseTheme = createTheme();

const theme: Theme = {
  ...baseTheme,
  windowSize,
  fontStyle,
  fontSize,
  colors,
  islandBlueTheme,
  shadowStyle,
  borderRadius,
};

export default theme;

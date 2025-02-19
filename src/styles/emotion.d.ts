import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";
import {
  BorderRadiusTypes,
  ColorTypes,
  DefaultThemeType,
  FontSizeTypes,
  FontTypes,
  MainFrameSizeType,
  ShadowStylesTypes,
  WindowSizeTypes,
} from "./theme";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    windowSize: WindowSizeTypes;
    colors: ColorTypes;
    fontStyle: FontTypes;
    fontSize: FontSizeTypes;
    defaultTheme: DefaultThemeType;
    shadowStyle: ShadowStylesTypes;
    borderRadius: BorderRadiusTypes;
    mainFrameSize: MainFrameSizeType;
  }
}

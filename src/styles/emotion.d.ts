import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";
import {
  BorderRadiusTypes,
  ColorTypes,
  FontSizeTypes,
  FontTypes,
  IslandBlueThemeType,
  ShadowStylesTypes,
  WindowSizeTypes,
} from "./theme";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    windowSize: WindowSizeTypes;
    colors: ColorTypes;
    fontStyle: FontTypes;
    fontSize: FontSizeTypes;
    islandBlueTheme: IslandBlueThemeType;
    shadowStyle: ShadowStylesTypes;
    borderRadius: BorderRadiusTypes;
  }
}

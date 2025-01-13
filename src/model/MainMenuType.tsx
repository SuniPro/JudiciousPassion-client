import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { ReactNode } from "react";

export interface MainMenuType {
  menu: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  type: "taste" | "saunter" | "tour" | "personal";
  component?: ReactNode;
}

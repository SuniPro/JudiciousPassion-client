import { TasteType } from "./TasteType";
import { SaunterType } from "./SaunterType";
import { TourType } from "./TourType";

export interface PostingType {
  type: "taste" | "saunter" | "tour";
}

export type DataByType<T extends PostingType["type"]> = T extends "taste"
  ? TasteType
  : T extends "saunter"
    ? SaunterType
    : TourType;

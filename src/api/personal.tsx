import { TasteType } from "../model/TasteType";
import { getFormTravelServer } from "./base";
import { TourType } from "../model/TourType";

export async function getTasteByInsertId(
  insertId: string | null,
): Promise<TasteType[]> {
  const response = await getFormTravelServer(`/personal/taste/${insertId}`);

  return await response.data;
}

export async function getTourByInsertId(insertId: string): Promise<TourType[]> {
  const response = await getFormTravelServer(`/personal/tour/${insertId}`);

  return await response.data;
}

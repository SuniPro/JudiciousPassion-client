import { TasteType } from "../model/TasteType";
import { getFormTravelServer, postToTravelServer } from "./base";
import { TourType } from "../model/TourType";
import { NowLocationType } from "../model/location";

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

export async function createLocation(
  location?: NowLocationType,
): Promise<NowLocationType> {
  const response = await postToTravelServer(`/personal/location`, location);

  return await response.data;
}

export async function getVideoComponent(url: string): Promise<NowLocationType> {
  const response = await getFormTravelServer(`/personal/scrape?url=${url}`);

  return await response.data;
}

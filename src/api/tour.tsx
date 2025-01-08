import { TasteType } from "../model/TasteType";
import { getFormTravelServer, postToTravelServer } from "./base";
import { TourType } from "../model/TourType";

export async function getTourList({ pageParam = 0 }): Promise<TourType[]> {
  const response = await getFormTravelServer(`/tour/list/${pageParam}/${5}`);

  return await response.data;
}

export async function addTour(taste: TourType): Promise<TourType> {
  const response = await postToTravelServer("/tour/create", taste);

  return await response.data;
}

export async function addLike(id: number, type: string): Promise<number> {
  const response = await postToTravelServer(`/${type}/like/add`, id);

  return await response.data;
}

export async function minusLike(
  tasteId: number,
  type: string,
): Promise<number> {
  const response = await postToTravelServer(`/${type}/like/minus`, tasteId);

  return await response.data;
}

export async function deleteTaste(taste: TasteType): Promise<void> {}

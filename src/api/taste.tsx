import { TasteType } from "../model/TasteType";
import {
  getFormTravelServer,
  postToTravelServer,
  postToTravelServerMultiPleFile,
} from "./base";

export async function getTasteList({ pageParam = 0 }): Promise<TasteType[]> {
  const response = await getFormTravelServer(`/taste/list/${pageParam}/${5}`);

  return await response.data;
}

export async function addTaste(taste: TasteType): Promise<TasteType> {
  const response = await postToTravelServer("/taste/create", taste);

  return await response.data;
}

export async function addLike(tasteId: number, type: string): Promise<number> {
  const response = await postToTravelServer(`/${type}/like/add`, tasteId);

  return await response.data;
}

export async function minusLike(
  tasteId: number,
  type: string,
): Promise<number> {
  const response = await postToTravelServer(`/${type}/like/minus`, tasteId);

  return await response.data;
}

export async function imageListUpload(
  type: string,
  id: string,
  image: Blob,
): Promise<string> {
  try {
    const response = await postToTravelServerMultiPleFile(
      `/${type}/image/upload`,
      id,
      type,
      image,
    );
    return response.data; // 서버에서 응답한 데이터 반환
  } catch (error) {
    console.error("Failed to upload images", error);
    return "";
  }
}

export async function deleteTaste(taste: TasteType): Promise<void> {}

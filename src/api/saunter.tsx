import {
  getFormTravelServer,
  postToTravelServer,
  postToTravelServerMultiPleFile,
} from "./base";
import { SaunterType } from "../model/SaunterType";

export async function getSaunterList({
  pageParam = 0,
}): Promise<SaunterType[]> {
  const response = await getFormTravelServer(`/saunter/list/${pageParam}/${5}`);

  return await response.data;
}

export async function addSaunter(saunter: SaunterType): Promise<SaunterType> {
  const response = await postToTravelServer("/saunter/create", saunter);

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

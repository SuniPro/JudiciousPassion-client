import { PostingType } from "../model/DynamicTypeExtend";
import { TasteType } from "../model/TasteType";
import { addTaste, imageListUpload } from "./taste";
import { ErrorNotify, SuccessNotify } from "../components/Alert/Alert";
import { SaunterType } from "../model/SaunterType";
import { TourType } from "../model/TourType";
import { addTour } from "./tour";
import { FileUploadType } from "../components/Editor/Editor";

export const ApiConnector = (
  type: PostingType["type"],
  data: any,
  func: void | Promise<void>,
) => {
  let newData;

  switch (type) {
    case "taste":
      newData = {
        title: data.title,
        contents: data.contents,
        description: data.description,
        placeName: data.location.placeName,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        personalColor: data.personalColor,
        insertId: data.insertId,
      } as TasteType;

      addTaste(newData)
        .then((r) => {
          const uploadPromises = data.imageUrl.map((image: FileUploadType) =>
            imageListUpload("taste", r.id?.toString()!, image.file).catch(
              () => {
                ErrorNotify("포스팅 실패 !");
              },
            ),
          );

          // 모든 imageListUpload 작업 완료 후 실행
          Promise.all(uploadPromises)
            .then(() => {
              SuccessNotify("포스팅 완료 !");
              setTimeout(() => {
                func;
              }, 400);
            })
            .catch(() => ErrorNotify("하나 이상의 업로드에 실패했습니다!"));
        })
        .catch(() => ErrorNotify("데이터 추가 실패!"));
      break;

    case "saunter":
      newData = {} as SaunterType;
      break;

    case "tour":
      newData = {
        title: data.title,
        contents: data.contents,
        description: data.description,
        placeName: data.location.placeName,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        personalColor: data.personalColor,
        insertId: data.insertId,
      } as TourType;

      addTour(newData)
        .then((r) => {
          const uploadPromises = data.imageUrl.map((image: Blob) =>
            imageListUpload("tour", r.id?.toString()!, image).catch(() => {
              ErrorNotify("포스팅 실패 !");
            }),
          );

          // 모든 imageListUpload 작업 완료 후 실행
          Promise.all(uploadPromises)
            .then(() => {
              SuccessNotify("포스팅 완료 !");
              setTimeout(() => {
                func;
              }, 400);
            })
            .catch(() => ErrorNotify("하나 이상의 업로드에 실패했습니다!"));
        })
        .catch(() => ErrorNotify("데이터 추가 실패!"));

    default:
      console.error("Unknown posting type:", type);
      return;
  }
};

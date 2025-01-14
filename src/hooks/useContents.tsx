import { useState } from "react";
import { LocationType } from "../model/location";

/** Taste, Tour, Saunter 에서 사용하는 fold, location을 관리하는 훅입니다.*/
export function useContentsFunction() {
  const [contentsFold, setContentsFold] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationType>({
    placeName: "",
    longitude: "",
    latitude: "",
  });

  return { contentsFold, setContentsFold, location, setLocation };
}

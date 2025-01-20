import { useState } from "react";
import { LocationType } from "../model/location";
import * as feather from "feather-icons";

/** Taste, Tour, Saunter 에서 사용하는 fold, location을 관리하는 훅입니다.*/
export function useContentsFunction() {
  const [contentsFold, setContentsFold] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationType>({
    placeName: "",
    longitude: 0,
    latitude: 0,
  });

  return { contentsFold, setContentsFold, location, setLocation };
}

/** data-feature 을 통해 출력되는 아이콘을 렌더링합니다. */
export function useContentIconHook() {
  feather.replace();
}

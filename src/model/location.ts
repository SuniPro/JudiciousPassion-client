export interface LocationType {
  placeName: string;
  longitude: number;
  latitude: number;
}

export interface LocationWayPointType {
  orderIndex?: number;
  placeName: string;
  latitude: number;
  longitude: number;
  type: "start" | "stop" | "end";
  travelMode?: google.maps.TravelMode | null;
}

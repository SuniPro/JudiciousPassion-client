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
  waypointType: "start" | "stop" | "end";
}

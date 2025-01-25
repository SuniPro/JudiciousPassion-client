export interface SaunterType {
  id: number;
  placeName: string;
  title: string;
  travelMode: "BICYCLING" | "DRIVING" | "TRANSIT" | "WALKING";
  contents: string;
  personalColor?: string | null;
  rate?: number | null;
  insertDate: string;
  insertId: string;
  updateDate?: string;
  updateId?: string;
  waypoints: WaypointType[];
  mediaUrls?: string[] | null;
  youtubeLink?: string | null;
}

type TravelModeType = google.maps.TravelMode;

export interface WaypointType {
  id: number;
  saunterId: number;
  latitude: number;
  longitude: number;
  orderIndex: number;
  waypointType: "start" | "stop" | "end";
}

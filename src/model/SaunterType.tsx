export interface SaunterType {
  id: number;
  placeName: string;
  title: string;
  travelMode: "driving" | "walking" | "bicycling";
  contents: string;
  personalColor?: string | null;
  rate?: number | null;
  insertDate: string;
  insertId: string;
  updateDate?: string;
  updateId?: string;
  waypoints: WaypointType[];
  mediaUrls?: string[] | null;
}

export interface WaypointType {
  id: number;
  saunterId: number;
  latitude: number;
  longitude: number;
  orderIndex: number;
  WaypointType: "start" | "stop" | "end";
}

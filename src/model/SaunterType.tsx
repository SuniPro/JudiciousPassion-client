export interface SaunterType {
  id: number;
  placeName: string;
  title: string;
  travelMode: string;
  description: string;
  content: string;
  insertDate: string;
  insertId: string;
  updateDate: string;
  updateId: string;
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

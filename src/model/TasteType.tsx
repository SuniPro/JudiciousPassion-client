export interface TasteType {
  id?: number;
  placeName: string;
  title: string;
  contents: string;
  latitude: number;
  longitude: number;
  rate?: number | null;
  personalColor?: string | null;
  insertDate?: string;
  insertId?: string;
  updateDate?: string;
  updateId?: string;
  imageUrls?: string[] | null;
}

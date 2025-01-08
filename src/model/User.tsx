export interface User {
  id?: number;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  profileImage?: string | null;
  profileMessage?: string | null;
  personalColor?: string | null;
  roleType?: "admin" | "user" | "guest";
  insertDate?: string | null;
  insertId?: string | null;
  updateDate?: string | null;
  updateId?: string | null;
  deleteDate?: string | null;
  deleteId?: string | null;
}

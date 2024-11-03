export interface UserRequest {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number;
  offset?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
export interface UserRightsUpdate {
  field: string;
  value: boolean;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

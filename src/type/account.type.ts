export type myOrder = {
  history_id: string;
  history_date: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  class: {
    id: string;
    title: string;
    description: string;
  };
  payment: {
    id: string;
    price: number;
    status: string;
  };
  review?: {
    id: string;
    review_text?: string;
    rating: number;
  };
} | [];

export type AccountState = {
  myOrders: myOrder[] | [];
};

export type AccountActions = {
  regenerateToken: () => Promise<void>;
  getUserDetail: () => Promise<void>;
  fetchMyOrder: () => void;
  updateUser: (updateData: Partial<{ name: string; avatar: File | string | null }>) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: () => Promise<void>
};

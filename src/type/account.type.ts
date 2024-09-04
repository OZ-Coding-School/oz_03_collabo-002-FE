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
};

export type User = {
  id: string;
  name: string;
  email: string;
  profile_image?: string | null;
}

export type AccountState = {
  user: User | null;
  access: string | null;
  refresh: string | null;
  myOrders: myOrder[] | [];
};

export type AccountActions = {
  fetchUser: () => Promise<void>;
  fetchMyOrder: () => Promise<void>;
  updateUser: (updateData: Partial<{ name: string; avatar: File | string | null }>) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: () => Promise<void>;
};

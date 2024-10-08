export interface Class {
  id: number;
  title: string;
  owner?: string;
  name: string;
  category: string;
  dates: {
    id: number;
    class_id: number;
    start_date: string;
    start_time: string;
    end_time: string;
    person: number;
  }[];
  people?: {
    max: number;
    require: number;
  };
  average_rating: number;
  popular?: boolean;
  is_new: boolean;
  is_viewed: boolean;
  is_best: boolean;
  price: number;
  discountRate?: number;
  discountPrice?: number;
  description: string;
  images: {
    id: number;
    class_id: number;
    image_url: string;
  }[];
  address: {
    state: string;
    city: string;
    street: string;
  };
  created_at: string;
  tag?: string;
  price_in_usd?: number;
}

export type ClassState = {
  classes: Class[] | null;
  filteredClasses: Record<string, Class[]>;
  fetchClasses: () => Promise<void>;
  filterClasses: (kind: string) => void;
  setClasses: (classes: Class[]) => void;
};

type Address = {
  state?: string;
  city?: string;
  street?: string;
};
export interface Class {
  id: string;
  dates: [
    {
      id: string;
      class_id: string;
      start_date: string;
      start_time: string;
      end_time: string;
      person: 2147483647;
    },
  ];
  images: [
    {
      id: string;
      class_id: string;
      image_url: string;
    },
  ];
  is_new: boolean;
  category: string;
  price_in_usd: number;
  is_best: boolean;
  formatted_address: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  max_person: number;
  require_person: number;
  price: number;
  class_type: string;
  is_viewed: boolean;
  averageScore: number;
  address: string | Address;
  kind: string;
}

export type ClassState = {
  classes: Class[];
  filteredClasses: Record<string, Class[]>;
  fetchClasses: () => Promise<void>;
  setClasses: (data: Class[]) => void;
  filterClasses: (kind: string) => void;
  fetchClassDetails: (id: string) => Promise<Class | null>;
  fetchMaxPerson: (id: string) => Promise<number | null>;
};

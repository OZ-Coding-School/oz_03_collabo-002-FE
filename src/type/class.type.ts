export type Status = 'Selected' | 'Fully booked' | 'Seats available';
// type ClassItem = {
//   address?:
//     | {
//         state?: string;
//         city?: string;
//       }
//     | string;
//   // other properties
// };

//type Address = string | { state: string; city: string };

// type Address = {
//   state?: string;
//   city?: string;
//   street?: string;
// };

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
      detail_image_urls: string[];
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
  address: string;
  name?: string;
}
export type ClassDetail = {
  status: Status;
  seatsLeft: number;
  time: string;
  seat: number;
};

export type ClassState = {
  classes: Class[] | null;
  filteredClasses: Record<string, Class[]>;
  classDetails: ClassDetail[];
  fetchClasses: () => Promise<void>;
  filterClasses: (kind: string) => void;
  findOneClass: (id: string | undefined) => Promise<Class | null>;
  fetchClassesTime: (id: string) => Promise<void>;
};

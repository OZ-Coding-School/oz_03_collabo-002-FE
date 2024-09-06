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
      person: number;
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
  price_in_usd: number;
  is_best: boolean;
  genre: string;
  category: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  max_person: number;
  require_person: number;
  price: number;
  address: string;
  class_type: string;
  discount_rate: number;
  is_viewed: boolean;
  averageScore: number;
  name?: string;
  average_rating: number;
}
export type ClassDetail = {
  status: Status;
  seatsLeft: number;
  time: string;
  seat: number;
};
export interface ClassState {
  classes: Class[];
  filteredClasses: { [key: string]: Class[] };
  classDetails: ClassDetail[];
  fetchClasses: () => Promise<void>;
  filterClasses: (kind: string) => void;
  findOneClass: (id: string | undefined) => Promise<Class | null>;
  setClasses: (data: Class[]) => void;
  setClassDetails: (updatedClassDetails: ClassDetail[]) => void;
  fetchClassesTime: (id: string) => Promise<void>;
}

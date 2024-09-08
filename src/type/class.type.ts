export enum Status {
  selected = 'Selected',
  FullyBooked = 'Fully booked',
  Available = 'Seats available',
}

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

type ClassImage =
  | [
      {
        description_image_urls: string[] | [];
        detail_image_urls: string[] | []
        thumbnail_image_urls: string[] | [];
        id: string;
        class_id: string;
      },
    ]
  | [];

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
      description_image_urls: never[];
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

export type ClassTitle = {
  id: string | number;
  title: string;
};

export interface ClassState {
  fetchClasses: any;
  classItem: Class | null;
  classes: Class[];
  filteredClasses: { [key: string]: Class[] };
  classTitle: ClassTitle[] | null;
  classDetails: ClassDetail[];
  findOneClass: (id: string) => Promise<Class | null>;
  fetchClassesTime: (id: string) => Promise<void>;
  setClassDetails: (details: ClassDetail[]) => void;
}

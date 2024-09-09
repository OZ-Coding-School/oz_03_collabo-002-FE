// Status Enum 정의
export enum Status {
  selected = 'Selected',
  FullyBooked = 'Fully booked',
  Available = 'Seats available',
}

// Class 인터페이스 정의
export interface Class {
  map: any;
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

// ClassDetail 타입 정의
export type ClassDetail = {
  status: Status;
  seatsLeft: number;
  time: string;
  seat: number;
};

// ClassState 인터페이스 정의
export interface ClassState {
  classItem: Class | null;
  classes: Class[];
  filteredClasses: { [key: string]: Class[] };
  classDetails: ClassDetail[];
  fetchClasses: () => Promise<void>;
  filterClasses: (category: string) => void;
  findOneClass: (id: string) => Promise<Class | null>;
  setClasses: (classes: Class[]) => void;
  setClassDetails: (details: ClassDetail[]) => void;
}

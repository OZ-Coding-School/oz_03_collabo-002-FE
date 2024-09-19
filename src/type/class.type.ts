// Status Enum 정의
export enum Status {
  selected = 'Selected',
  FullyBooked = 'Fully booked',
  Available = 'Seats available',
}

// Class 인터페이스 정의
export interface Class {
  location: { lat: number; lng: number };
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
      id: string;
      class_id: string;
      description_image_urls: string[];
      detail_image_urls: string[];
      thumbnail_image_urls?: string[];
    },
  ];
  is_new: boolean;
  price_in_usd: number;
  is_best: boolean;
  genre: string;
  category: string[];
  average_rating: number;
  created_at: string;
  is_popular: boolean;
  updated_at: string;
  title: string;
  description: string;
  max_person: number;
  require_person: number;
  price: number;
  address: string;
  class_type: string[];
  discount_rate: number;
  is_viewed: boolean;
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
  classTitle: ClassTitle[];
  filteredClasses: { [key: string]: Class[] };
  classDetails: ClassDetail[];
  isLoading: boolean; // isLoading 추가
  fetchClasses: () => Promise<void>;
  filterClasses: (category: string) => void;
  findOneClass: (id: string) => Promise<Class | null>;
  fetchClassesTime: (id: string) => Promise<void>; // fetchClassesTime 함수 추가
  setClasses: (classes: Class[]) => void;
  setClassDetails: (details: ClassDetail[]) => void;
}

export type ClassTitle = {
  id: string;
  title: string;
};

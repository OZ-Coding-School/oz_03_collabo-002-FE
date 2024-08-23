export interface Class {
  id: string;
  name: string;
  owner: string;
  date: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    participants: number;
  }[];
  people: {
    max: number;
    require: number;
  };
  averageScore: number;
  popular: boolean;
  price: number;
  discountRate: number;
  discountPrice: number;
  description: string;
  photoGallery: string[];
  photoFinished: string[];
  place: {
    state: string;
    city: string;
    address: string;
  };
  createAt: string;
  tag?: string;
}

export type ClassState = {
  classes: Class[] | null;
  filteredClasses: Record<string, Class[]>;
  fetchClasses: () => Promise<void>;
  filterClasses: (kind: string) => void;
};

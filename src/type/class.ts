export type ClassDate = {
  startDate: string;
  startTime: string;
  endTime: string;
  participants: string[];
};

export type Class = {
  id: string;
  name: string;
  owner: string;
  date: ClassDate[];
  people: { max: number; require: number };
  averageScore: number;
  popular: boolean;
  price: number;
  discountRate: number;
  discountPrice: number;
  description: string;
  photoGallery: string[];
  photoFinished: string[];
  place: { state: string; city: string; address: string };
  createAt: string;
};

export type ClassState = {
  classes: Class[] | null;
  filteredClasses: Record<string, Class[]>;
  fetchClasses: () => Promise<void>;
  filterClasses: (kind: string) => void;
};

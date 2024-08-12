import axios from 'axios';
import { create } from 'zustand';

type ClassState = {
  classes: Class[] | null;
  fetchClasses: () => void;
};

type Class = {
  id: string;
  className: string;
  description: string;
  averageRating: number;
  personMax: number;
  personRequire: number;
  personRegister: number;
  price: number;
  classDates: string[];
  classHour: string[];
  photoGallery: string[];
  photoFinished: string[];
};

const useClassStore = create<ClassState>((set) => ({
  classes: null,

  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classlist`);
      console.log(response);
      set({ classes: response.data });
    } catch (error) {
      console.log('Error fetching data :', error);
    }
  },
}));

export default useClassStore;

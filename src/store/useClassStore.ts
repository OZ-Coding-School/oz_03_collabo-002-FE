import axios, { AxiosError } from 'axios';
import { create } from 'zustand';
import { ClassState, Class, ClassDetail, ClassTitle } from '../type/class.type';

axios.defaults.baseURL = 'https://api.custom-k.store/v1';

export const useClassStore = create<ClassState>((set) => ({
  classItem: null,
  classes: [],
  classTitle: [],
  filteredClasses: {},
  classDetails: [],
  isLoading: false,

  findOneClass: async (id: string) => {
    try {
      const response = await axios.get(`/classes/${id}`);
      if (response.data?.status === 'success' && response.data.data) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching class:', error);
      return null;
    }
  },

  fetchClassesTime: async (id: string) => {
    try {
      const response = await axios.get(`/classes/${id}`);
      const data = response.data;
      if (data.status === 'success' && data.data.dates.length > 0) {
        const dates = data.data.dates;
        const generatedClassDetails = dates.map(
          (date: { person: number; start_time: string; end_time: string }) => ({
            date,
            status:
              date.person >= data.data.max_person
                ? 'Fully booked'
                : 'Available',
            seatsLeft: date.person,
            seat: data.data.max_person,
            time: `${date.start_time.substring(0, 5)} - ${date.end_time.substring(0, 5)}`, // 초(second)를 제외한 시간 형식으로 변경
          }),
        );
        // id와 title만 추출하여 배열로 변환
        const classTitleList: ClassTitle[] = data.data.map(
          (classItem: Class) => ({
            id: classItem.id,
            title: classItem.title,
          }),
        );

        set({ classDetails: generatedClassDetails,
          classTitle: classTitleList,
         });
      } else {
        console.error(`Failed to fetch class times for ID ${id}:`, data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          `Axios error fetching class times for ID ${id}:`,
          error.response?.data || 'No response data',
          error.message,
        );
      } else {
        console.error(`Error fetching class times for ID ${id}:`, error);
      }
    }
  },

  fetchClasses: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get('/classes');
      if (response.data?.status === 'success') {
        set({ classes: response.data.data });
      } else {
        console.error('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      set({ classes: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  filterClasses: (category: string) => {
    set((state) => ({
      filteredClasses: {
        ...state.filteredClasses,
        [category]: state.classes.filter(
          (classItem) => classItem.category === category,
        ),
      },
    }));
  },

  // Setter for classes array
  setClasses: (classes: Class[]) => set({ classes }),

  // Setter for class details array
  setClassDetails: (details: ClassDetail[]) => set({ classDetails: details }),
}));

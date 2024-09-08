import axios from '../api/axios';
import { ClassState, Class, ClassDetail, Status } from '../type/class.type';
import { create } from 'zustand';
import { generateTimeBlocks } from '../utils/timeUtils'; // 함수 import
import { AxiosError } from 'axios';

const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  filteredClasses: {} as { [key: string]: Class[] }, // 초기화 수정
  classTitle: null,
  classDetails: [],

  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classes`);
      if (response.data && Array.isArray(response.data.data)) {
        set({ classes: response.data.data });
      } else {
        set(() => ({ classes: [] }));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Axios error message:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
    }
  },

  filterClasses: (kind: string) => {
    const classes = get().classes ?? [];
    const filteredClasses = { ...get().filteredClasses };

    const filtered = classes; // 여기에 필터링 로직을 추가해야 할 수도 있습니다

    filteredClasses[kind] = filtered;
    set({ filteredClasses });
  },

  findOneClass: async (id: string | undefined) => {
    try {
      const response = await axios.get(`/classes/${id}`);
      return response.data.data as Class;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Axios error message:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
      set({ classes: [] });
      return null;
    }
  },

  setClasses: (data: Class[]) => {
    set(() => ({ classes: data || [] }));
  },

  setClassDetails: (updatedClassDetails: ClassDetail[]) => {
    set({ classDetails: updatedClassDetails });
  },

  fetchClassesTime: async (id: string) => {
    try {
      const response = await axios.get(`/classes/${id}`);
      const data = response.data;
      if (data.status === 'success') {
        const { start_time, end_time, person = 0 } = data.data.dates[0];
        const max_person = data.data.max_person;
        const timeBlocks = generateTimeBlocks(start_time, end_time);

        const generatedClassDetails = timeBlocks.map((timeBlock, index) => ({
          status: index === 0 ? 'Selected' : ('Seats available' as Status),
          seatsLeft: person,
          seat: max_person,
          time: timeBlock,
        }));

        set({ classDetails: generatedClassDetails });
      } else {
        console.error('Failed to fetch class times:', data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Axios error message:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
    }
  },
}));

export default useClassStore;

import { create } from 'zustand';

import { ClassState, Class } from '../type/class.type';
import axios from '../api/axios';

const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  filteredClasses: {},

  fetchClasses: async () => {
    try {
      const response = await axiosInstance.get(`/classes`);

      if (response.data && Array.isArray(response.data)) {
        set({ classes: response.data });
      } else {
        console.error('Unexpected data format:', response.data);
        set({ classes: [] });
      }
    } catch (error: unknown) {
      // axios 모듈의 isAxiosError 함수 사용
      if (axios.isAxiosError(error)) {
        // AxiosError 타입으로 처리
        console.error(
          'Error fetching data:',
          error.response?.data || error.message,
        );
      } else {
        // AxiosError가 아닌 에러에 대한 처리
        console.error('An unexpected error occurred:', error);
      }
      set({ classes: [] });
    }
  },

  setClasses: (data: Class[]) => {
    if (data) {
      set(() => ({ classes: [...data] }));
    } else {
      set(() => ({ classes: [] }));
    }
  },

  filterClasses: (kind: string) => {
    const classes = get().classes ?? [];
    const filteredClasses = { ...get().filteredClasses };

    const filtered = classes;

    filteredClasses[kind] = filtered;
    set({ filteredClasses });
  },
  findOneClass: async (id) => {
    try {
      const response = await axios.get(`/classes/${id}`);
      const data: Class[] = response.data;
      const findData = data.find((item) => item.id === id);
      return findData ?? null;
    } catch (error) {
      console.log('Failed to find class: ', error);
      return null;
    }
  },
}));

export default useClassStore;

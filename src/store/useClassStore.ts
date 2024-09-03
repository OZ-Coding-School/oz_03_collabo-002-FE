import { create } from 'zustand';
import { ClassState, Class } from '../type/class.type';
import axios from '../api/axios';

const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  filteredClasses: {},
  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classes`);
      console.log(response.data);
      console.log('응답 헤더:', response.headers['content-type']);

      // 응답 데이터가 객체인지 확인하고, 그 안의 data 속성이 배열인지 확인
      if (response.data && Array.isArray(response.data.data)) {
        set({ classes: response.data.data }); // data 배열을 사용
      } else {
        console.error('Unexpected data format:', response.data);
        set({ classes: [] }); // 형식이 예상과 다를 경우 빈 배열로 초기화
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
      return response.data.data as Class;
    } catch (error) {
      console.log('Failed to find class: ', error);
      return null;
    }
  },
}));

export default useClassStore;

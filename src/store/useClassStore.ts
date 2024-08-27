import axios from '../api/axios';
import { create } from 'zustand';
import { ClassState } from '../type/class';

const useClassStore = create<ClassState>((set, get) => ({
  classes: null,
  filteredClasses: {},

  fetchClasses: async () => {
    try {
      const response = await axios.get(`/class`);
      console.log(response, 'response');
      // 데이터를 가져온 후에 모든 kind에 대해 필터링 수행

      // response.data가 배열이 아닌 경우를 대비한 처리
      const data = Array.isArray(response.data) ? response.data : [];
      console.log(data, 'data');
      set({ classes: data });
    } catch (error) {
      console.log('Error fetching data :', error);
      set({ classes: [] }); // 에러 시 빈 배열로 설정
    }
  },
  setClasses: (data) => set({ classes: data }),
  filterClasses: (kind: string) => {
    set(() => {
      const classes = get().classes ?? [];
      const filteredClasses = { ...get().filteredClasses };
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      let filtered = classes;

      filteredClasses[kind] = filtered;
      return { filteredClasses };
    });
  },
}));

export default useClassStore;

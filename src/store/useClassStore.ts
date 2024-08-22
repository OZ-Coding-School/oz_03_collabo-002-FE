import axios from '../api/axios';
import { create } from 'zustand';
import { ClassState } from '../type/class';


const useClassStore = create<ClassState>((set, get) => ({
  classes: null,
  filteredClasses: {},

  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classlist`);
      set({ classes: response.data });
      // 데이터를 가져온 후에 모든 kind에 대해 필터링 수행
      Object.keys(get().filteredClasses).forEach((kind) => {
        get().filterClasses(kind);
      });
    } catch (error) {
      console.log('Error fetching data :', error);
    }
  },
  filterClasses: (kind: string) => {
    set(() => {
      const classes = get().classes ?? [];
      const filteredClasses = { ...get().filteredClasses };
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      let filtered = classes;

      if (kind === 'popular') {
        // 현재는 popular만 가능
        filtered = filtered.filter((classItem) => classItem.popular === true);
        // TODO 종류별, 카테고리 별 보기는 추후 추가 예정
        // } else if (kind === 'custom-k-pick') {
        //   // 추후에 로직 추가
        // } else if (kind === 'newest') {
        //   filtered = filtered.filter(
        //     (classItem) => new Date(classItem.createAt) > thirtyDaysAgo,
        //   );
        // } else if (kind === 'today') {
        //   filtered = filtered.filter((classItem) =>
        //     classItem.date.some(
        //       (dateItem) =>
        //         new Date(dateItem.startDate).toDateString() ===
        //         today.toDateString(),
        //     ),
        //   );
      }

      filteredClasses[kind] = filtered;
      return { filteredClasses };
    });
  },
}));

export default useClassStore;

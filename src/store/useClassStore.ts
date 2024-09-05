import { create } from 'zustand';
import { ClassState, Class, ClassTitle } from '../type/class.type';
import axios from '../api/axios';
import { immer } from 'zustand/middleware/immer';

const useClassStore = create<ClassState>()(
  immer((set, get) => ({
    classes: [],
    filteredClasses: {},
    classTitle: null,

    fetchClasses: async () => {
      try {
        const response = await axios.get(`/classes`);
        // console.log(response.data);

        // 응답 데이터가 객체인지 확인하고, 그 안의 data 속성이 배열인지 확인
        if (response.data && Array.isArray(response.data.data)) {
          const classList = response.data.data;

          // id와 title만 추출하여 배열로 변환
          const classTitleList: ClassTitle[] = classList.map(
            (classItem: Class) => ({
              id: classItem.id,
              title: classItem.title,
            }),
          );

          // 상태 업데이트
          set((state) => {
            state.classes = classList;
            state.classTitle = classTitleList;
          });
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
  })),
);

export default useClassStore;

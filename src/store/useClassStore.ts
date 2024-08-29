import { create } from 'zustand';
import { ClassState, Class } from '../type/class.type';
import axios from '../api/axios';

const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  filteredClasses: {},

  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classes`);
      //console.log('응답 상태 코드:', response.status);
      //console.log(response.data);
      // console.log('응답 헤더:', response.headers['content-type']);
      if (response.data && Array.isArray(response.data)) {
        set({ classes: response.data });
      } else {
        console.error('Unexpected data format:', response.data);
        //set({ classes: [] });
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

import { create } from 'zustand';
import axios from 'axios';
import { Class, ClassState } from '../type/class.type';

// zustand 스토어 정의
const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  filteredClasses: {},
  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classes`);
      const data = response.data;
      if (data && Array.isArray(data.data)) {
        set({ classes: data.data });
      } else {
        console.error('Unexpected data format:', data);
        set({ classes: [] });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ classes: [] });
    }
  },
  setClasses: (data: Class[]) => {
    set({ classes: data ? [...data] : [] });
  },
  filterClasses: (kind: string) => {
    const classes = get().classes ?? [];
    const filteredClasses = { ...get().filteredClasses };
    const filtered = classes.filter((cls) => cls.kind === kind);
    filteredClasses[kind] = filtered;
    set({ filteredClasses });
  },
  fetchClassDetails: async (id: string): Promise<Class | null> => {
    try {
      const detail = await findOneClass(id);
      return detail;
    } catch (error) {
      console.error('Failed to fetch class details:', error);
      return null;
    }
  },

  // 최대 인원 가져오기
  fetchMaxPerson: async (id: string): Promise<number | null> => {
    try {
      const detail = await findOneClass(id);
      return detail?.max_person ?? null;
    } catch (error) {
      console.error('Failed to fetch max person:', error);
      return null;
    }
  },
}));

export const findOneClass = async (
  id: string | undefined,
): Promise<Class | null> => {
  try {
    const response = await axios.get(`/classes/${id}`);
    console.log('API Response:', response.data);

    // 응답이 HTML일 경우 처리
    if (typeof response.data !== 'object') {
      console.error(
        'Response is not a valid JSON object. HTML was returned instead.',
      );
      console.log('HTML Response:', response.data); // HTML 내용을 확인
      return null;
    }

    const classData = response.data?.data;

    if (classData && classData.id === Number(id)) {
      return classData;
    } else {
      console.error(`Class not found for id: ${id}`);
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      console.error(
        'API call error:',
        error.response.status,
        error.response.statusText,
      );
      if (typeof error.response.data === 'string') {
        console.log('Error HTML Response:', error.response.data);
      }
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
};

export default useClassStore;

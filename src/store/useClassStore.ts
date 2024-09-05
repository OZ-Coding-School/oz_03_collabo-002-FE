import { create } from 'zustand';
import { ClassState, Class, Status } from '../type/class.type';
import axios from '../api/axios';
import { generateTimeBlocks } from '../utils/timeUtils'; // 함수 import

const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  filteredClasses: {},
  classDetails: [],

  fetchClasses: async () => {
    try {
      const response = await axios.get(`/classes`);

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
      const data: Class[] = response.data;
      const findData = data.find((item) => item.id === id);
      return findData ?? null;
    } catch (error) {
      return null;
    }
  },

  // 클래스의 시간 데이터를 가져오는 함수

  fetchClassesTime: async (id: string) => {
    try {
      const response = await axios.get(`/classes/${id}`);

      const data = response.data;
      if (data.status === 'success') {
        const { start_time, end_time, person = 0 } = data.data.dates[0]; // dates 배열에서 시간 관련 정보 가져옴

        const max_person = data.data.max_person; // 최상위 객체에서 max_person 가져옴

        // 시간 블록 생성
        const timeBlocks = generateTimeBlocks(start_time, end_time);
        const seatsLeft = max_person ? max_person - person : 0;

        // 각 시간 블록에 대한 ClassDetail 생성
        const generatedClassDetails = timeBlocks.map((timeBlock, index) => ({
          status: index === 0 ? 'Selected' : ('Seats available' as Status),
          seatsLeft: max_person - person,
          seat: max_person,
          time: timeBlock,
        }));

        set({ classDetails: generatedClassDetails });
      } else {
        console.error('Failed to fetch class times:', data.message); // 실패 메시지 출력
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error); // API 호출 중 오류 발생 시
    }
  },
}));

export const findOneClass = async (
  id: string | undefined,
): Promise<Class | null> => {
  try {
    const response = await axios.get(`/classes/${id}`);

    if (typeof response.data !== 'object') {
      console.error(
        'Response is not a valid JSON object. HTML was returned instead.',
      );
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
      }
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
};

export default useClassStore;

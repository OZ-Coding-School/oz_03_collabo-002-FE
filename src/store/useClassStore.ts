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
      const data: Class[] = response.data;
      const findData = data.find((item) => item.id === id);
      return findData ?? null;
    } catch (error) {
      console.log('Failed to find class: ', error);
      return null;
    }
  },

  // 클래스의 시간 데이터를 가져오는 함수
  fetchClassesTime: async (id: string) => {
    try {
      const response = await axios.get(`/classes/${id}`);
      const data = response.data;

      if (data.status === 'success') {
        const { start_time, end_time, person } = data.data.dates[0];

        // 시간 블록 생성
        const timeBlocks = generateTimeBlocks(start_time, end_time);

        // 각 시간 블록에 대한 ClassDetail 생성
        const generatedClassDetails = timeBlocks.map((timeBlock, index) => {
          return {
            status: index === 0 ? 'Selected' : 'Seats available',
            seatsLeft: 15 - person,
            seat: 15,
            time: timeBlock,
          };
        });

        set({ classes: generatedClassDetails });
      } else {
        console.error('Failed to fetch class times:', data.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
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

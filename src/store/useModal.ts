import { create } from 'zustand';
import { ReactNode } from 'react'; // ReactNode 타입을 임포트

export interface ModalState {
  showModal: boolean;
  modalContent: ReactNode | null; // JSX를 받을 수 있도록 수정
  setModal: (content: ReactNode) => void;
  clearModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  modalContent: null, // JSX 요소를 받을 수 있도록 수정
  setModal: (content: ReactNode) =>
    set(() => ({
      showModal: true,
      modalContent: content, // JSX 요소를 상태로 저장
    })),
  clearModal: () =>
    set(() => ({
      showModal: false,
      modalContent: null, // 모달을 닫으면 내용 초기화
    })),
}));

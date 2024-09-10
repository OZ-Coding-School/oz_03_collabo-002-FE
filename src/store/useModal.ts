import { create } from 'zustand';
import { ReactNode } from 'react';

// This interface combines message and content state
export interface ModalState {
  showModal: boolean;
  modalContent: ReactNode | null;
  setModal: (content: ReactNode) => void;
  clearModal: () => void;
}

export const useModalOpenCloseStore = create<ModalState>((set) => ({
  showModal: false,
  modalContent: null,
  setModal: (content: ReactNode) =>
    set(() => ({
      showModal: true,
      modalContent: content,
    })),
  clearModal: () =>
    set(() => ({
      showModal: false,
      modalContent: null,
    })),
}));

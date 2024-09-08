import { create } from 'zustand';
import { ReactNode } from 'react';
interface ModalState {
  showModal: boolean;
  modalContent: string; // Add modalContent to the state
  clearModal: () => void;
  setModalContent: (content: string) => void; // Function to set content
}
export interface ModalMessageState {
  showModal: boolean;
  modalMessage: ReactNode | null;
  setModal: (message: ReactNode) => void;
  clearModal: () => void;
}

export interface ModalContentState {
  showModal: boolean;
  modalContent: ReactNode | null;
  setModal: (content: ReactNode) => void;
  clearModal: () => void;
}

export const useModalOpenCloseStore = create<ModalContentState>((set) => ({
  showModal: false,
  modalContent: null,
  setModal: (content: ReactNode) =>
    set((state) => ({
      ...state,
      showModal: true,
      modalContent: content,
    })),
  clearModal: () =>
    set((state) => ({
      ...state,
      showModal: false,
      modalContent: null,
    })),
}));

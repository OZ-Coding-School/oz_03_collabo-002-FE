import { create } from 'zustand';
import { ReactNode } from 'react';

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

export const useModalStore = create<ModalMessageState>((set) => ({
  showModal: false,
  modalMessage: null,
  setModal: (message: ReactNode) =>
    set(() => ({
      showModal: true,
      modalMessage: message,
    })),
  clearModal: () =>
    set(() => ({
      showModal: false,
      modalMessage: null,
    })),
}));

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

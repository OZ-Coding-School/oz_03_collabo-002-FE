import { create } from 'zustand';
import { ModalDefaultState, ModalState } from '../type/types';

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  modalMessage: '',
  setModal: (message) =>
    set(() => ({
      showModal: true,
      modalMessage: message,
    })),
  clearModal: () =>
    set(() => ({
      showModal: false,
      modalMessage: '',
    })),
}));

export const useModalOpenCloseStore = create<ModalDefaultState>((set) => ({
  showModal: false,
  setModal: () =>
    set(() => ({
      showModal: true,
    })),
  clearModal: () =>
    set(() => ({
      showModal: false,
      modalMessage: '',
    })),
}));

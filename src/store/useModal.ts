import { create } from 'zustand';
import { ModalState } from '../type/types';

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

export interface ModalState {
  showModal: boolean;
  modalMessage: string;
  setModal: (message: string) => void;
  clearModal: () => void;
  modalContent: null;
}

export interface ModalDefaultState {
  showModal: boolean;
  setModal: () => void;
  clearModal: () => void;
}

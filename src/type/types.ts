export interface ModalState {
  showModal: boolean;
  modalMessage: string;
  setModal: (message: string) => void;
  clearModal: () => void;
}

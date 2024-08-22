export interface ModalState {
  showModal: boolean;
  modalMessage: string;
  setModal: (message: string) => void;
  clearModal: () => void;
}

export interface ModalDefaultState {
  showModal: boolean;
  setModal: () => void;
  clearModal: () => void;
}

export interface Reviews {
  review_id: number;
  review_text: string;
  rating: number;
  created_at: string;
  likes_count: number;
  user: {
    name: string;
    profile_image: string;
  };
  images: {
    image_id: number;
    image_url: string;
  }[];
}

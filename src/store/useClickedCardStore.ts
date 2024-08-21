import { create } from 'zustand';
import { Class } from './useClassStore';

type ClickedCardState = {
  clickedCards: Class[];
  addClickedCard: (classItem: Class) => void;
};

const useClickedCardStore = create<ClickedCardState>((set) => ({
  clickedCards: [],
  addClickedCard: (classItem: Class) =>
    set((state) => ({
      clickedCards: [...state.clickedCards, classItem],
    })),
}));

export default useClickedCardStore;

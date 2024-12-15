import { create, useStore } from 'zustand';
import Caption from '../types/caption';

interface WordChangePopover {
  wordId: Caption['id'] | null;
  word: string | null;
  index: number | null;
  setCurrentWord: (id: Caption['id'], word: string, index: number) => void;
  resetCurrentWord: () => void;
}

const wordChangePopoverStore = create<WordChangePopover>(set => ({
  wordId: null,
  word: null,
  index: null,
  setCurrentWord: (id, word, index) => set({ wordId: id, word, index }),
  resetCurrentWord: () => set({ wordId: null, word: null, index: null }),
}));

const useWordChangePopover: {
  (): WordChangePopover;
  <T>(selector: (state: WordChangePopover) => T): T;
} = <T>(selector?: (state: WordChangePopover) => T) => useStore(wordChangePopoverStore, selector!);

export default useWordChangePopover;

import { create, useStore } from 'zustand';

interface PlayerStore {
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

const playerStore = create<PlayerStore>(set => ({
  currentTime: 0,
  setCurrentTime: (time: number) => set({ currentTime: time }),
}));

const usePlayerStore: {
  (): PlayerStore;
  <T>(selector: (state: PlayerStore) => T): T;
} = <T>(selector?: (state: PlayerStore) => T) => useStore(playerStore, selector!);

export default usePlayerStore;

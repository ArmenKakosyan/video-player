import { create, useStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import data from '../api/data';
import Video from '../types/video';
import Caption from '../types/caption';
import CaptionsMetaData from '../types/captionMetaData';
import CaptionColor from '../constants/captionColor';

interface VideoDataStore {
  isLoading: boolean;
  data: Omit<Video, 'captions'> | null;
  captions: Caption[] | null;
  captionsMetaData: Map<Caption['id'], CaptionsMetaData>;
  setCaptions: (captions: Video['captions']) => void;
  fetchVideoData: () => Promise<void>;
  setCaptionWord: (id: Caption['id'], newWord: string, index: number) => void;
  removeCaption: (id: Caption['id'], index: number) => void;
  changeCaptionColor: (id: Caption['id'], color: CaptionColor, index: number) => void;
}

const videoDataStore = create<VideoDataStore>((set, get) => ({
  isLoading: true,
  data: null,
  captions: null,
  captionsMetaData: new Map(),
  setCaptions: captions => set({ captions }),

  fetchVideoData: async () => {
    set({ isLoading: true });
    const { captions, ...videoData } = data;
    const modifiedCaptions = captions.map(caption => ({
      ...caption,
      id: uuidv4(),
    }));
    const captionsMetaData = new Map();
    modifiedCaptions.forEach(caption => {
      const words = caption.word.split(' ');
      words.forEach((word, index) => {
        captionsMetaData.set(`${caption.id}_${index}`, { word, index, color: '#FFF', removed: false });
      });
    });

    set({ data: videoData, captions: modifiedCaptions, captionsMetaData, isLoading: false });
  },

  setCaptionWord: (id, newWord, index) => {
    const { captions, captionsMetaData } = get();
    if (!captions) return;

    const currentCaption = captions.find(caption => caption.id === id);
    if (!currentCaption) return;

    const item = captionsMetaData.get(`${id}_${index}`)!;
    const clonedMap = new Map(captionsMetaData);
    clonedMap.set(`${id}_${index}`, { ...item, word: newWord });

    set({ captionsMetaData: clonedMap });
  },

  removeCaption: (id, index) => {
    const { captions, captionsMetaData } = get();
    if (!captions) return;

    const currentCaption = captions.find(caption => caption.id === id);
    if (!currentCaption) return;

    const item = captionsMetaData.get(`${id}_${index}`)!;
    const clonedMap = new Map(captionsMetaData);
    clonedMap.set(`${id}_${index}`, { ...item, removed: true });

    set({ captionsMetaData: clonedMap });
  },

  changeCaptionColor: (id, color, index) => {
    const { captions, captionsMetaData } = get();
    if (!captions) return;

    const currentCaption = captions.find(caption => caption.id === id);
    if (!currentCaption) return;

    const item = captionsMetaData.get(`${id}_${index}`)!;
    const clonedMap = new Map(captionsMetaData);
    clonedMap.set(`${id}_${index}`, { ...item, color });

    set({ captionsMetaData: clonedMap });
  },
}));

const useVideoDataStore: {
  (): VideoDataStore;
  <T>(selector: (state: VideoDataStore) => T): T;
} = <T>(selector?: (state: VideoDataStore) => T) => useStore(videoDataStore, selector!);

export default useVideoDataStore;

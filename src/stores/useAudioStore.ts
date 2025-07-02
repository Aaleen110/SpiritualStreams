import { create } from 'zustand';
import { SermonPart } from '@/types';

interface AudioState {
  // Current playing state
  currentPart: SermonPart | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  
  // Queue management
  queue: SermonPart[];
  currentIndex: number;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  play: (part: SermonPart) => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  
  // Queue actions
  setQueue: (parts: SermonPart[], startIndex?: number) => void;
  addToQueue: (part: SermonPart) => void;
  removeFromQueue: (index: number) => void;
  next: () => void;
  previous: () => void;
  
  // Utility
  reset: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  currentPart: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  queue: [],
  currentIndex: -1,
  isLoading: false,
  error: null,

  // Playback actions
  play: (part: SermonPart) => {
    console.log('Store play function called with:', part);
    set({
      currentPart: part,
      isPlaying: true,
      currentTime: 0,
      duration: part.duration,
      error: null,
    });
  },

  pause: () => {
    set({ isPlaying: false });
  },

  stop: () => {
    set({
      isPlaying: false,
      currentTime: 0,
    });
  },

  seek: (time: number) => {
    const { duration } = get();
    const clampedTime = Math.max(0, Math.min(time, duration));
    set({ currentTime: clampedTime });
  },

  setVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    set({ volume: clampedVolume });
  },

  toggleMute: () => {
    set((state) => ({ isMuted: !state.isMuted }));
  },

  // Queue actions
  setQueue: (parts: SermonPart[], startIndex = 0) => {
    set({
      queue: parts,
      currentIndex: startIndex,
    });
  },

  addToQueue: (part: SermonPart) => {
    set((state) => ({
      queue: [...state.queue, part],
    }));
  },

  removeFromQueue: (index: number) => {
    set((state) => {
      const newQueue = state.queue.filter((_, i) => i !== index);
      let newIndex = state.currentIndex;
      
      if (index < state.currentIndex) {
        newIndex--;
      } else if (index === state.currentIndex) {
        newIndex = -1;
      }
      
      return {
        queue: newQueue,
        currentIndex: newIndex,
        currentPart: newQueue[newIndex] || null,
      };
    });
  },

  next: () => {
    set((state) => {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.queue.length) {
        return {
          currentIndex: nextIndex,
          currentPart: state.queue[nextIndex],
          currentTime: 0,
          isPlaying: true,
        };
      }
      return state;
    });
  },

  previous: () => {
    set((state) => {
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        return {
          currentIndex: prevIndex,
          currentPart: state.queue[prevIndex],
          currentTime: 0,
          isPlaying: true,
        };
      }
      return state;
    });
  },

  // Utility
  reset: () => {
    set({
      currentPart: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      isMuted: false,
      queue: [],
      currentIndex: -1,
      isLoading: false,
      error: null,
    });
  },
})); 
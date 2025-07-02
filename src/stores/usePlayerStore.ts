import { create } from "zustand";
import { SermonPart } from "@/types";

interface PlayerStore {
	currentSong: SermonPart | null;
	isPlaying: boolean;
	queue: SermonPart[];
	currentIndex: number;

	initializeQueue: (parts: SermonPart[]) => void;
	playAlbum: (parts: SermonPart[], startIndex?: number) => void;
	setCurrentSong: (part: SermonPart | null) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	currentSong: null,
	isPlaying: false,
	queue: [],
	currentIndex: -1,

	initializeQueue: (parts: SermonPart[]) => {
		set({
			queue: parts,
			currentSong: get().currentSong || parts[0],
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
		});
	},

	playAlbum: (parts: SermonPart[], startIndex = 0) => {
		if (!parts || parts.length === 0) return;

		const part = parts[startIndex];
		if (!part) return;

		set({
			queue: parts,
			currentSong: part,
			currentIndex: startIndex,
			isPlaying: true,
		});
	},

	setCurrentSong: (part: SermonPart | null) => {
		if (!part) return;

		  const partIndex = get().queue.findIndex((s) => s.id === part.id);
		set({
			currentSong: part,
			isPlaying: true,
			currentIndex: partIndex !== -1 ? partIndex : get().currentIndex,
		});
	},

	togglePlay: () => {
		const willStartPlaying = !get().isPlaying;

		set({
			isPlaying: willStartPlaying,
		});
	},

	playNext: () => {
		const { currentIndex, queue } = get();
		const nextIndex = currentIndex + 1;

		// if there is a next song to play, let's play it
		if (nextIndex < queue.length) {
			const nextPart = queue[nextIndex];

			set({
				currentSong: nextPart,
				currentIndex: nextIndex,
				isPlaying: true,
			});
		} else {
			// no next song
			set({ isPlaying: false });
		}
	},
	playPrevious: () => {
		const { currentIndex, queue } = get();
		const prevIndex = currentIndex - 1;

		// theres a prev song
		if (prevIndex >= 0) {
			const prevPart = queue[prevIndex];

			set({
				currentSong: prevPart,
				currentIndex: prevIndex,
				isPlaying: true,
			});
		} else {
			// no prev song
			set({ isPlaying: false });
		}
	},
}));

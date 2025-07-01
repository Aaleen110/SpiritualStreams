import { Sermon, SermonPart } from "@/types";
import { create } from "zustand";

interface TranscriptStore {
	isOpen: boolean;
	currentSermon: Sermon | null;
	currentSermonPart: SermonPart | null;
	
	openTranscript: (sermon: Sermon, sermonPart: SermonPart) => void;
	closeTranscript: () => void;
}

export const useTranscriptStore = create<TranscriptStore>((set) => ({
	isOpen: false,
	currentSermon: null,
	currentSermonPart: null,
	
	openTranscript: (sermon: Sermon, sermonPart: SermonPart) => {
		set({
			isOpen: true,
			currentSermon: sermon,
			currentSermonPart: sermonPart,
		});
	},
	
	closeTranscript: () => {
		set({
			isOpen: false,
			currentSermon: null,
			currentSermonPart: null,
		});
	},
})); 
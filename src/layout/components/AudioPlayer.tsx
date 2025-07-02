import { usePlayerStore } from "@/stores/usePlayerStore";
import { config } from "@/config/env";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	const [error, setError] = useState<string | null>(null);

	const currentSong = usePlayerStore((state) => state.currentSong);
	const isPlaying = usePlayerStore((state) => state.isPlaying);
	const playNext = usePlayerStore((state) => state.playNext);

	// handle play/pause logic
	useEffect(() => {
		if (isPlaying) audioRef.current?.play();
		else audioRef.current?.pause();
	}, [isPlaying]);

	// handle song ends
	useEffect(() => {
		const audio = audioRef.current;

		const handleEnded = () => {
			playNext();
		};

		audio?.addEventListener("ended", handleEnded);

		return () => audio?.removeEventListener("ended", handleEnded);
	}, [playNext]);

	// handle song changes
	useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		const audio = audioRef.current;

		// Use the same URL construction as TestAudioPage for consistency
		const streamUrl = `${config.api.baseUrl.replace('/api/v1', '')}/api/v1/audio/${currentSong.id}`;

		// check if this is actually a new song
		const isSongChange = prevSongRef.current !== streamUrl;
		if (isSongChange) {

			setError(null);
			
			// Simplified event handling like TestAudioPage
			const handleLoadStart = () => {};
			const handleCanPlay = () => {};
			const handleError = (e: any) => {
				setError(`Audio error: ${e.target.error?.message || 'Unknown error'}`);
				console.error('Audio error:', e.target.error);
			};

			audio.addEventListener('loadstart', handleLoadStart);
			audio.addEventListener('canplay', handleCanPlay);
			audio.addEventListener('error', handleError);

			audio.src = streamUrl;
			audio.currentTime = 0;
			prevSongRef.current = streamUrl;

			if (isPlaying) {
				audio.play().catch(err => {
					console.error('Failed to play audio:', err);
					setError('Failed to play audio');
				});
			}

			// Cleanup event listeners
			return () => {
				audio.removeEventListener('loadstart', handleLoadStart);
				audio.removeEventListener('canplay', handleCanPlay);
				audio.removeEventListener('error', handleError);
			};
		}
	}, [currentSong, isPlaying]);

	// Debug info - only log errors, not loading states
	if (error) console.error('Audio error:', error);

	return (
		<audio 
			ref={audioRef} 
			preload="metadata"
			crossOrigin="anonymous"
			controls={false}
			data-audio-player="true"
		/>
	);
};
export default AudioPlayer;

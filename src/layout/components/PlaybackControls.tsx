import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useTranscriptStore } from "@/stores/useTranscriptStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sermons } from "../../lib/mockData";
// import { useParams } from "react-router-dom";

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
	const { openTranscript } = useTranscriptStore();
	// const { sermonId } = useParams();
	// Find the sermon that contains the currently playing song
	const currentSermon = currentSong ? sermons.find((sermon) => 
		sermon.parts.some((part) => part._id === currentSong._id)
	) : null;
	
	const [volume, setVolume] = useState(75);
	const [previousVolume, setPreviousVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

	return (
		<footer className='fixed sm:relative bottom-0 left-0 right-0 h-16 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-2 sm:px-4 flex-shrink-0 z-50'>
			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
				{/* currently playing song - mobile version with small image */}
				<div className='flex sm:hidden items-center gap-3 min-w-0 flex-1'>
					{currentSong && currentSermon && (
						<>
							<img
								src={currentSermon.imageUrl}
								alt={currentSermon.title}
								className='w-10 h-10 object-cover rounded-md flex-shrink-0'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate text-sm'>
									{currentSong.title}
								</div>
								<div className='text-xs text-zinc-400 truncate'>
									{currentSermon.preacher}
								</div>
							</div>
						</>
					)}
				</div>

				{/* currently playing song - desktop version */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
					{currentSong && currentSermon && (
						<>
							<img
								src={currentSermon.imageUrl}
								alt={currentSermon.title}
								className='w-14 h-14 object-cover rounded-md'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate hover:underline cursor-pointer'>
									{currentSong.title}
								</div>
								<div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
									{currentSermon.preacher}
								</div>
							</div>
						</>
					)}
				</div>

				{/* player controls - centered on mobile */}
				<div className='flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-full sm:max-w-[45%] justify-center'>
					<div className='flex items-center gap-3 sm:gap-6'>
						{/* <Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400'
						>
							<Shuffle className='h-4 w-4' />
						</Button> */}

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBack className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 sm:h-10 sm:w-10'
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-4 w-4 sm:h-5 sm:w-5' /> : <Play className='h-4 w-4 sm:h-5 sm:w-5' />}
						</Button>
						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForward className='h-4 w-4' />
						</Button>
						{/* <Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400'
						>
							<Repeat className='h-4 w-4' />
						</Button> */}
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full'>
						<div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className='w-full hover:cursor-grab active:cursor-grabbing'
							onValueChange={handleSeek}
						/>
						<div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
					</div>
				</div>
				{/* volume controls - hidden on mobile */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
					{/* <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
						<Mic2 className='h-4 w-4' />
					</Button>
					<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
						<ListMusic className='h-4 w-4' />
					</Button> */}
					{/* this will open transcript modal */}
					<Button 
						size='icon' 
						variant='ghost' 
						className='hover:text-white text-zinc-400' 
						onClick={() => {
							if (currentSermon && currentSong) {
								openTranscript(currentSermon, currentSong);
							}
						}}
					>
						<Laptop2 className='h-4 w-4' />
					</Button>

					<div className='flex items-center gap-2'>
						<Button 
							size='icon' 
							variant='ghost' 
							className='hover:text-white text-zinc-400'
							onClick={() => {
								if (audioRef.current) {
									if (volume > 0) {
										// Mute: store current volume and set to 0
										setPreviousVolume(volume);
										audioRef.current.volume = 0;
										setVolume(0);
									} else {
										// Unmute: restore previous volume
										audioRef.current.volume = previousVolume / 100;
										setVolume(previousVolume);
									}
								}
							}}
						>
							{volume === 0 ? (
								<Volume1 className='h-4 w-4' fill="currentColor" />
							) : (
								<Volume1 className='h-4 w-4' />
							)}
						</Button>

						<Slider
							value={[volume]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing'
							onValueChange={(value) => {
								setVolume(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}}
						/>
					</div>
				</div>

				{/* mobile transcript button */}
				<div className='flex sm:hidden items-center'>
					<Button 
						size='icon' 
						variant='ghost' 
						className='hover:text-white text-zinc-400' 
						onClick={() => {
							if (currentSermon && currentSong) {
								openTranscript(currentSermon, currentSong);
							}
						}}
					>
						<Laptop2 className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</footer>
	);
};

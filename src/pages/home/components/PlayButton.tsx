import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

interface PlayButtonProps {
	song: Song;
	className?: string;
}

const PlayButton = ({ song, className = '' }: PlayButtonProps) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};

	return (
		<Button
			size={"icon"}
			onClick={handlePlay}
			className={`absolute bottom-3 right-2 bg-[#D77B1E] hover:bg-[#D77B1E]/90 hover:scale-105 transition-all 
				duration-200 shadow-lg ${className} ${
					isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className='h-4 w-4 text-white' />
			) : (
				<Play className='h-4 w-4 text-white ml-0.5' />
			)}
		</Button>
	);
};
export default PlayButton;

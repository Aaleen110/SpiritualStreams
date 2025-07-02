import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Sermon } from "@/types";
import { Pause, Play } from "lucide-react";

interface PlayButtonProps {
	sermon: Sermon;
	className?: string;
}

const PlayButton = ({ sermon, className = '' }: PlayButtonProps) => {
	const currentSong = usePlayerStore((state) => state.currentSong);
	const isPlaying = usePlayerStore((state) => state.isPlaying);
	const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
	const togglePlay = usePlayerStore((state) => state.togglePlay);
	const playAlbum = usePlayerStore((state) => state.playAlbum);
	
	const isCurrentSermonPlaying = sermon.parts?.some((part) => part.id === currentSong?.id) || false;

	const handlePlay = (e: React.MouseEvent) => {
		e.stopPropagation();
		
		if (isCurrentSermonPlaying && isPlaying) {
			togglePlay();
		} else {
			// Play the sermon from the beginning
			if (sermon.parts && sermon.parts.length > 0) {
				playAlbum(sermon.parts, 0);
			}
		}
	};

	return (
		<Button
			size={"icon"}
			onClick={handlePlay}
			className={`absolute bottom-3 right-2 bg-[#D77B1E] hover:bg-[#D77B1E]/90 hover:scale-105 transition-all 
				duration-200 shadow-lg ${className} ${
					isCurrentSermonPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}
		>
			{isCurrentSermonPlaying && isPlaying ? (
				<Pause className='h-4 w-4 text-white' />
			) : (
				<Play className='h-4 w-4 text-white ml-0.5' />
			)}
		</Button>
	);
};
export default PlayButton;

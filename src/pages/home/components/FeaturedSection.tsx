// import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import { Sermon } from "@/types";
import { usePlayerStore } from "@/stores/usePlayerStore";

interface FeaturedSectionProps {
	sermons: Sermon[];
}

const FeaturedSection = ({ sermons }: FeaturedSectionProps) => {
	const { playAlbum } = usePlayerStore();

	// if (isLoading) return <FeaturedGridSkeleton />;

	// if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
			{sermons.map((sermon) => (
				<div
					key={sermon._id}
					className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative'
					onClick={() => playAlbum(sermon.parts, 0)}
				>
					<img
						src={sermon.imageUrl}
						alt={sermon.title}
						className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{sermon.title}</p>
						<p className='text-sm text-zinc-400 truncate'>{sermon.preacher}</p>
					</div>
					<PlayButton sermon={sermon} />
				</div>
			))}
		</div>
	);
};
export default FeaturedSection;

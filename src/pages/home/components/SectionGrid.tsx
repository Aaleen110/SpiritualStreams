import { Sermon } from "@/types";

import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";

type SectionGridProps = {
	title: string;
	sermons: Sermon[];
};

const SectionGrid = ({ sermons, title }: SectionGridProps) => {
	const { playAlbum } = usePlayerStore();

	// if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
				<Button variant='link' className='text-sm text-zinc-400 hover:text-white'>
					Show all
				</Button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{sermons.map((sermon) => (
					<div
						key={sermon.id}
						className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
						onClick={() => {
						if (sermon.parts && sermon.parts.length > 0) {
							playAlbum(sermon.parts, 0);
						}
					}}
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={sermon.imageUrl}
									alt={sermon.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlayButton sermon={sermon} />
						</div>
						<h3 className='font-medium mb-2 truncate'>{sermon.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{sermon.preacher}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGrid;

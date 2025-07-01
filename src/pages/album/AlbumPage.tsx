import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useTranscriptStore } from "@/stores/useTranscriptStore";
import { Clock, Pause, Play } from "lucide-react";
// import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { sermons } from "../../lib/mockData";

export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
	const { sermonId } = useParams();
	// const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
	const currentSermon = sermons.find((sermon) => sermon._id === sermonId);
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
	const { openTranscript } = useTranscriptStore();

	// useEffect(() => {
	// 	if (sermonId) fetchAlbumById(sermonId);
	// }, [fetchAlbumById, sermonId]);

	// if (isLoading) return null;

	if (!currentSermon) return null;

	const handlePlayAlbum = () => {
		if (!currentSermon) return;

		const isCurrentAlbumPlaying = currentSermon?.parts.some((part) => part._id === currentSong?._id);
		if (isCurrentAlbumPlaying && isPlaying) {
			// If the current sermon is playing, just toggle pause
			togglePlay();
		} else {
			// Always start playing the sermon from the beginning
			playAlbum(currentSermon?.parts, 0);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentSermon) return;

		playAlbum(currentSermon?.parts, index);
	};

	return (
		<div className='h-full'>
			<ScrollArea className='h-full rounded-md'>
				{/* Main Content */}
				<div className='relative min-h-full'>
					{/* bg gradient */}
					<div
						className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
						aria-hidden='true'
					/>

					{/* Content */}
					<div className='relative z-10'>
						<div className='flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6 pb-6 sm:pb-8'>
							<img
								src={currentSermon?.imageUrl}
								alt={currentSermon?.title}
								className='w-48 h-48 sm:w-[240px] sm:h-[240px] shadow-xl rounded mx-auto sm:mx-0'
							/>
							<div className='flex flex-col justify-end text-left'>
								<p className='text-sm font-medium'>Sermon</p>
								<h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold my-2 sm:my-4'>{currentSermon?.title}</h1>
								<div className='flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-sm text-zinc-100'>
									<span className='font-medium text-white'>{currentSermon?.preacher}</span>
									<span className='hidden sm:inline'>•</span>
									<span>{currentSermon?.parts.length} part(s)</span>
									<span className='hidden sm:inline'>•</span>
									<span>{currentSermon?.date}</span>
								</div>
							</div>
						</div>

						{/* play button */}
						<div className='px-4 sm:px-6 pb-4 flex items-center gap-6 justify-start'>
							<Button
								onClick={handlePlayAlbum}
								size='icon'
								className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D77B1E] hover:bg-[#D77B1E]/90 
                hover:scale-105 transition-all'
							>
								{isPlaying && currentSermon?.parts.some((part) => part._id === currentSong?._id) ? (
									<Pause className='h-6 w-6 sm:h-7 sm:w-7 text-black' />
								) : (
									<Play className='h-6 w-6 sm:h-7 sm:w-7 text-black' />
								)}
							</Button>
						</div>

						{/* Table Section */}
						<div className='bg-black/20 backdrop-blur-sm'>
							{/* table header */}
							<div
								className='grid grid-cols-[16px_1fr_auto_auto] sm:grid-cols-[16px_4fr_2fr_1fr] gap-2 sm:gap-4 px-4 sm:px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5'
							>
								<div>#</div>
								<div>Title</div>
								<div className='hidden sm:flex'>
									<Clock className='h-4 w-4' />
								</div>
								<div className='hidden sm:block'>Action</div>
							</div>

							{/* songs list */}

							<div className='px-2 sm:px-6'>
								<div className='space-y-2 py-4'>
									{currentSermon?.parts.map((sermonPart, index) => {
										const isCurrentSong = currentSong?._id === sermonPart._id;
										return (
											<div
												key={sermonPart._id}
												onClick={() => handlePlaySong(index)}
												className={`grid grid-cols-[16px_1fr_auto_auto] sm:grid-cols-[16px_4fr_2fr_1fr] gap-2 sm:gap-4 px-2 sm:px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'>
													{isCurrentSong && isPlaying ? (
														<div className='size-4 text-green-500'>{index + 1}</div>
													) : (
														<span className='group-hover:hidden'>{index + 1}</span>
													)}
													{!isCurrentSong && (
														<Play className='h-4 w-4 hidden group-hover:block' />
													)}
												</div>

												<div className='flex items-center gap-2 sm:gap-3 min-w-0'>
													<img src={currentSermon?.imageUrl} alt={sermonPart.title} className='size-8 sm:size-10 flex-shrink-0' />

													<div className='min-w-0 flex-1'>
														<div className={`font-medium text-white truncate`}>{sermonPart.title}</div>
														<div className='text-xs sm:text-sm truncate'>{currentSermon?.preacher}</div>
													</div>
												</div>

												<div className='flex items-center text-xs sm:text-sm'>{formatDuration(sermonPart.duration)}</div>
												<div className='flex items-center'>
													<button
														onClick={(e) => {
															e.stopPropagation();
															if (currentSermon) {
																openTranscript(currentSermon, sermonPart);
															}
														}}
														className='text-xs sm:text-sm text-zinc-400 hover:text-zinc-100 px-2 py-1 rounded'
													>
														Transcript
													</button>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};
export default AlbumPage;

// import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
// import { useMusicStore } from "@/stores/useMusicStore";
// import { useAuthStore } from "@/stores/useAuthStore";
import { Library, Loader2 } from "lucide-react";
// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSermons } from "@/hooks/useSermons";

const LeftSidebar = () => {
	// const { albums, fetchAlbums, isLoading } = useMusicStore();
	// const { isAuthenticated } = useAuthStore();

	// useEffect(() => {
	// 	fetchAlbums();
	// }, [fetchAlbums]);

	// console.log({ albums });

	const { sermons, isLoading, error } = useSermons({ limit: 20 });
	const navigate = useNavigate();

	console.log('LeftSidebar: sermons loaded:', sermons.length, 'isLoading:', isLoading, 'error:', error);

	const handleSermonClick = (sermonId: string, e: React.MouseEvent) => {
		console.log('LeftSidebar: Sermon clicked:', sermonId, 'event:', e);
		e.preventDefault();
		e.stopPropagation();
		
		console.log('LeftSidebar: Navigating to:', `/sermons/${sermonId}`);
		navigate(`/sermons/${sermonId}`);
	};

	return (
		<div className='h-full flex flex-col gap-2'>
			{/* Navigation menu */}

			<div className='rounded-lg bg-zinc-900 p-4'>
				<div className='space-y-2'>
					<Link
						to={"/"}
						className={cn(
							buttonVariants({
								variant: "ghost",
								className: "w-full justify-start text-white hover:bg-zinc-800",
							})
						)}
					>
						<div className='flex gap-2 items-center text-base'>
							<img src='/spiritual-streams.png' className='size-9 object-contain' alt='Spiritual Streams logo' />
							<span className='hidden md:inline'>Spiritual Streams</span>
						</div>
					</Link>

				</div>
			</div>

			{/* Library section */}
			<div className='flex-1 rounded-lg bg-zinc-900 p-4'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center text-white px-2'>
						<Library className='size-5 mr-2' />
						<span className='hidden md:inline'>Sermons</span>
					</div>
				</div>

				<ScrollArea className='h-[calc(100vh-300px)] sm:h-[calc(100vh-320px)]'>
					{isLoading ? (
						<div className='flex items-center justify-center py-8'>
							<Loader2 className='h-6 w-6 animate-spin text-zinc-400' />
						</div>
					) : error ? (
						<div className='text-red-400 text-sm p-4 text-center'>
							Failed to load sermons
						</div>
					) : (
						<div className='space-y-2'>
							{sermons.map((sermon) => (
								<div
									key={sermon.id}
									onClick={(e) => handleSermonClick(sermon.id, e)}
									className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
								>
									<img
										src={sermon.imageUrl}
										alt='Sermon img'
										className='size-12 rounded-md flex-shrink-0 object-cover'
									/>

									<div className='flex-1 min-w-0 hidden md:block'>
										<p className='font-medium truncate'>{sermon.title}</p>
										<p className='text-sm text-zinc-400 truncate'>Sermon • {sermon.preacher}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</ScrollArea>
			</div>
		</div>
	);
};
export default LeftSidebar;

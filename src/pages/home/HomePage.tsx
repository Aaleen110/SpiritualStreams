import Topbar from "@/components/Topbar";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { useSermons } from "@/hooks/useSermons";
// Removed useAudioStore import - no longer needed

const HomePage = () => {
	const {
		sermons,
		isLoading,
		error,
	
	} = useSermons({ limit: 20 });

	// Queue initialization is now handled by individual components

	// Get featured sermons (first 3 sermons)
	const featuredSermons = sermons.slice(0, 3);
	
	// Get made for you sermons (all sermons for now)
	const madeForYouSermons = sermons;
	
	// Get trending sermons (all sermons for now)
	const trendingSermons = sermons;

	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900 pb-16 sm:pb-0'>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]'>
				<div className='p-4 sm:p-6'>
					{error && (
						<div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-md">
							<p className="text-red-400 text-sm">{error}</p>
						</div>
					)}
					
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
					
					{isLoading ? (
						<div className="space-y-8">
							<div className="animate-pulse">
								<h2 className="text-xl font-semibold mb-4 bg-zinc-700 h-6 w-32 rounded"></h2>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="bg-zinc-800 h-48 rounded-md"></div>
									))}
								</div>
							</div>
						</div>
					) : (
						<>
					<FeaturedSection sermons={featuredSermons} />

					<div className='space-y-8'>
						<SectionGrid title='Made For You' sermons={madeForYouSermons} />
						{/* <SectionGrid title='Trending' sermons={trendingSermons} /> */}
					</div>
						</>
					)}
				</div>
			</ScrollArea>
		</main>
	);
};
export default HomePage;

import Topbar from "@/components/Topbar";
// import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
// import { usePlayerStore } from "@/stores/usePlayerStore";
import { sermons } from "@/lib/mockData";

const HomePage = () => {
	// const {
	// 	fetchFeaturedSongs,
	// 	fetchMadeForYouSongs,
	// 	fetchTrendingSongs,
	// 	isLoading,
	// 	madeForYouSongs,
	// 	featuredSongs,
	// 	trendingSongs,
	// } = useMusicStore();

	// const { initializeQueue } = usePlayerStore();

	// useEffect(() => {
	// 	fetchFeaturedSongs();
	// 	fetchMadeForYouSongs();
	// 	fetchTrendingSongs();
	// }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	// useEffect(() => {
	// 	if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
	// 		const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
	// 		initializeQueue(allSongs);
	// 	}
	// }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

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
					<></>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
					<FeaturedSection sermons={featuredSermons} />

					<div className='space-y-8'>
						<SectionGrid title='Made For You' sermons={madeForYouSermons} />
						<SectionGrid title='Trending' sermons={trendingSermons} />
					</div>
					
				</div>
			</ScrollArea>
		</main>
	);
};
export default HomePage;

// import { Album, Song, Stats } from "@/types";
// import toast from "react-hot-toast";
// import { create } from "zustand";
// import { 
// 	mockSongs, 
// 	mockAlbums, 
// 	mockStats, 
// 	getFeaturedSongs, 
// 	getMadeForYouSongs, 
// 	getTrendingSongs,
// 	getAlbumById 
// } from "@/lib/mockData";

// interface MusicStore {
// 	songs: Song[];
// 	albums: Album[];
// 	isLoading: boolean;
// 	error: string | null;
// 	currentAlbum: Album | null;
// 	featuredSongs: Song[];
// 	madeForYouSongs: Song[];
// 	trendingSongs: Song[];
// 	stats: Stats;

// 	fetchAlbums: () => Promise<void>;
// 	fetchAlbumById: (id: string) => Promise<void>;
// 	fetchFeaturedSongs: () => Promise<void>;
// 	fetchMadeForYouSongs: () => Promise<void>;
// 	fetchTrendingSongs: () => Promise<void>;
// 	fetchStats: () => Promise<void>;
// 	fetchSongs: () => Promise<void>;
// 	deleteSong: (id: string) => Promise<void>;
// 	deleteAlbum: (id: string) => Promise<void>;
// 	addSong: (song: Song) => void;
// 	addAlbum: (album: Album) => void;
// }

// export const useMusicStore = create<MusicStore>((set) => ({
// 	albums: [],
// 	songs: [],
// 	isLoading: false,
// 	error: null,
// 	currentAlbum: null,
// 	madeForYouSongs: [],
// 	featuredSongs: [],
// 	trendingSongs: [],
// 	stats: {
// 		totalSongs: 0,
// 		totalAlbums: 0,
// 		totalUsers: 0,
// 		totalArtists: 0,
// 	},

// 	deleteSong: async (id) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 500));
			
// 			set((state) => ({
// 				songs: state.songs.filter((song) => song._id !== id),
// 			}));
// 			toast.success("Song deleted successfully");
// 		} catch (error: any) {
// 			console.log("Error in deleteSong", error);
// 			toast.error("Error deleting song");
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	deleteAlbum: async (id) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 500));
			
// 			set((state) => ({
// 				albums: state.albums.filter((album) => album._id !== id),
// 				songs: state.songs.map((song) =>
// 					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
// 				),
// 			}));
// 			toast.success("Album deleted successfully");
// 		} catch (error: any) {
// 			toast.error("Failed to delete album: " + error.message);
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchSongs: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 300));
// 			set({ songs: mockSongs });
// 		} catch (error: any) {
// 			set({ error: error.message });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchStats: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 200));
// 			set({ stats: mockStats });
// 		} catch (error: any) {
// 			set({ error: error.message });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchAlbums: async () => {
// 		set({ isLoading: true, error: null });

// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 400));
// 			set({ albums: mockAlbums });
// 		} catch (error: any) {
// 			set({ error: "Failed to fetch albums" });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchAlbumById: async (id) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 300));
// 			const album = getAlbumById(id);
// 			if (album) {
// 				set({ currentAlbum: album });
// 			} else {
// 				set({ error: "Album not found" });
// 			}
// 		} catch (error: any) {
// 			set({ error: "Failed to fetch album" });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchFeaturedSongs: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 250));
// 			set({ featuredSongs: getFeaturedSongs() });
// 		} catch (error: any) {
// 			set({ error: "Failed to fetch featured songs" });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchMadeForYouSongs: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 300));
// 			set({ madeForYouSongs: getMadeForYouSongs() });
// 		} catch (error: any) {
// 			set({ error: "Failed to fetch made for you songs" });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	fetchTrendingSongs: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			// Simulate API delay
// 			await new Promise(resolve => setTimeout(resolve, 350));
// 			set({ trendingSongs: getTrendingSongs() });
// 		} catch (error: any) {
// 			set({ error: "Failed to fetch trending songs" });
// 		} finally {
// 			set({ isLoading: false });
// 		}
// 	},

// 	addSong: (song) => {
// 		set((state) => ({
// 			songs: [...state.songs, song],
// 		}));
// 	},

// 	addAlbum: (album) => {
// 		set((state) => ({
// 			albums: [...state.albums, album],
// 		}));
// 	},
// }));

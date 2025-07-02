export interface Song {
	id: string;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
}

export interface Album {
	id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: string;
	songs: Song[];
}

export interface SermonPart {
	id: string;
	sermonId: string;
	title: string;
	audioUrl: string;
	duration: number;
	transcript: string;
	partNumber: number;
	createdAt: string;
	updatedAt: string;
}

export interface Sermon {
	id: string;
	title: string;
	preacher: string;
	imageUrl: string;
	date: string;
	createdAt: string;
	updatedAt: string;
	parts: SermonPart[];
}

export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	id: string;
	fullName: string;
	imageUrl: string;
}

import { Album, Song, Stats, User, Message } from "@/types";

// Mock Songs Data
export const mockSongs: Song[] = [
  {
    _id: "1",
    title: "Ghadeer - Part 1",
    artist: "Imam Ali (as)",
    albumId: "1",
    imageUrl: "/cover-images/1.jpg", 
    audioUrl: "/songs/1.mp3",
    duration: 200,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2", 
    title: "Ghadeer - Part 2",
    artist: "Imam Ali (as)",
    albumId: "2",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "/songs/2.mp3",
    duration: 233,
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    _id: "3",
    title: "Dance Monkey",
    artist: "Tones and I", 
    albumId: "3",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "/songs/3.mp3",
    duration: 209,
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    _id: "4",
    title: "Ghadeer - Part 2",
    artist: "The Weeknd",
    albumId: "1", 
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "/songs/4.mp3",
    duration: 215,
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    _id: "5",
    title: "Perfect",
    artist: "Ed Sheeran",
    albumId: "2",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "/songs/5.mp3",
    duration: 263,
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    _id: "6", 
    title: "Johnny Run Away",
    artist: "Tones and I",
    albumId: "3",
    imageUrl: "/cover-images/6.jpg",
    audioUrl: "/songs/6.mp3",
    duration: 194,
    createdAt: "2024-01-20T13:20:00Z",
    updatedAt: "2024-01-20T13:20:00Z",
  },
  {
    _id: "7",
    title: "After Hours",
    artist: "The Weeknd",
    albumId: "1",
    imageUrl: "/cover-images/7.jpg",
    audioUrl: "/songs/7.mp3",
    duration: 361,
    createdAt: "2024-01-21T15:10:00Z",
    updatedAt: "2024-01-21T15:10:00Z",
  },
  {
    _id: "8",
    title: "Castle on the Hill",
    artist: "Ed Sheeran",
    albumId: "2",
    imageUrl: "/cover-images/8.jpg",
    audioUrl: "/songs/8.mp3",
    duration: 261,
    createdAt: "2024-01-22T12:40:00Z",
    updatedAt: "2024-01-22T12:40:00Z",
  },
  {
    _id: "9",
    title: "Never Seen the Rain",
    artist: "Tones and I",
    albumId: "3",
    imageUrl: "/cover-images/9.jpg",
    audioUrl: "/songs/9.mp3",
    duration: 184,
    createdAt: "2024-01-23T10:25:00Z",
    updatedAt: "2024-01-23T10:25:00Z",
  }
];

// Mock Albums Data
export const mockAlbums: Album[] = [
  {
    _id: "1",
    title: "Ghadeer",
    artist: "Imam Ali (as)",
    imageUrl: "/sermons/1.jpg",
    releaseYear: "2020",
    songs: mockSongs.filter(song => song.albumId === "1"),
  },
  {
    _id: "2",
    title: "Bibi Zainab in Sham",
    artist: "Sayyeda Zainab (as)",
    imageUrl: "/sermons/2.jpg",
    releaseYear: "2017",
    songs: mockSongs.filter(song => song.albumId === "2"),
  },
  {
    _id: "3",
    title: "Hazrat Abbas (as) in Mecca",
    artist: "Hazrat Abbas (as)",
    imageUrl: "/sermons/3.jpg",
    releaseYear: "61 AH",
    songs: mockSongs.filter(song => song.albumId === "3"),
  }
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    _id: "1",
    id: "user_1",
    fullName: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    _id: "2",
    id: "user_2",
    fullName: "Jane Smith",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    _id: "3",
    id: "user_3",
    fullName: "Mike Johnson",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    _id: "4",
    id: "user_4",
    fullName: "Sarah Wilson",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    _id: "5",
    id: "user_5",
    fullName: "David Brown",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

// Mock Messages Data
export const mockMessages: Message[] = [
  {
    _id: "1",
    senderId: "user_1",
    receiverId: "user_2",
    content: "Hey! What are you listening to?",
    createdAt: "2024-02-01T10:30:00Z",
    updatedAt: "2024-02-01T10:30:00Z",
  },
  {
    _id: "2",
    senderId: "user_2",
    receiverId: "user_1",
    content: "Just discovered this amazing new album!",
    createdAt: "2024-02-01T10:32:00Z",
    updatedAt: "2024-02-01T10:32:00Z",
  },
  {
    _id: "3",
    senderId: "user_1",
    receiverId: "user_2",
    content: "Which one? I'm always looking for recommendations!",
    createdAt: "2024-02-01T10:35:00Z",
    updatedAt: "2024-02-01T10:35:00Z",
  },
  {
    _id: "4",
    senderId: "user_2",
    receiverId: "user_1",
    content: "Harry's House by Harry Styles. It's incredible!",
    createdAt: "2024-02-01T10:37:00Z",
    updatedAt: "2024-02-01T10:37:00Z",
  },
];

// Mock Stats Data
export const mockStats: Stats = {
  totalSongs: 18,
  totalAlbums: 15,
  totalUsers: 1250,
  totalArtists: 45,
};

// Helper functions to simulate API responses
export const getFeaturedSongs = (): Song[] => {
  return mockSongs.slice(0, 6);
};

export const getMadeForYouSongs = (): Song[] => {
  return mockSongs.slice(6, 12);
};

export const getTrendingSongs = (): Song[] => {
  return mockSongs.slice(12, 18);
};

export const getAlbumById = (id: string): Album | undefined => {
  return mockAlbums.find(album => album._id === id);
};

export const getUsers = (): User[] => {
  return mockUsers;
};

export const getMessages = (): Message[] => {
  return mockMessages;
}; 
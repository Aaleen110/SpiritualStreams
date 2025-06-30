import { Message, User } from "@/types";
import { create } from "zustand";
import { getUsers, getMessages } from "@/lib/mockData";

interface ChatStore {
	users: User[];
	isLoading: boolean;
	error: string | null;
	isConnected: boolean;
	onlineUsers: Set<string>;
	userActivities: Map<string, string>;
	messages: Message[];
	selectedUser: User | null;

	fetchUsers: () => Promise<void>;
	initSocket: (userId: string) => void;
	disconnectSocket: () => void;
	sendMessage: (receiverId: string, senderId: string, content: string) => void;
	fetchMessages: (userId: string) => Promise<void>;
	setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
	users: [],
	isLoading: false,
	error: null,
	isConnected: false,
	onlineUsers: new Set(),
	userActivities: new Map(),
	messages: [],
	selectedUser: null,

	setSelectedUser: (user) => set({ selectedUser: user }),

	fetchUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 300));
			set({ users: getUsers() });
		} catch (error: any) {
			set({ error: "Failed to fetch users" });
		} finally {
			set({ isLoading: false });
		}
	},

	initSocket: (userId: string) => {
		// Simulate socket connection
		set({ isConnected: true });
		
		// Simulate online users
		const onlineUsers = new Set(["user_1", "user_2", "user_3"]);
		set({ onlineUsers });
		
		// Simulate user activities
		const activities = new Map([
			["user_1", "Listening to Blinding Lights"],
			["user_2", "Playing Harry's House"],
			["user_3", "Idle"]
		]);
		set({ userActivities: activities });
	},

	disconnectSocket: () => {
		set({ isConnected: false });
	},

	sendMessage: async (receiverId, senderId, content) => {
		// Simulate sending message
		const newMessage: Message = {
			_id: Date.now().toString(),
			senderId,
			receiverId,
			content,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		
		set((state) => ({
			messages: [...state.messages, newMessage],
		}));
	},

	fetchMessages: async (userId: string) => {
		set({ isLoading: true, error: null });
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 200));
			set({ messages: getMessages() });
		} catch (error: any) {
			set({ error: "Failed to fetch messages" });
		} finally {
			set({ isLoading: false });
		}
	},
}));

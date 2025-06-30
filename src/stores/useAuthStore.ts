import { create } from "zustand";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	imageUrl: string;
	email: string;
}

interface AuthStore {
	user: User | null;
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;

	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}

// Mock user data
const mockUsers = [
	{
		id: "user_1",
		firstName: "John",
		lastName: "Doe",
		imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		email: "john@example.com",
	},
	{
		id: "user_2",
		firstName: "Jane",
		lastName: "Smith",
		imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
		email: "jane@example.com",
	},
];

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isAdmin: false,
	isLoading: false,
	error: null,
	isAuthenticated: false,

	login: async (email: string, password: string) => {
		set({ isLoading: true, error: null });
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Mock authentication - accept any email/password
			const user = mockUsers.find(u => u.email === email) || mockUsers[0];
			set({ 
				user, 
				isAuthenticated: true,
				isLoading: false 
			});
		} catch (error: any) {
			set({ 
				error: "Login failed", 
				isLoading: false 
			});
		}
	},

	logout: () => {
		set({ 
			user: null, 
			isAuthenticated: false, 
			isAdmin: false 
		});
	},

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 200));
			// Mock admin status - you can change this to false to disable admin features
			set({ isAdmin: true });
		} catch (error: any) {
			set({ isAdmin: false, error: "Failed to check admin status" });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ 
			user: null, 
			isAuthenticated: false,
			isAdmin: false, 
			isLoading: false, 
			error: null 
		});
	},
}));

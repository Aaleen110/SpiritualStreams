import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useAuthStore();
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	// Mock online users (first 3 users)
	const mockOnlineUsers = new Set(users.slice(0, 3).map(user => user.id));

	// Mock currently playing data
	const mockCurrentlyPlaying = users.slice(0, 2).map(user => ({
		...user,
		isPlaying: Math.random() > 0.5,
		currentSong: {
			title: "Blinding Lights",
			artist: "The Weeknd"
		}
	}));

	const visibleUsers = isExpanded ? users : mockCurrentlyPlaying.slice(0, 2);

	return (
		<div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
			<div className='p-4 flex justify-between items-center border-b border-zinc-800'>
				<div className='flex items-center gap-2'>
					<Users className='size-5 shrink-0' />
					<h2 className='font-semibold'>What they're listening to</h2>
				</div>
			</div>

			{!user && <LoginPrompt />}

			<ScrollArea className='flex-1'>
				<div className='p-4 space-y-4'>
					{visibleUsers.map((user) => {
						const activity = userActivities.get(user.id);
						const isPlaying = activity && activity !== "Idle";

						return (
							<div
								key={user._id}
								className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group'
							>
								<div className='flex items-start gap-3'>
									<div className='relative'>
										<Avatar className='size-10 border border-zinc-800'>
											<AvatarImage src={user.imageUrl} alt={user.fullName} />
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
												${mockOnlineUsers.has(user.id) ? "bg-[#D77B1E]" : "bg-zinc-500"}
												`}
											aria-hidden='true'
										/>
									</div>

									<div className='flex-1 min-w-0'>
										<div className='flex items-center gap-2'>
											<span className='font-medium text-sm text-white'>{user.fullName}</span>
											{isPlaying && <Music className='size-3.5 text-[#D77B1E] shrink-0' />}
										</div>

										{isPlaying ? (
											<div className='mt-1'>
												<div className='mt-1 text-sm text-white font-medium truncate'>
													{activity.replace("Playing ", "").split(" by ")[0]}
												</div>
												<div className='text-xs text-zinc-400 truncate'>
													{activity.split(" by ")[1]}
												</div>
											</div>
										) : (
											<div className='mt-1 text-xs text-zinc-400'>Idle</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>

			{mockCurrentlyPlaying.length > 2 && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-full mt-3 text-xs text-zinc-400 hover:text-white transition-colors"
				>
					{isExpanded ? "Show less" : `Show ${mockCurrentlyPlaying.length - 2} more`}
				</button>
			)}

			{/* Decorative element */}
			<div className="mt-4 relative">
				<div className="absolute -inset-1 bg-gradient-to-r from-[#D77B1E] to-sky-500 rounded-full blur-lg opacity-20" />
				<div className="relative bg-zinc-800 rounded-full p-3 flex items-center justify-center">
					<HeadphonesIcon className='size-8 text-[#D77B1E]' />
				</div>
			</div>
		</div>
	);
};

export default FriendsActivity;

const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative'>
			<div
				className='absolute -inset-1 bg-gradient-to-r from-[#D77B1E] to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
			/>
			<div className='relative bg-zinc-900 rounded-full p-4'>
				<HeadphonesIcon className='size-8 text-[#D77B1E]' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
		</div>
	</div>
);

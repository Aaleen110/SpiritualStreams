import { LayoutDashboardIcon, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchBox from "./SearchBox";

const Topbar = () => {
	const { isAdmin, user, isAuthenticated, logout } = useAuthStore();

	const handleSearch = (query: string) => {
		console.log("Search query:", query);
		// TODO: Implement search functionality
	};

	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
		>

			{/* Search Box - Only show when authenticated */}

			<div className="flex-1 max-w-md mx-0">
				<SearchBox onSearch={handleSearch} />
			</div>

			<div className='flex items-center gap-4'>
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

				{!isAuthenticated ? (
					<Link to="/login" className={cn(buttonVariants({ variant: "outline" }))}>
						Sign In
					</Link>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage src={user?.imageUrl} alt={user?.firstName} />
									<AvatarFallback>
										{user?.firstName?.[0]}{user?.lastName?.[0]}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800" align="end" forceMount>
							<DropdownMenuItem className="text-zinc-400">
								<User className="mr-2 h-4 w-4" />
								<span>{user?.firstName} {user?.lastName}</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={logout} className="text-red-400">
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
};
export default Topbar;

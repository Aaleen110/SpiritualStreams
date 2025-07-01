import { Search, X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBoxProps {
	placeholder?: string;
	className?: string;
	onSearch?: (query: string) => void;
}

const SearchBox = ({ 
	placeholder = window.innerWidth < 640 ? "Search" : "Search Sermons, Topics, or Authors...",
	className = "",
	onSearch 
}: SearchBoxProps) => {
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleSearch = () => {
		if (query.trim() && onSearch) {
			onSearch(query.trim());
		}
	};

	const handleClear = () => {
		setQuery("");
		if (onSearch) {
			onSearch("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className={`relative w-full ${className}`}>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
				<Input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className={`
						pl-10 pr-10 h-10 sm:h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400
						focus:border-[#D77B1E] border-0.5 focus:ring-[#D77B1E]/20 focus:ring-2
						hover:border-zinc-600 transition-all duration-200 text-sm sm:text-base
						${isFocused ? 'ring-2 ring-[#D77B1E]/20' : ''}
					`}
				/>
				{query && (
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClear}
						className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
					>
						<X className="h-3 w-3 sm:h-4 sm:w-4" />
					</Button>
				)}
			</div>
			
			{/* Search suggestions placeholder */}
			{isFocused && query && (
				<div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50 max-h-60 sm:max-h-80 overflow-y-auto w-full">
					<div className="p-3 sm:p-4">
						<div className="text-xs sm:text-sm text-zinc-400 mb-3">Search results for "{query}"</div>
						
						{/* Songs section */}
						<div className="mb-3 sm:mb-4">
							<div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Songs</div>
							<div className="space-y-1 sm:space-y-2">
								<div className="flex items-center gap-2 sm:gap-3 p-2 rounded hover:bg-zinc-800 cursor-pointer">
									<div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-700 rounded flex-shrink-0"></div>
									<div className="flex-1 min-w-0">
										<div className="text-xs sm:text-sm font-medium text-white truncate">Blinding Lights</div>
										<div className="text-xs text-zinc-400 truncate">The Weeknd</div>
									</div>
								</div>
								<div className="flex items-center gap-2 sm:gap-3 p-2 rounded hover:bg-zinc-800 cursor-pointer">
									<div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-700 rounded flex-shrink-0"></div>
									<div className="flex-1 min-w-0">
										<div className="text-xs sm:text-sm font-medium text-white truncate">Shape of You</div>
										<div className="text-xs text-zinc-400 truncate">Ed Sheeran</div>
									</div>
								</div>
							</div>
						</div>

						{/* Artists section */}
						<div className="mb-3 sm:mb-4">
							<div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Artists</div>
							<div className="space-y-1 sm:space-y-2">
								<div className="flex items-center gap-2 sm:gap-3 p-2 rounded hover:bg-zinc-800 cursor-pointer">
									<div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-700 rounded-full flex-shrink-0"></div>
									<div className="flex-1 min-w-0">
										<div className="text-xs sm:text-sm font-medium text-white truncate">Harry Styles</div>
										<div className="text-xs text-zinc-400 truncate">Artist</div>
									</div>
								</div>
							</div>
						</div>

						{/* Albums section */}
						<div>
							<div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Albums</div>
							<div className="space-y-1 sm:space-y-2">
								<div className="flex items-center gap-2 sm:gap-3 p-2 rounded hover:bg-zinc-800 cursor-pointer">
									<div className="w-6 h-6 sm:w-8 sm:h-8 bg-zinc-700 rounded flex-shrink-0"></div>
									<div className="flex-1 min-w-0">
										<div className="text-xs sm:text-sm font-medium text-white truncate">Harry's House</div>
										<div className="text-xs text-zinc-400 truncate">Harry Styles</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchBox; 
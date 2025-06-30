import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong {
	title: string;
	artist: string;
	album: string;
	duration: string;
}

const AddSongDialog = () => {
	const { albums } = useMusicStore();
	const [songDialogOpen, setSongDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newSong, setNewSong] = useState<NewSong>({
		title: "",
		artist: "",
		album: "",
		duration: "0",
	});

	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});

	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const { addSong } = useMusicStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (!files.audio || !files.image) {
				return toast.error("Please upload both audio and image files");
			}

			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));

			const songData = {
				_id: Date.now().toString(),
				title: newSong.title,
				artist: newSong.artist,
				albumId: newSong.album === 'none' ? null : newSong.album,
				imageUrl: "",
				audioUrl: "",
				duration: parseInt(newSong.duration) || 0,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};

			addSong(songData);

			setNewSong({
				title: "",
				artist: "",
				album: "",
				duration: "0",
			});

			setFiles({
				audio: null,
				image: null,
			});
			toast.success("Song added successfully");
			setSongDialogOpen(false);
		} catch (error: any) {
			toast.error("Failed to add song: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-[#D77B1E] hover:bg-[#D77B1E]/90'>
					<Plus className='mr-2 size-4' />
					Add Song
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-zinc-900 border-zinc-800'>
				<DialogHeader>
					<DialogTitle>Add New Song</DialogTitle>
					<DialogDescription>Add a new song to your collection.</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-2">
						<label htmlFor="title" className="text-sm font-medium">Title</label>
						<Input
							id="title"
							value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							placeholder='Enter song title'
							className='bg-zinc-800 border-zinc-700'
							required
						/>
					</div>

					<div className="grid gap-2">
						<label htmlFor="artist" className="text-sm font-medium">Artist</label>
						<Input
							id="artist"
							value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
							placeholder='Enter artist name'
							className='bg-zinc-800 border-zinc-700'
							required
						/>
					</div>

					<div className="grid gap-2">
						<label htmlFor="album" className="text-sm font-medium">Album</label>
						<Select value={newSong.album} onValueChange={(value) => setNewSong({ ...newSong, album: value })}>
							<SelectTrigger className='bg-zinc-800 border-zinc-700'>
								<SelectValue placeholder='Select an album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800 border-zinc-700'>
								<SelectItem value='none'>No Album</SelectItem>
								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid gap-2">
						<label htmlFor="duration" className="text-sm font-medium">Duration</label>
						<Input
							id="duration"
							value={newSong.duration}
							onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
							placeholder="3:45"
							className='bg-zinc-800 border-zinc-700'
							required
						/>
					</div>

					<div>
						<label className='text-sm font-medium'>Audio File</label>
						<input
							ref={audioInputRef}
							type='file'
							accept='audio/*'
							onChange={(e) => setFiles({ ...files, audio: e.target.files?.[0] || null })}
							className='hidden'
						/>
						<Button
							type='button'
							variant='outline'
							onClick={() => audioInputRef.current?.click()}
							className='w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
						>
							<Upload className='mr-2 size-4' />
							{files.audio ? files.audio.name : 'Upload Audio'}
						</Button>
					</div>

					<div>
						<label className='text-sm font-medium'>Cover Image</label>
						<input
							ref={imageInputRef}
							type='file'
							accept='image/*'
							onChange={(e) => setFiles({ ...files, image: e.target.files?.[0] || null })}
							className='hidden'
						/>
						<Button
							type='button'
							variant='outline'
							onClick={() => imageInputRef.current?.click()}
							className='w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
						>
							<Upload className='mr-2 size-4' />
							{files.image ? files.image.name : 'Upload Image'}
						</Button>
					</div>

					<Button type="submit" disabled={isLoading} className='bg-[#D77B1E] hover:bg-[#D77B1E]/90'>
						{isLoading ? "Adding..." : "Add Song"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddSongDialog;

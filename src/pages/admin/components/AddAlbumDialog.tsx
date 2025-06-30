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
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMusicStore } from '../../../stores/useMusicStore';

const AddAlbumDialog = () => {
	const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [newAlbum, setNewAlbum] = useState({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear(),
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const { addAlbum } = useMusicStore();

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Please upload an image");
			}

			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));

			const newAlbumData = {
				id: Date.now().toString(),
				title: newAlbum.title,
				artist: newAlbum.artist,
				releaseYear: newAlbum.releaseYear,
				songs: [],
				coverImage: imageFile ? URL.createObjectURL(imageFile) : ""
			};

			addAlbum(newAlbumData);

			setNewAlbum({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear(),
			});
			setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Album created successfully");
		} catch (error: any) {
			toast.error("Failed to create album: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-[#D77B1E] hover:bg-[#D77B1E]/90'>
					<Plus className='mr-2 size-4' />
					Add Album
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-zinc-900 border-zinc-800'>
				<DialogHeader>
					<DialogTitle>Add New Album</DialogTitle>
					<DialogDescription>Create a new album with cover image.</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className='space-y-4'>
						<div>
							<label className='text-sm font-medium'>Album Title</label>
							<Input
								value={newAlbum.title}
								onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
								placeholder='Enter album title'
								className='bg-zinc-800 border-zinc-700'
								required
							/>
						</div>

						<div>
							<label className='text-sm font-medium'>Artist</label>
							<Input
								value={newAlbum.artist}
								onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
								placeholder='Enter artist name'
								className='bg-zinc-800 border-zinc-700'
								required
							/>
						</div>

						<div>
							<label className='text-sm font-medium'>Release Year</label>
							<Input
								type='number'
								value={newAlbum.releaseYear}
								onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
								className='bg-zinc-800 border-zinc-700'
								required
							/>
						</div>

						<div>
							<label className='text-sm font-medium'>Cover Image</label>
							<input
								ref={fileInputRef}
								type='file'
								accept='image/*'
								onChange={handleImageSelect}
								className='hidden'
							/>
							<Button
								type='button'
								variant='outline'
								onClick={() => fileInputRef.current?.click()}
								className='w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
							>
								<Upload className='mr-2 size-4' />
								{imageFile ? imageFile.name : 'Upload Image'}
							</Button>
						</div>
					</div>

					<DialogFooter>
						<Button variant='ghost' onClick={() => setAlbumDialogOpen(false)}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Creating..." : "Create Album"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddAlbumDialog;

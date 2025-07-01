import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sermon, SermonPart } from "@/types";
import { X } from "lucide-react";

interface TranscriptModalProps {
	isOpen: boolean;
	onClose: () => void;
	sermon: Sermon | null;
	sermonPart: SermonPart | null;
}

const TranscriptModal = ({ isOpen, onClose, sermon, sermonPart }: TranscriptModalProps) => {
	if (!sermon || !sermonPart) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[80vh] p-0 bg-zinc-900 border-zinc-800">
				<DialogHeader className="p-6 pb-4 border-b border-zinc-800">
					<div className="flex items-center justify-between">
						<DialogTitle className="text-white text-xl font-semibold">
							Transcript
						</DialogTitle>
						{/* <Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="text-zinc-400 hover:text-white"
						>
							<X className="h-4 w-4" />
						</Button> */}
					</div>
				</DialogHeader>

				<div className="p-6">
					{/* Sermon Info */}
					<div className="flex items-start gap-4 mb-6">
						<img
							src={sermon.imageUrl}
							alt={sermon.title}
							className="w-16 h-16 rounded-md object-cover"
						/>
						<div className="flex-1">
							<h2 className="text-white text-lg font-semibold mb-1">
								{sermonPart.title}
							</h2>
							<p className="text-zinc-400 text-sm mb-1">
								{sermon.title} • {sermon.preacher}
							</p>
							<p className="text-zinc-500 text-xs">
								{sermon.date}
							</p>
						</div>
					</div>

					{/* Transcript Content */}
					<ScrollArea className="h-[50vh] pr-4">
						<div className="prose prose-invert max-w-none">
							<div className="text-zinc-300 leading-relaxed whitespace-pre-line">
								{sermonPart.transcript}
							</div>
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TranscriptModal; 
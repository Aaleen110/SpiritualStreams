import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
// import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import TranscriptModal from "@/components/TranscriptModal";
// DebugAudio import removed
import { useTranscriptStore } from "@/stores/useTranscriptStore";
import { useEffect, useState } from "react";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);
	const { isOpen, currentSermon, currentSermonPart, closeTranscript } = useTranscriptStore();

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className='h-screen bg-black text-white flex flex-col overflow-hidden'>
			<ResizablePanelGroup direction='horizontal' className='flex-1 flex overflow-hidden p-2'>
				{/* left sidebar */}
				<ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
					<LeftSidebar />
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

				{/* Main content */}
				<ResizablePanel defaultSize={isMobile ? 80 : 60}>
					<Outlet />
				</ResizablePanel>

				{!isMobile && (
					<>
						<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

						{/* right sidebar */}
						{/* <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
							<FriendsActivity />
						</ResizablePanel> */}
					</>
				)}
			</ResizablePanelGroup>

			{/* Audio Player and Playback Controls */}
			<AudioPlayer />
			<PlaybackControls />
			
			<TranscriptModal
				isOpen={isOpen}
				onClose={closeTranscript}
				sermon={currentSermon}
				sermonPart={currentSermonPart}
			/>
			
			{/* Debug component removed */}
		</div>
	);
};
export default MainLayout;

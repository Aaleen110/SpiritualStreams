import { usePlayerStore } from "@/stores/usePlayerStore";

const DebugAudio = () => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const queue = usePlayerStore((state) => state.queue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Audio Debug</h3>
      <div className="space-y-1">
        <div>Current Song: {currentSong?.title || 'None'}</div>
        <div>Is Playing: {isPlaying ? 'Yes' : 'No'}</div>
        <div>Queue Length: {queue.length}</div>
        <div>Current Index: {currentIndex}</div>
        <div>Song ID: {currentSong?.id || 'None'}</div>
      </div>
    </div>
  );
};

export default DebugAudio; 
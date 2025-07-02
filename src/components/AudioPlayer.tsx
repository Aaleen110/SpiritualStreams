import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';
import { partsApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Loader2
} from 'lucide-react';
import { formatTime } from '@/lib/utils';

interface AudioPlayerProps {
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentPart = useAudioStore((state) => state.currentPart);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const currentTime = useAudioStore((state) => state.currentTime);
  const duration = useAudioStore((state) => state.duration);
  const volume = useAudioStore((state) => state.volume);
  const isMuted = useAudioStore((state) => state.isMuted);
  const queue = useAudioStore((state) => state.queue);
  const currentIndex = useAudioStore((state) => state.currentIndex);
  const play = useAudioStore((state) => state.play);
  const pause = useAudioStore((state) => state.pause);
  const stop = useAudioStore((state) => state.stop);
  const seek = useAudioStore((state) => state.seek);
  const setVolume = useAudioStore((state) => state.setVolume);
  const toggleMute = useAudioStore((state) => state.toggleMute);
  const next = useAudioStore((state) => state.next);
  const previous = useAudioStore((state) => state.previous);

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      // Audio is ready to play
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleTimeUpdate = () => {
      if (audio.currentTime !== currentTime) {
        seek(audio.currentTime);
      }
    };

    const handleEnded = () => {
      if (currentIndex < queue.length - 1) {
        next();
      } else {
        stop();
      }
    };

    const handleError = (event: Event) => {
      setIsLoading(false);
      const audio = event.target as HTMLAudioElement;
      console.error('Audio playback error:', audio.error);
      
      // Log additional error details
      if (audio.error) {
        console.error('Error code:', audio.error.code);
        console.error('Error message:', audio.error.message);
      }
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTime, currentIndex, queue.length, next, stop, seek]);

  // Sync audio element with store state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
        setIsLoading(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = currentTime;
  }, [currentTime]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (!currentPart) return;
    
    if (isPlaying) {
      pause();
    } else {
      // Always set loading state when starting to play
      setIsLoading(true);
      console.log('Play button clicked, calling play with:', currentPart);
      play(currentPart);
      
      // If audio source is not set yet, it will be set by the useEffect
      // and then the play will be triggered automatically
    }
  };

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    seek(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Memoize the audio URL to prevent unnecessary recalculations
  const audioUrl = useMemo(() => {
    if (!currentPart) return null;
    return partsApi.getAudioStreamUrl(currentPart.id);
  }, [currentPart?.id]);

  // Handle audio source changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    // Only change the source if it's different
    if (audio.src !== audioUrl) {
      console.log('Setting audio source:', audioUrl);
      audio.src = audioUrl;
      audio.currentTime = 0;
      
      // If we're supposed to be playing, start playing after setting the source
      if (isPlaying) {
        console.log('Attempting to play audio after source change');
        audio.play().catch((error) => {
          console.error('Failed to play audio after source change:', error);
          setIsLoading(false);
        });
      }
    }
  }, [audioUrl, isPlaying]);

  // Initialize audio element when currentPart changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentPart) return;

    // Set volume and other properties
    audio.volume = isMuted ? 0 : volume;
    audio.preload = 'metadata';
  }, [currentPart, volume, isMuted]);

  if (!currentPart) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 ${className}`}>
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadStart={() => setIsLoading(true)}
        crossOrigin="anonymous"
      />
      
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0">
            {/* Placeholder for track image */}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-white truncate">
              {currentPart.title}
            </h4>
            <p className="text-xs text-zinc-400 truncate">
              {currentPart.duration ? formatTime(currentPart.duration) : 'Unknown duration'}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={previous}
            disabled={currentIndex <= 0}
            className="text-zinc-400 hover:text-white"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={handlePlayPause}
            disabled={isLoading}
            className="text-white hover:bg-zinc-800"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={next}
            disabled={currentIndex >= queue.length - 1}
            className="text-zinc-400 hover:text-white"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <span className="text-xs text-zinc-400 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            onValueChange={handleSeek}
            max={duration}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-zinc-400 w-12">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-zinc-400 hover:text-white"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
}; 
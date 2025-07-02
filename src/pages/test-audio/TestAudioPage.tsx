import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { config } from '@/config/env';

const TestAudioPage = () => {
  const [audioId, setAudioId] = useState('1_1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioInfo, setAudioInfo] = useState<{
    duration: number;
    currentTime: number;
    loaded: boolean;
  }>({
    duration: 0,
    currentTime: 0,
    loaded: false,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = `${config.api.baseUrl.replace('/api/v1', '')}/api/v1/audio/${audioId}`;

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setAudioInfo(prev => ({ ...prev, loaded: true }));
  };

  const handleError = (e: any) => {
    setIsLoading(false);
    setError(`Audio error: ${e.target.error?.message || 'Unknown error'}`);
    console.error('Audio error:', e.target.error);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioInfo(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime,
        duration: audioRef.current!.duration || prev.duration,
      }));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Audio Stream Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio ID Input */}
          <div className="space-y-2">
            <Label htmlFor="audioId">Audio ID:</Label>
            <Input
              id="audioId"
              value={audioId}
              onChange={(e) => setAudioId(e.target.value)}
              placeholder="Enter audio ID (e.g., 1_1, 2_1, 3_1)"
            />
          </div>

          {/* Audio URL Display */}
          <div className="space-y-2">
            <Label>Audio URL:</Label>
            <div className="p-3 bg-gray-100 rounded text-sm break-all">
              {audioUrl}
            </div>
          </div>

          {/* Audio Element (Hidden) */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            onError={handleError}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            preload="metadata"
            crossOrigin="anonymous"
          />

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>

          {/* Progress Info */}
          {audioInfo.loaded && (
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Progress:</span> {formatTime(audioInfo.currentTime)} / {formatTime(audioInfo.duration)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(audioInfo.currentTime / audioInfo.duration) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700">
              {error}
            </div>
          )}

          {/* Test Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-medium mb-2">Test Instructions:</h3>
            <ul className="text-sm space-y-1">
              <li>• Enter a valid audio ID (1_1, 1_2, 1_3, 2_1, 2_2, 3_1)</li>
              <li>• Click Play to start streaming</li>
              <li>• Click Pause to stop</li>
              <li>• Watch for any stuttering or buffering issues</li>
              <li>• Check browser console for detailed errors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAudioPage; 
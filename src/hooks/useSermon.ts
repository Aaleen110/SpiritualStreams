import { useState, useEffect, useCallback } from 'react';
import { sermonsApi, ApiError } from '@/services/api';
import { Sermon } from '@/types';
import toast from 'react-hot-toast';

interface UseSermonReturn {
  sermon: Sermon | null;
  isLoading: boolean;
  error: string | null;
  fetchSermon: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useSermon = (id?: string): UseSermonReturn => {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [retryCount, setRetryCount] = useState(0);

  const fetchSermon = useCallback(async (sermonId: string) => {
    if (!sermonId) return;
    
    console.log('useSermon: Fetching sermon with ID:', sermonId, 'retry:', retryCount);
    setIsLoading(true);
    setError(null);
    setCurrentId(sermonId);

    try {
      const response = await sermonsApi.getById(sermonId);
      console.log('useSermon: API response:', response);

      if (response.status === 'success') {
        setSermon(response.data);
        setRetryCount(0); // Reset retry count on success
        console.log('useSermon: Sermon set successfully:', response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('useSermon: Error fetching sermon:', err);
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch sermon';
      
      setError(errorMessage);
      
      // Retry logic for first load failures
      if (retryCount < 2) {
        console.log('useSermon: Retrying in 1 second...');
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1000);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [retryCount]);

  const refetch = useCallback(() => {
    if (currentId) {
      setRetryCount(0); // Reset retry count on manual refetch
      return fetchSermon(currentId);
    }
    return Promise.resolve();
  }, [fetchSermon, currentId]);

  useEffect(() => {
    console.log('useSermon: useEffect triggered with id:', id, 'currentId:', currentId, 'retryCount:', retryCount);
    
    // Fetch sermon if:
    // 1. We have an id and it's different from currentId
    // 2. We have an id but no currentId (initial load)
    // 3. We need to retry
    if (id && (id !== currentId || retryCount > 0)) {
      fetchSermon(id);
    }
  }, [id, fetchSermon, currentId, retryCount]);

  return {
    sermon,
    isLoading,
    error,
    fetchSermon,
    refetch,
  };
}; 
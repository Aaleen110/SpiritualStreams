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
  const [currentId, setCurrentId] = useState<string | undefined>(id);

  const fetchSermon = useCallback(async (sermonId: string) => {
    if (!sermonId) return;
    
    setIsLoading(true);
    setError(null);
    setCurrentId(sermonId);

    try {
      const response = await sermonsApi.getById(sermonId);

      if (response.status === 'success') {
        setSermon(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch sermon';
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    if (currentId) {
      return fetchSermon(currentId);
    }
    return Promise.resolve();
  }, [fetchSermon, currentId]);

  useEffect(() => {
    if (id && id !== currentId) {
      fetchSermon(id);
    }
  }, [id, fetchSermon, currentId]);

  return {
    sermon,
    isLoading,
    error,
    fetchSermon,
    refetch,
  };
}; 
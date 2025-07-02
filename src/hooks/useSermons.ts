import { useState, useEffect, useCallback } from 'react';
import { sermonsApi, ApiError } from '@/services/api';
import { Sermon } from '@/types';
import toast from 'react-hot-toast';

interface UseSermonsOptions {
  page?: number;
  limit?: number;
  search?: string;
  autoFetch?: boolean;
}

interface UseSermonsReturn {
  sermons: Sermon[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchSermons: (options?: UseSermonsOptions) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useSermons = (options: UseSermonsOptions = {}): UseSermonsReturn => {
  const { page = 1, limit = 10, search, autoFetch = true } = options;
  
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSermons = useCallback(async (fetchOptions?: UseSermonsOptions) => {
    const { page: fetchPage = currentPage, limit: fetchLimit = limit, search: fetchSearch = search } = fetchOptions || {};
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await sermonsApi.getAll({
        page: fetchPage,
        limit: fetchLimit,
        search: fetchSearch,
      });

      if (response.status === 'success') {
        setSermons(response.data.sermons);
        setTotal(response.data.total);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch sermons';
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, search]);

  const refetch = useCallback(() => {
    return fetchSermons();
  }, [fetchSermons]);

  useEffect(() => {
    if (autoFetch) {
      fetchSermons();
    }
  }, [fetchSermons, autoFetch]);

  return {
    sermons,
    total,
    page: currentPage,
    totalPages,
    isLoading,
    error,
    fetchSermons,
    refetch,
  };
}; 
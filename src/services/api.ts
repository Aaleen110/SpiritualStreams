import { config } from '@/config/env';
import type { Sermon, SermonPart } from '@/types';

// API Configuration
const API_BASE_URL = config.api.baseUrl;

// API Response Types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  sermons: T[];
  total: number;
  page: number;
  totalPages: number;
}

// API Error Handler
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// Sermons API
export const sermonsApi = {
  // Get all sermons with pagination and search
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<Sermon>>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const queryString = searchParams.toString();
    const endpoint = `/sermons${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<ApiResponse<PaginatedResponse<Sermon>>>(endpoint);
  },

  // Get sermon by ID with parts
  getById: async (id: string): Promise<ApiResponse<Sermon>> => {
    return apiRequest<ApiResponse<Sermon>>(`/sermons/${id}`);
  },

  // Get sermon parts
  getParts: async (sermonId: string): Promise<ApiResponse<SermonPart[]>> => {
    return apiRequest<ApiResponse<SermonPart[]>>(`/sermons/${sermonId}/parts`);
  },
};

// Parts API
export const partsApi = {
  // Get sermon part by ID
  getById: async (id: string): Promise<ApiResponse<SermonPart>> => {
    return apiRequest<ApiResponse<SermonPart>>(`/parts/${id}`);
  },

  // Get audio streaming info
  getStreamInfo: async (id: string): Promise<ApiResponse<{
    audioUrl: string;
    mimeType: string;
    duration: number;
  }>> => {
    return apiRequest<ApiResponse<{
      audioUrl: string;
      mimeType: string;
      duration: number;
    }>>(`/parts/${id}/stream`);
  },

  // Get direct audio stream URL
  getAudioStreamUrl: (id: string): string => {
    return `${API_BASE_URL}/audio/${id}`;
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string; message: string }> => {
    return apiRequest<{ status: string; message: string }>('/');
  },
};

export { ApiError }; 
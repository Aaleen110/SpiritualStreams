// Environment Configuration
export const config = {
  api: {
    // baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8787/api/v1',
    baseUrl: 'https://spiritual-streams-service-prod.aaleenmirza110.workers.dev/api/v1',
  },
  dev: {
    mode: import.meta.env.VITE_DEV_MODE === 'true',
  },
} as const; 
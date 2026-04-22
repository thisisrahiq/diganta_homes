export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  // Remove trailing slash from API_URL and leading slash from url if present
  const base = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const path = url.startsWith('/') ? url : `/${url}`;
  
  return `${base}${path}`;
};
